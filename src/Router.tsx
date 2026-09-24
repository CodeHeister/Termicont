import { Component, lazy } from 'solid-js';
import { Router } from '@solidjs/router';
import { NavProvider } from '@lib/nav';
import { I18nProvider } from '@lib/i18n';

interface RouterComponentProps {
    base?: string;
    root: Component;
}

const routes = [
    {
        path: '/',
        component: lazy(() => import('./pages/Landing')),
    },
    {
        path: '/contacts',
        component: lazy(() => import('./components/Contacts')),
    },
    {
        path: '/products',
        component: lazy(() => import('./components/Products')),
    },
    {
        path: '/products/:name',
        component: lazy(() => import('./components/Product')),
    },
    {
        path: '/privacy',
        component: lazy(() => import('./pages/PrivacyPolicy')),
    },
    {
        path: '/cookies',
        component: lazy(() => import('./pages/CookiePolicy')),
    },
    {
        path: '/gallery',
        component: lazy(() => import('./components/GalleryTest')),
    },
    {
        path: '*404',
        component: lazy(() => import('./components/NotFound')),
    },
];

const RouterComponent = (props: RouterComponentProps) => (
    <I18nProvider>
        <NavProvider>
            <Router base={props.base} root={props.root}>
                {routes}
            </Router>
        </NavProvider>
    </I18nProvider>
);

export default RouterComponent;
