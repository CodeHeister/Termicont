import { For } from 'solid-js';
import { useLocalizer } from '@lib/i18n';

type Tag = { text: string } | { key: string };

type ServiceCard = {
    num: string;
    icon: string;
    titleKey: string;
    descKey: string;
    tags: Tag[];
};

const tag = (text: string): Tag => ({ text });
const tagKey = (key: string): Tag => ({ key });

const services: ServiceCard[] = [
    {
        num: '01',
        icon: '📊',
        titleKey: 'services.accounting.title',
        descKey: 'services.accounting.desc',
        tags: [tag('SFS'), tag('TVA'), tag('NSBC'), tag('e-Factura')],
    },
    {
        num: '02',
        icon: '🤖',
        titleKey: 'services.bots.title',
        descKey: 'services.bots.desc',
        tags: [tag('Telegram'), tag('Instagram'), tag('AI'), tag('ChatGPT')],
    },
    {
        num: '03',
        icon: '⚙️',
        titleKey: 'services.dev1c.title',
        descKey: 'services.dev1c.desc',
        tags: [tag('1С 8.3'), tag('MAIB'), tag('Victoriabank'), tag('API')],
    },
    {
        num: '04',
        icon: '💼',
        titleKey: 'services.consulting.title',
        descKey: 'services.consulting.desc',
        tags: [
            tag('Cash Flow'),
            tagKey('services.consulting.tag.analysis'),
            tagKey('services.consulting.tag.planning'),
        ],
    },
];

export function LandingServices() {
    const loc = useLocalizer('landing');

    return (
        <section class="services">
            <div class="landing-inner">
                <div class="services-header">
                    <div>
                        <div class="section-tag">{loc('services.tag')}</div>
                        <h2 class="section-title">
                            {loc('services.title.line1')}
                            <br />
                            {loc('services.title.line2')}
                        </h2>
                    </div>
                    <p class="section-sub">{loc('services.subtitle')}</p>
                </div>
                <div class="services-grid">
                    <For each={services}>
                        {(service) => (
                            <div class="service-card">
                                <div class="service-num">{service.num}</div>
                                <div class="service-icon">{service.icon}</div>
                                <h3 class="service-title">
                                    {loc(service.titleKey)}
                                </h3>
                                <p class="service-desc">
                                    {loc(service.descKey)}
                                </p>
                                <div class="service-tags">
                                    <For each={service.tags}>
                                        {(tagItem) => (
                                            <span class="tag">
                                                {'key' in tagItem
                                                    ? loc(tagItem.key)
                                                    : tagItem.text}
                                            </span>
                                        )}
                                    </For>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </section>
    );
}

export default LandingServices;
