import { For, Show, createEffect, createResource } from 'solid-js';
import { useNav } from '@lib/nav';
import { Translations, useI18n } from '@lib/i18n';
import { CONSENT_ENABLED, ConsentService } from '@lib/consent';
import { AiOutlineInfoCircle } from 'solid-icons/ai';
import { TbBuildingEstate } from 'solid-icons/tb';
import '@styles/privacy.scss';

/** Optional contact address for privacy requests, set at build time */
const PRIVACY_EMAIL = import.meta.env.VITE_PRIVACY_EMAIL as string | undefined;

type Block =
    | { type: 'p'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'consent' };

/**
 * Section keys map to blocks in order: `p*` is a paragraph, `l*` is a list
 * item (consecutive items form one list), `email*` is a paragraph shown only
 * when VITE_PRIVACY_EMAIL is set ({email} is replaced with the address),
 * `button*` is the "Cookie settings" button (shown only when consent is on).
 */
function toBlocks(section: Translations): Block[] {
    const blocks: Block[] = [];
    for (const [key, value] of Object.entries(section)) {
        if (typeof value !== 'string') continue;
        if (key.startsWith('l')) {
            const last = blocks[blocks.length - 1];
            if (last?.type === 'ul') last.items.push(value);
            else blocks.push({ type: 'ul', items: [value] });
        } else if (key.startsWith('button')) {
            if (CONSENT_ENABLED) blocks.push({ type: 'consent' });
        } else if (key.startsWith('email')) {
            if (PRIVACY_EMAIL) {
                blocks.push({
                    type: 'p',
                    text: value.replace('{email}', PRIVACY_EMAIL),
                });
            }
        } else if (key.startsWith('p')) {
            blocks.push({ type: 'p', text: value });
        }
    }
    return blocks;
}

export default function LegalDocument(props: { namespace: string }) {
    const { setNavLinks } = useNav();
    const { t, currentLocale, loadNamespace } = useI18n();

    createEffect(() => {
        setNavLinks([
            {
                routeName: '/',
                icon: TbBuildingEstate,
                text: t('nav.home', 'Home'),
            },
            {
                routeName: '/contacts',
                icon: AiOutlineInfoCircle,
                text: t('nav.contacts', 'Contacts'),
            },
        ]);
    });

    const [doc] = createResource(currentLocale, (locale) =>
        loadNamespace(props.namespace, locale)
    );

    const sections = () => {
        const sectionsNode = doc()?.sections;
        if (!sectionsNode || typeof sectionsNode !== 'object') return [];
        return Object.entries(sectionsNode)
            .filter(
                (entry): entry is [string, Translations] =>
                    typeof entry[1] === 'object'
            )
            .map(([id, section]) => ({
                id,
                title: String(section.title ?? ''),
                blocks: toBlocks(section),
            }));
    };

    return (
        <article class="privacy">
            <Show when={doc()}>
                <h1>{String(doc()?.title ?? '')}</h1>
                <p class="privacy-updated">{String(doc()?.updated ?? '')}</p>
                <p>{String(doc()?.intro ?? '')}</p>
                <For each={sections()}>
                    {(section) => (
                        <section id={section.id}>
                            <h2>{section.title}</h2>
                            <For each={section.blocks}>
                                {(block) => (
                                    <>
                                        {block.type === 'ul' && (
                                            <ul>
                                                <For each={block.items}>
                                                    {(item) => <li>{item}</li>}
                                                </For>
                                            </ul>
                                        )}
                                        {block.type === 'p' && (
                                            <p>{block.text}</p>
                                        )}
                                        {block.type === 'consent' && (
                                            <button
                                                type="button"
                                                class="button"
                                                onClick={() =>
                                                    ConsentService.openPreferences()
                                                }
                                            >
                                                {t(
                                                    'footer.cookies',
                                                    'Cookie settings'
                                                )}
                                            </button>
                                        )}
                                    </>
                                )}
                            </For>
                        </section>
                    )}
                </For>
            </Show>
        </article>
    );
}
