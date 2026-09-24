export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export type ConsentChoices = Record<ConsentCategory, boolean>;

export const consentCategories: ConsentCategory[] = [
    'necessary',
    'analytics',
    'marketing',
];

/** Categories the user can switch on or off ('necessary' is always active) */
export const optionalConsentCategories = consentCategories.filter(
    (category) => category !== 'necessary'
);

export const defaultConsentChoices: ConsentChoices = {
    necessary: true,
    analytics: false,
    marketing: false,
};

/** localStorage key holding the user's consent record */
export const CONSENT_STORAGE_KEY = 'consent';

/**
 * Bump to ask every visitor for consent again
 * (e.g. when a new category or a new third-party service is added).
 */
export const CONSENT_VERSION = 1;

/**
 * The consent manager UI (banner, settings dialog, footer link) is shown only
 * when the site is built with VITE_CONSENT_ENABLED=true. While disabled,
 * ConsentService.has() returns false for every optional category, so nothing
 * that depends on consent can run by accident.
 */
export const CONSENT_ENABLED = import.meta.env.VITE_CONSENT_ENABLED === 'true';
