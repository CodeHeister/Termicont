import { For, createEffect } from 'solid-js';
import { useNav } from '@lib/nav';
import { useI18n } from '@lib/i18n';
import { AiOutlineInfoCircle } from 'solid-icons/ai';
import { TbBuildingEstate } from 'solid-icons/tb';
import '@styles/contacts.scss';

type ContactsType = {
    title: string;
    text: string[];
};

const info: ContactsType[] = [
    {
        title: 'Lorem ipsum dolor',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id.',
    },
    {
        title: 'Lorem ipsum dolor',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id.',
    },
    {
        title: 'Lorem ipsum dolor',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id.',
    },
    {
        title: 'Lorem ipsum dolor',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id.',
    },
];

export default function Contacts() {
    const { setNavLinks } = useNav();
    const { t } = useI18n();

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

    return (
        <div class="contacts">
            <For each={info}>
                {(item) => (
                    <div class="contact-wrapper">
                        <h2>{item.title}</h2>
                        <div class="text">{item.text}</div>
                    </div>
                )}
            </For>
        </div>
    );
}
