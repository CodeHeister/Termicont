import { A } from '@solidjs/router';
import { Show } from 'solid-js';
import { useI18n } from '@lib/i18n';
import { CONSENT_ENABLED, ConsentService } from '@lib/consent';
import '@styles/footer.scss';

export default function Footer() {
    const { t } = useI18n();
    const year = new Date().getFullYear();

    return (
        <footer>
            <div class="footer-main">
                <div class="footer-brand">
                    <div class="footer-logo">Termicont SRL</div>
                    <span class="footer-address">
                        mun. Bălți, str. Igor Sereda, 15
                    </span>
                </div>
                <nav class="links" aria-label="Legal">
                    <A class="link-wrapper" href="/privacy">
                        <h2>{t('footer.privacy', 'Privacy Policy')}</h2>
                    </A>
                    <A class="link-wrapper" href="/cookies">
                        <h2>{t('footer.cookie_policy', 'Cookie Policy')}</h2>
                    </A>
                </nav>
                <div class="footer-contact">
                    <strong>IDNO 1015602000326</strong>
                    <span>BC Energbank SA — IBAN MD24EN000000222477968402</span>
                </div>
            </div>
            <div class="footer-bottom">
                <span>
                    © {year} Termicont SRL. {t('footer.rights')}
                </span>
                <Show when={CONSENT_ENABLED}>
                    <button
                        type="button"
                        class="footer-link"
                        onClick={() => ConsentService.openPreferences()}
                    >
                        {t('footer.cookies', 'Cookie settings')}
                    </button>
                </Show>
            </div>
        </footer>
    );
}
