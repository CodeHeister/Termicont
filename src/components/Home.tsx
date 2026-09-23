import {
    For,
    Show,
    onMount,
    createSignal,
    createEffect,
    onCleanup,
    createResource,
} from 'solid-js';
import { useNav } from '@lib/nav';
import { AiOutlineInfoCircle } from 'solid-icons/ai';
import { TbBuildingEstate } from 'solid-icons/tb';
import '@styles/home.scss';
import contentConfigRaw from '@static/content.json?raw';

export type Info = {
    title: string;
    text: string[];
};

export type InfoWithImage = {
    title: string;
    text: string[];
    url: string;
};

type ContentConfig = {
    primary: string;
    secondary: string;
    slides: string;
};

export default function Home() {
    const [currentIndex, setCurrentIndex] = createSignal(0);
    const [isHovered, setIsHovered] = createSignal(false);
    const { setNavLinks } = useNav();

    const imageModules = import.meta.glob(
        '@static/content/**/*.{png,jpg,jpeg,svg,webp}',
        {
            eager: true,
            import: 'default',
        }
    ) as Record<string, string>;

    async function loadContent() {
        const config: ContentConfig = JSON.parse(contentConfigRaw);

        const [primaryData, secondaryData, slidesData] = await Promise.all([
            import(`@static/content/${config.primary}.json`),
            import(`@static/content/${config.secondary}.json`),
            import(`@static/content/${config.slides}.json`),
        ]);

        const primary: Info = primaryData.default;
        const secondary: Info[] = secondaryData.default;
        const slides: InfoWithImage[] = slidesData.default;

        const slidesWithImages = slides.map((slide) => ({
            ...slide,
            url: resolveImagePath(slide.url),
        }));

        return {
            primary,
            secondary,
            slides: slidesWithImages,
        };
    }

    function resolveImagePath(relativePath: string): string {
        const fullPath = Object.keys(imageModules).find((path) =>
            path.includes(relativePath)
        );

        return fullPath ? imageModules[fullPath] : relativePath;
    }

    const [content] = createResource(loadContent);

    createEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (!isHovered()) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % content.slides.length);
            }, 5000);
        } else {
            if (interval) clearInterval(interval);
        }

        onCleanup(() => {
            if (interval) clearInterval(interval);
        });
    });

    onMount(() => {
        setNavLinks([
            { routeName: '/', icon: TbBuildingEstate, text: 'Home' },
            {
                routeName: '/contacts',
                icon: AiOutlineInfoCircle,
                text: 'Contacts',
            },
        ]);
    });

    return (
        <Show when={content()} fallback={<div>Загрузка...</div>}>
            {(data) => (
                <div class="home">
                    <div class="introduce">
                        <div class="primary">
                            <h1>{data().primary.title}</h1>
                            <div class="text">{data().primary.text}</div>
                        </div>
                        <div class="contact">
                            <a
                                role="link"
                                tabindex="0"
                                href="/contacts"
                                class="button"
                            >
                                Contact Us
                            </a>
                        </div>
                        <div class="secondary">
                            <For each={data().secondary}>
                                {(item) => {
                                    return (
                                        <div class="item">
                                            <h3>{item.title}</h3>
                                            <div class="text">{item.text}</div>
                                        </div>
                                    );
                                }}
                            </For>
                        </div>
                    </div>
                    <div class="info">
                        <div
                            class="item-container"
                            onPointerEnter={() => setIsHovered(true)}
                            onPointerLeave={() => setIsHovered(false)}
                        >
                            <div class="item">
                                <div class="data">
                                    <h2>
                                        {data().slides[currentIndex()].title}
                                    </h2>
                                    <div class="text">
                                        {data().slides[currentIndex()].text}
                                    </div>
                                </div>
                                <img
                                    src={data().slides[currentIndex()].imageUrl}
                                />
                            </div>
                        </div>

                        <div
                            class="buttons"
                            onPointerEnter={() => setIsHovered(true)}
                            onPointerLeave={() => setIsHovered(false)}
                        >
                            {data().slides.map((_, i) => (
                                <button
                                    data-active={currentIndex() === i}
                                    disabled={currentIndex() === i}
                                    tabIndex={currentIndex() === i ? -1 : 0}
                                    onClick={() => setCurrentIndex(i)}
                                    onFocus={() => setIsHovered(true)}
                                    onFocusOut={() => setIsHovered(false)}
                                    aria-label={`Switch to slide ${i + 1}`}
                                    class="button"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Show>
    );
}
