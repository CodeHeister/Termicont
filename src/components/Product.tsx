import { useParams, Navigate } from '@solidjs/router';
import { For, createSignal } from 'solid-js';
import '@styles/product.scss';

type Info = {
    name: string;
    title: string;
    description: string;
    media: Media[];
    details: Block[];
};

type Media = {
    type: MediaType;
    url: string;
};

interface BaseBlock {
    type: BlockType;
}

interface ImageBlock extends BaseBlock {
    type: BlockType.Image;
    url: string;
}

interface TextBlock extends BaseBlock {
    type: BlockType.Text;
    text: string;
}

type Block = ImageBlock | TextBlock;

enum MediaType {
    Video,
    Image,
}

enum BlockType {
    Image,
    Text,
}

export const content: Record<string, Info> = {
    apple: {
        name: 'apple',
        title: 'Apple Product',
        media: [
            {
                type: MediaType.Image,
                url: 'https://placehold.co/600x400',
            },
            {
                type: MediaType.Image,
                url: 'https://placehold.co/500x500',
            },
            {
                type: MediaType.Image,
                url: 'https://placehold.co/300x700',
            },
            {
                type: MediaType.Image,
                url: 'https://placehold.co/700x300',
            },
            {
                type: MediaType.Image,
                url: 'https://placehold.co/600x200',
            },
        ],
        details: [
            {
                type: BlockType.Image,
                url: 'https://placehold.co/600x400/transparent/red/png?text=Apple&font=Raleway',
            },
            { type: BlockType.Text, text: 'Apple is a popular fruit.' },
        ],
    },

    banana: {
        name: 'banana',
        title: 'Banana Product',
        media: [
            {
                type: MediaType.Image,
                url: 'https://placehold.co/600x400/transparent/yellow/png?text=Banana&font=Raleway',
            },
        ],
        details: [
            { type: BlockType.Text, text: 'Bananas are rich in potassium.' },
            {
                type: BlockType.Image,
                url: 'https://placehold.co/600x400/transparent/yellow/png?text=Banana&font=Raleway',
            },
        ],
    },

    cherry: {
        name: 'cherry',
        title: 'Cherry Product',
        media: [
            {
                type: MediaType.Image,
                url: 'https://placehold.co/600x400/transparent/pink/png?text=Cherry&font=Raleway',
            },
        ],
        details: [
            {
                type: BlockType.Text,
                text: 'Cherries are delicious and nutritious.',
            },
        ],
    },
};

export default function Product() {
    const params = useParams();
    const name = params.name;

    if (!name || !Object.hasOwn(content, name)) {
        return <Navigate href="/404" />;
    }

    const item: Info = content[name];
    const [activeIndex, setActiveIndex] = createSignal(0);

    const activeMedia = () => item.media[activeIndex()];
    return (
        <div class="product-container">
            <h1 class="title">{item.title}</h1>
            <div class="media-container">
                <div class="media-holder">
                    {activeMedia().type === MediaType.Image && (
                        <img src={activeMedia().url} alt={item.title} />
                    )}
                    {activeMedia().type === MediaType.Video && (
                        <video controls>
                            <source src={activeMedia().url} type="video/mp4" />
                        </video>
                    )}
                </div>
                <div class="preview-container">
                    <For each={item.media}>
                        {(media, index) => (
                            <div
                                data-active={activeIndex() === index()}
                                class="preview-holder"
                                onClick={() => setActiveIndex(index())}
                            >
                                {media.type === MediaType.Image && (
                                    <img
                                        src={media.url}
                                        alt={`preview-${index()}`}
                                    />
                                )}
                                {media.type === MediaType.Video && (
                                    <video>
                                        <source
                                            src={media.url}
                                            type="video/mp4"
                                        />
                                    </video>
                                )}
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
}
