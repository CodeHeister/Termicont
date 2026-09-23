import Masonry from './Masonry';

export default function GalleryTest() {
    const media = [
        { url: 'https://placehold.co/400x500' },
        { url: 'https://placehold.co/400x300' },
        { url: 'https://placehold.co/400x700' },
        { url: 'https://placehold.co/400x350' },
        { url: 'https://placehold.co/400x600' },
        { url: 'https://placehold.co/400x450' },
    ];

    return (
        <div>
            <h1>Галерея</h1>
            <Masonry items={media} minColumnWidth={250} gap={0.75} />
        </div>
    );
}
