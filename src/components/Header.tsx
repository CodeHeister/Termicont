import { Show, createSignal } from 'solid-js';
import { LanguageDropdown } from './LanguageDropdown';
import { ThemeToggle } from './ThemeToggle';
import { useNav, NavBuilder } from '@lib/nav';
import '@styles/header.scss';

export default function Header() {
    const { navLinks } = useNav();
    const [hamActive, setHamActive] = createSignal(false);

    return (
        <header class="header" aria-label="Header" data-active={hamActive()}>
            <div class="left-wrapper">
                <svg
                    class="ham hamRotate ham8"
                    viewBox="0 0 100 100"
                    onClick={() => setHamActive((prev) => !prev)}
                    data-active={hamActive()}
                >
                    <path
                        class="line top"
                        d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
                    />
                    <path class="line middle" d="m 30,50 h 40" />
                    <path
                        class="line bottom"
                        d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
                    />
                </svg>
                <div class="logo" aria-label="Naming">
                    TERMICONT
                </div>
            </div>
            <Show when={navLinks().length > 0}>
                <NavBuilder links={navLinks()} />
            </Show>
            <div class="right-wrapper" aria-label="Extra buttons">
                <ThemeToggle />
                <LanguageDropdown />
            </div>
        </header>
    );
}
