import { onMount } from 'solid-js';
import { useNav } from '@lib/nav';
import { AiOutlineInfoCircle } from 'solid-icons/ai';
import { TbBuildingEstate } from 'solid-icons/tb';

export default function NotFound() {
    const { setNavLinks } = useNav();

    onMount(() => {
        setNavLinks([
            { routeName: '/', icon: TbBuildingEstate, text: 'Home' },
            { routeName: '/about', icon: AiOutlineInfoCircle, text: 'About' },
        ]);
    });

    return <h2>Page Not Found</h2>;
}
