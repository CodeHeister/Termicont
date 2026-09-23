import { For } from 'solid-js';
import { useLocalizer } from '@lib/i18n';

type CaseCard = {
    emoji: string;
    company: string;
    companyKey?: string;
    titleKey: string;
    descKey: string;
};

const cases: CaseCard[] = [
    {
        emoji: '🛍️',
        company: 'Evadeya',
        titleKey: 'cases.evadeya.title',
        descKey: 'cases.evadeya.desc',
    },
    {
        emoji: '🏦',
        company: '',
        companyKey: 'cases.bank.company',
        titleKey: 'cases.bank.title',
        descKey: 'cases.bank.desc',
    },
    {
        emoji: '📄',
        company: '',
        companyKey: 'cases.invoice.company',
        titleKey: 'cases.invoice.title',
        descKey: 'cases.invoice.desc',
    },
];

export function LandingCases() {
    const loc = useLocalizer('landing');

    return (
        <section class="cases">
            <div class="landing-inner">
                <div class="section-tag">{loc('cases.tag')}</div>
                <h2 class="section-title">{loc('cases.title')}</h2>
                <div class="cases-grid">
                    <For each={cases}>
                        {(item) => (
                            <div class="case-card">
                                <div class="case-emoji">{item.emoji}</div>
                                <div class="case-company">
                                    {item.companyKey
                                        ? loc(item.companyKey)
                                        : item.company}
                                </div>
                                <h3 class="case-title">{loc(item.titleKey)}</h3>
                                <p class="case-desc">{loc(item.descKey)}</p>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </section>
    );
}

export default LandingCases;
