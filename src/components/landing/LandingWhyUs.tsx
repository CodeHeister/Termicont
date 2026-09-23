import { For } from 'solid-js';
import { useLocalizer } from '@lib/i18n';

type WhyItem = {
    titleKey: string;
    descKey: string;
};

const items: WhyItem[] = [
    {
        titleKey: 'why.item.expertise.title',
        descKey: 'why.item.expertise.desc',
    },
    {
        titleKey: 'why.item.allinone.title',
        descKey: 'why.item.allinone.desc',
    },
    {
        titleKey: 'why.item.tech.title',
        descKey: 'why.item.tech.desc',
    },
    {
        titleKey: 'why.item.experience.title',
        descKey: 'why.item.experience.desc',
    },
];

export function LandingWhyUs() {
    const loc = useLocalizer('landing');

    return (
        <section class="why">
            <div class="landing-inner">
                <div class="why-grid">
                    <div>
                        <div class="section-tag">{loc('why.tag')}</div>
                        <h2 class="section-title">
                            {loc('why.title.line1')}
                            <br />
                            {loc('why.title.line2')}
                        </h2>
                        <div class="why-list">
                            <For each={items}>
                                {(item) => (
                                    <div class="why-item">
                                        <div class="why-dot" />
                                        <div class="why-text">
                                            <strong>
                                                {loc(item.titleKey)}
                                            </strong>
                                            <span>{loc(item.descKey)}</span>
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>
                    <div class="why-visual">
                        <div class="why-card-big">
                            <p class="why-quote">{loc('why.quote.text')}</p>
                            <div class="why-quote-attr">
                                Denis Labo — {loc('why.quote.role')}, Termicont
                                SRL
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingWhyUs;
