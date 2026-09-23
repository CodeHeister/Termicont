import { Component } from 'solid-js';
import type { ParentProps } from 'solid-js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@styles/global.scss';
import '@styles/navbar.scss';

const Layout: Component<ParentProps> = (props) => {
    return (
        <div class="container">
            <div class="page-bg" aria-hidden="true" />
            <Header />
            <main>{props.children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
