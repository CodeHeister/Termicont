import { For } from 'solid-js';
import { useLocalizer } from '@lib/i18n';

type Stat = {
    num: string;
    labelKey: string;
};

const stats: Stat[] = [
    { num: '10+', labelKey: 'hero.stat.experience' },
    { num: '30+', labelKey: 'hero.stat.clients' },
    { num: '1C', labelKey: 'hero.stat.dev' },
    { num: 'AI', labelKey: 'hero.stat.ai' },
];

export function LandingHero() {
    const loc = useLocalizer('landing');

    const scrollTo = (selector: string) => {
        document
            .querySelector(selector)
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section class="hero">
            <div class="hero-content landing-inner">
                <div>
                    <div class="hero-tag">{loc('hero.tag')}</div>
                    <h1 class="hero-title">
                        {loc('hero.title.line1')}
                        <br />
                        {loc('hero.title.line2')}
                        <br />
                        <span>{loc('hero.title.line3')}</span>
                    </h1>
                    <p class="hero-sub">{loc('hero.subtitle')}</p>
                    <div class="hero-cta">
                        <button
                            type="button"
                            class="button"
                            onClick={() => scrollTo('.contact')}
                        >
                            {loc('hero.cta.contact')}
                        </button>
                        <button
                            type="button"
                            class="button-ghost"
                            onClick={() => scrollTo('.services')}
                        >
                            {loc('hero.cta.services')}
                        </button>
                    </div>
                </div>
                <div class="hero-stats">
                    <For each={stats}>
                        {(stat) => (
                            <div class="stat-box">
                                <div class="stat-num">{stat.num}</div>
                                <div class="stat-lbl">{loc(stat.labelKey)}</div>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </section>
    );
}

export default LandingHero;
