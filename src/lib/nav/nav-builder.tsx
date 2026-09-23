import { For } from 'solid-js';
import { useLocation } from '@solidjs/router';
import { RiArrowsArrowDownSLine } from 'solid-icons/ri';
import { NavLink } from '@lib/nav';

export function NavBuilder(props: { links: NavLink[] }) {
    const location = useLocation();

    const RenderLinks = (links: NavLink[]) => (
        <ul class="nav" aria-label="Navigation links">
            <For each={links}>
                {(link) => {
                    const Icon = link.icon;
                    const isActive = (() =>
                        location.pathname === link.routeName)();

                    return (
                        <li
                            data-active={isActive}
                            class="item"
                            aria-label="Navigation link"
                        >
                            <a
                                role="link"
                                tabindex={isActive ? '-1' : '0'}
                                href={link.routeName}
                                class="link"
                                aria-label={link.text}
                            >
                                <i class="icon">
                                    <Icon />
                                </i>
                                <span class="link-text">{link.text}</span>
                                {link.links && link.links.length > 0 && (
                                    <i class="icon arrow">
                                        <RiArrowsArrowDownSLine />
                                    </i>
                                )}
                            </a>
                            {link.links &&
                                link.links.length > 0 &&
                                RenderLinks(link.links)}
                        </li>
                    );
                }}
            </For>
        </ul>
    );

    return (
        <nav class="navbar" aria-label="Navigation bar">
            {RenderLinks(props.links)}
        </nav>
    );
}
