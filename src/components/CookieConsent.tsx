import { For, Show, createEffect, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
import { useLocalizer } from '@lib/i18n';
import {
    CONSENT_ENABLED,
    ConsentChoices,
    ConsentService,
    consentCategories,
} from '@lib/consent';
import '@styles/consent.scss';

function applyChoices(save: () => boolean) {
    // Already running third-party scripts cannot be unloaded
    if (save()) window.location.reload();
}

export default function CookieConsent() {
    const loc = useLocalizer('consent');
    const [draft, setDraft] = createSignal<ConsentChoices>({
        ...ConsentService.choices(),
    });
    let dialogRef: HTMLDivElement | undefined;

    const showBanner = () =>
        CONSENT_ENABLED &&
        !ConsentService.decided() &&
        !ConsentService.isPreferencesOpen();
    const showDialog = () =>
        CONSENT_ENABLED && ConsentService.isPreferencesOpen();

    createEffect(() => {
        if (!showDialog()) return;
        setDraft({ ...ConsentService.choices() });
        queueMicrotask(() => dialogRef?.focus());
    });

    const close = () => ConsentService.closePreferences();

    const finish = (save: () => boolean) => {
        applyChoices(save);
        close();
    };

    return (
        <Show when={CONSENT_ENABLED}>
            <Show when={showBanner()}>
                <section
                    class="consent-banner"
                    role="region"
                    aria-labelledby="consent-banner-title"
                >
                    <div class="consent-text">
                        <h2 id="consent-banner-title">
                            {loc('banner.title', 'Cookies and privacy')}
                        </h2>
                        <p>{loc('banner.text')}</p>
                        <A class="link" href="/privacy">
                            {loc('banner.policy', 'Privacy Policy')}
                        </A>
                    </div>
                    <div class="consent-actions">
                        <button
                            type="button"
                            class="button"
                            onClick={() => finish(ConsentService.acceptAll)}
                        >
                            {loc('banner.accept', 'Accept all')}
                        </button>
                        <button
                            type="button"
                            class="button"
                            onClick={() => finish(ConsentService.rejectAll)}
                        >
                            {loc('banner.reject', 'Reject optional')}
                        </button>
                        <button
                            type="button"
                            class="button consent-secondary"
                            onClick={() => ConsentService.openPreferences()}
                        >
                            {loc('banner.customize', 'Customize')}
                        </button>
                    </div>
                </section>
            </Show>

            <Show when={showDialog()}>
                <div
                    class="consent-overlay"
                    onClick={(e) => e.target === e.currentTarget && close()}
                >
                    <div
                        class="consent-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="consent-dialog-title"
                        tabindex="-1"
                        ref={dialogRef}
                        onKeyDown={(e) => e.key === 'Escape' && close()}
                    >
                        <h2 id="consent-dialog-title">
                            {loc('dialog.title', 'Cookie settings')}
                        </h2>
                        <p>{loc('dialog.intro')}</p>
                        <ul class="consent-categories">
                            <For each={consentCategories}>
                                {(category) => (
                                    <li>
                                        <div>
                                            <strong>
                                                {loc(
                                                    `categories.${category}.title`
                                                )}
                                            </strong>
                                            <span>
                                                {loc(
                                                    `categories.${category}.desc`
                                                )}
                                            </span>
                                        </div>
                                        <label class="consent-switch">
                                            <input
                                                type="checkbox"
                                                role="switch"
                                                checked={draft()[category]}
                                                disabled={
                                                    category === 'necessary'
                                                }
                                                aria-label={loc(
                                                    `categories.${category}.title`
                                                )}
                                                onChange={(e) =>
                                                    setDraft({
                                                        ...draft(),
                                                        [category]:
                                                            e.currentTarget
                                                                .checked,
                                                    })
                                                }
                                            />
                                            <span class="consent-slider" />
                                        </label>
                                    </li>
                                )}
                            </For>
                        </ul>
                        <div class="consent-actions">
                            <button
                                type="button"
                                class="button"
                                onClick={() =>
                                    finish(() => ConsentService.save(draft()))
                                }
                            >
                                {loc('dialog.save', 'Save choices')}
                            </button>
                            <button
                                type="button"
                                class="button consent-secondary"
                                onClick={close}
                            >
                                {loc('dialog.close', 'Close')}
                            </button>
                        </div>
                    </div>
                </div>
            </Show>
        </Show>
    );
}
