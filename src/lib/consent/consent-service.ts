import { createSignal } from 'solid-js';
import {
    CONSENT_ENABLED,
    CONSENT_STORAGE_KEY,
    CONSENT_VERSION,
    ConsentCategory,
    ConsentChoices,
    defaultConsentChoices,
    optionalConsentCategories,
} from './consent-options';

export interface ConsentRecord {
    version: number;
    timestamp: string;
    choices: ConsentChoices;
}

type ConsentListener = (
    choices: ConsentChoices,
    previous: ConsentChoices
) => void;

function readRecord(): ConsentRecord | null {
    try {
        const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed?.version !== CONSENT_VERSION || !parsed.choices) {
            return null;
        }
        return {
            version: CONSENT_VERSION,
            timestamp: String(parsed.timestamp ?? ''),
            choices: {
                ...defaultConsentChoices,
                analytics: parsed.choices.analytics === true,
                marketing: parsed.choices.marketing === true,
            },
        };
    } catch {
        return null;
    }
}

const [record, setRecord] = createSignal<ConsentRecord | null>(readRecord());
const [preferencesOpen, setPreferencesOpen] = createSignal(false);
const listeners = new Set<ConsentListener>();

function notify(choices: ConsentChoices, previous: ConsentChoices) {
    for (const listener of [...listeners]) listener(choices, previous);
}

if (typeof window !== 'undefined') {
    // Keep several open tabs in sync
    window.addEventListener('storage', (event) => {
        if (event.key !== CONSENT_STORAGE_KEY && event.key !== null) return;
        const previous = ConsentService.choices();
        setRecord(readRecord());
        notify(ConsentService.choices(), previous);
    });
}

/**
 * Stores the visitor's cookie/storage consent and lets the rest of the app
 * (or third-party loaders) react to it.
 *
 * Reactive: `has`, `choices` and `decided` read a signal, so they can be used
 * inside JSX and effects.
 */
export class ConsentService {
    /** Current choices; 'necessary' is always true, the rest default to false */
    static choices(): ConsentChoices {
        return record()?.choices ?? defaultConsentChoices;
    }

    /** True once the visitor has made a choice for the current consent version */
    static decided(): boolean {
        return record() !== null;
    }

    /** ISO timestamp of the last decision, if any */
    static decidedAt(): string | null {
        return record()?.timestamp || null;
    }

    /**
     * Whether a category may be used right now. Always false for optional
     * categories while the consent manager is disabled.
     */
    static has(category: ConsentCategory): boolean {
        if (category === 'necessary') return true;
        return CONSENT_ENABLED && ConsentService.choices()[category] === true;
    }

    /**
     * Saves the visitor's choices.
     * @returns true if a previously granted category was revoked. Scripts that
     * are already running cannot be unloaded, so callers should reload then.
     */
    static save(choices: Partial<ConsentChoices>): boolean {
        const previous = ConsentService.choices();
        const next: ConsentChoices = {
            ...defaultConsentChoices,
            ...choices,
            necessary: true,
        };
        const saved: ConsentRecord = {
            version: CONSENT_VERSION,
            timestamp: new Date().toISOString(),
            choices: next,
        };

        try {
            localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(saved));
        } catch {
            // Storage unavailable: the choice still applies to this session
        }

        setRecord(saved);
        notify(next, previous);
        return optionalConsentCategories.some(
            (category) => previous[category] && !next[category]
        );
    }

    static acceptAll(): boolean {
        return ConsentService.save({ analytics: true, marketing: true });
    }

    static rejectAll(): boolean {
        return ConsentService.save({ analytics: false, marketing: false });
    }

    /** Forgets the decision, so the banner is shown again */
    static reset(): void {
        try {
            localStorage.removeItem(CONSENT_STORAGE_KEY);
        } catch {
            // ignore
        }
        const previous = ConsentService.choices();
        setRecord(null);
        notify(defaultConsentChoices, previous);
    }

    static isPreferencesOpen(): boolean {
        return preferencesOpen();
    }

    static openPreferences(): void {
        setPreferencesOpen(true);
    }

    static closePreferences(): void {
        setPreferencesOpen(false);
    }

    /** Calls `listener` on every change. Returns an unsubscribe function. */
    static subscribe(listener: ConsentListener): () => void {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }

    /**
     * Runs `callback` once, as soon as `category` is allowed (immediately if it
     * already is). Returns a function that cancels the pending call.
     */
    static whenGranted(
        category: ConsentCategory,
        callback: () => void
    ): () => void {
        if (ConsentService.has(category)) {
            callback();
            return () => {};
        }
        const unsubscribe = ConsentService.subscribe(() => {
            if (ConsentService.has(category)) {
                unsubscribe();
                callback();
            }
        });
        return unsubscribe;
    }

    /**
     * Injects a third-party script only after `category` is allowed.
     * Example: ConsentService.loadScript('analytics', 'https://.../script.js')
     */
    static loadScript(
        category: ConsentCategory,
        src: string,
        attributes: Record<string, string> = {}
    ): () => void {
        return ConsentService.whenGranted(category, () => {
            if (document.querySelector(`script[src="${src}"]`)) return;
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            for (const [name, value] of Object.entries(attributes)) {
                script.setAttribute(name, value);
            }
            document.head.appendChild(script);
        });
    }
}

export default ConsentService;
