import { createSignal, For } from 'solid-js';
import { useLocalizer } from '@lib/i18n';

const serviceOptionKeys = [
    'services.accounting.title',
    'services.bots.title',
    'services.dev1c.title',
    'services.consulting.title',
    'contact.form.service.full',
];

export function LandingContact() {
    const loc = useLocalizer('landing');
    const [submitted, setSubmitted] = createSignal(false);

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <section class="contact">
            <div class="landing-inner">
                <div class="contact-inner">
                    <div>
                        <div class="section-tag">{loc('contact.tag')}</div>
                        <h2 class="section-title">
                            {loc('contact.title.line1')}
                            <br />
                            {loc('contact.title.line2')}
                        </h2>
                        <p class="section-sub">{loc('contact.subtitle')}</p>
                        <div class="contact-info">
                            <div class="contact-item">
                                <div class="contact-icon">📍</div>
                                <div class="contact-detail">
                                    <strong>Termicont SRL</strong>
                                    <span>
                                        mun. Bălți, str. Igor Sereda, 15
                                    </span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">🏛️</div>
                                <div class="contact-detail">
                                    <strong>IDNO 1015602000326</strong>
                                    <span>
                                        BC Energbank SA — IBAN
                                        MD24EN000000222477968402
                                    </span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">💬</div>
                                <div class="contact-detail">
                                    <strong>Telegram / WhatsApp</strong>
                                    <span>
                                        {loc('contact.info.messenger.desc')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form class="contact-form" onSubmit={handleSubmit}>
                        <h3 class="form-title">{loc('contact.form.title')}</h3>
                        <div class="form-group">
                            <label>{loc('contact.form.company.label')}</label>
                            <input type="text" placeholder="SRL / SA / ÎI..." />
                        </div>
                        <div class="form-group">
                            <label>{loc('contact.form.service.label')}</label>
                            <select>
                                <option value="" disabled selected>
                                    {loc('contact.form.service.placeholder')}
                                </option>
                                <For each={serviceOptionKeys}>
                                    {(key) => <option>{loc(key)}</option>}
                                </For>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>{loc('contact.form.message.label')}</label>
                            <textarea placeholder="..." />
                        </div>
                        <button
                            type="submit"
                            class="button"
                            style={{ width: '100%' }}
                            disabled={submitted()}
                        >
                            {submitted() ? '✓' : loc('contact.form.submit')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LandingContact;
