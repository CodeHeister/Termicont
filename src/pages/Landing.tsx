import { createEffect } from 'solid-js';
import { useNav } from '@lib/nav';
import { useI18n } from '@lib/i18n';
import { AiOutlineInfoCircle } from 'solid-icons/ai';
import { TbBuildingEstate } from 'solid-icons/tb';
import { LandingHero } from '@components/landing/LandingHero';
import { LandingServices } from '@components/landing/LandingServices';
import { LandingWhyUs } from '@components/landing/LandingWhyUs';
import { LandingCases } from '@components/landing/LandingCases';
import { LandingContact } from '@components/landing/LandingContact';
import '@styles/landing.scss';

export default function Landing() {
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
        <div class="landing">
            <LandingHero />
            <LandingServices />
            <LandingWhyUs />
            <LandingCases />
            <LandingContact />
        </div>
    );
}
