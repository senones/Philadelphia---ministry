import React from 'react';
import BlockNavigation from '@/components/builder/blocks/BlockNavigation';

export default function Header() {
	return (
		<BlockNavigation
			logoSrc={"/media/philadelphia-logo.jpg"}
			logoText={"Philadelphia International Ministry"}
			logoHref={"/"}
			logoHeightDesktop={108}
			logoHeightMobile={80}
			isLogoVisible
			layout={"desktop-1"}
			mobileLayout={"mobile-1"}
			mobileLinksAlignment={"right"}
			isSticky
			cartIconSize={"24px"}
			style={{
				"--width": "1240px",
				"--padding-top": "30px",
				"--padding": "30px 16px 30px 16px",
				"--padding-right": "16px",
				"--padding-bottom": "30px",
				"--padding-left": "16px",
				"--m-padding-top": "24px",
				"--m-padding": "24px 16px 24px 16px",
				"--m-padding-right": "16px",
				"--m-padding-bottom": "24px",
				"--m-padding-left": "16px",
				"--logo-width": "162px",
				"--cartIconSize": "24px",
				"--link-spacing": "20px",
				"--nav-link-font-size": "13px",
				"--nav-link-m-font-size": "15px",
				"--m-logo-width": "120px",
				"--m-link-spacing": "64px",
				"--element-spacing": "64px",
				"--contrastBackgroundColor": "rgb(198, 207, 219)",
				"--nav-bg": "#f7f4ef",
				"--nav-link-color": "rgb(0, 0, 0)",
				"--nav-link-text-color": "rgb(0, 0, 0)",
				"--nav-link-color-hover": "rgb(0, 0, 0)",
				"--nav-link-text-color-hover": "rgb(0, 0, 0)"
			}}
			nav={[
				{
					id: "home",
					href: "/",
					text: "Startseite",
					isHidden: false,
					hasDropdown: false
				},
				{
					id: "about",
					href: "/ueber-uns",
					text: "Über uns",
					isHidden: false,
					hasDropdown: false
				},
				{
					id: "work",
					href: "/unsere-arbeit",
					text: "Unsere Arbeit",
					isHidden: false,
					hasDropdown: false
				},
				{
					id: "bayt",
					href: "/philadelphia-bayt",
					text: "Philadelphia Bayt",
					isHidden: false,
					hasDropdown: false
				},
				{
					id: "stories",
					href: "/lebensgeschichten",
					text: "Geschichten",
					isHidden: false,
					hasDropdown: false
				},
				{
					id: "news",
					href: "/aktuelles",
					text: "Aktuelles",
					isHidden: false,
					hasDropdown: false
				},
				{
					id: "support",
					href: "/mitmachen",
					text: "Mitmachen",
					isHidden: false,
					hasDropdown: false
				},
				{
					id: "contact",
					href: "/kontakt",
					text: "Kontakt",
					isHidden: false,
					hasDropdown: false
				},
			]}
		/>
	);
}
