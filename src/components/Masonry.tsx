import { createSignal, createMemo, onMount, onCleanup, For } from 'solid-js';

type MediaItem = {
    url: string;
};

interface MasonryProps {
    items: MediaItem[];
    minColumnWidth?: number;
    gap?: number;
}

export default function Masonry(props: MasonryProps) {
    const [columnsCount, setColumnsCount] = createSignal(1);
    const [columns, setColumns] = createSignal<MediaItem[][]>([]);

    const minColumnWidth = createMemo(() => props.minColumnWidth ?? 250);
    const gap = createMemo(() => props.gap ?? 0.5);

    const calculateColumnsCount = () => {
        const count = Math.max(
            1,
            Math.floor(window.innerWidth / minColumnWidth())
        );
        setColumnsCount(count);
    };

    const distributeItems = async () => {
        const count = columnsCount();
        const cols: MediaItem[][] = Array.from({ length: count }, () => []);
        const heights = new Array(count).fill(0);

        await Promise.all(
            props.items.map(async (item) => {
                const img = new Image();
                img.src = item.url;

                await new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                });

                const shortestIndex = heights.indexOf(Math.min(...heights));
                cols[shortestIndex].push(item);
                heights[shortestIndex] += img.naturalHeight || 0;
            })
        );

        setColumns(cols);
    };

    onMount(() => {
        calculateColumnsCount();
        distributeItems();
        window.addEventListener('resize', handleResize);
    });

    const handleResize = () => {
        const oldCount = columnsCount();
        calculateColumnsCount();
        if (columnsCount() !== oldCount) {
            distributeItems();
        }
    };

    onCleanup(() => {
        window.removeEventListener('resize', handleResize);
    });

    return (
        <div style={{ display: 'flex', gap: `${gap()}em` }}>
            <For each={columns()}>
                {(col) => (
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            'flex-direction': 'column',
                            gap: `${gap()}em`,
                        }}
                    >
                        <For each={col}>
                            {(media) => (
                                <img
                                    src={media.url}
                                    style={{
                                        width: '100%',
                                        'border-radius': '1em',
                                        'object-fit': 'cover',
                                    }}
                                    loading="lazy"
                                />
                            )}
                        </For>
                    </div>
                )}
            </For>
        </div>
    );
}
