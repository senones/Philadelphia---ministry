import React, {
	useEffect,
	useRef,
	useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import GridButton from '../elements/GridButton.jsx';
import GridSocialIcons from '../elements/GridSocialIcons.jsx';
import LanguageSwitcher from '../LanguageSwitcher.jsx';
import SmartLink from '../SmartLink.jsx';
import BlockStickyBar from './BlockStickyBar.jsx';

function normalizePath(path) {
	if (!path || path === '/') {
		return '/';
	}

	return path.endsWith('/') ? path.slice(0, -1) : path;
}

function setPageHeaderHeight(fromElement, heightPx, { isTransparent = false } = {}) {
	const page = fromElement?.closest?.('.page');
	if (!page) {
		return;
	}

	if (!isTransparent) {
		page.style.removeProperty('--header-height');
		page.style.removeProperty('--header-height-mobile');
		return;
	}

	const value = `${Math.round(heightPx)}px`;
	page.style.setProperty('--header-height', value);
	page.style.setProperty('--header-height-mobile', value);
}

function ChevronIcon() {
	return (
		<svg
			className="block-navigation__chevron"
			width="12"
			height="12"
			viewBox="0 0 12 12"
			aria-hidden="true"
			focusable="false"
		>
			<path
				d="M2.5 4.5L6 8l3.5-3.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function NavItemLabel({
	item,
	activePath,
}) {
	const label = item?.text || '';
	const href = item?.href || '';
	const hasHref = Boolean(href);
	const isActive = hasHref && normalizePath(href) === activePath;
	const className = [
		'block-navigation__link',
		isActive ? 'block-navigation__link--active' : '',
		item?.hasDropdown ? 'block-navigation__link--has-dropdown' : '',
	].filter(Boolean).join(' ');

	const content = (
		<>
			<span className="block-navigation__link-text">{label}</span>
			{item?.hasDropdown ? <ChevronIcon /> : null}
		</>
	);

	if (!hasHref) {
		return (
			<span className={className} aria-haspopup={item?.hasDropdown ? 'true' : undefined}>
				{content}
			</span>
		);
	}

	return (
		<SmartLink
			className={className}
			href={href}
			target={item?.target}
			rel={item?.rel}
			aria-current={isActive ? 'page' : undefined}
			aria-haspopup={item?.hasDropdown ? 'true' : undefined}
		>
			{content}
		</SmartLink>
	);
}

function NavItem({
	item,
	index,
	activePath,
	depth = 0,
}) {
	if (!item || item.isHidden) {
		return null;
	}

	const label = item?.text || `Link ${index + 1}`;
	const hasDropdown = Boolean(item.hasDropdown && item.subItems?.length);
	const isActive = item.href && normalizePath(item.href) === activePath;

	return (
		<li
			className={[
				'block-navigation__item',
				isActive ? 'block-navigation__item--active' : '',
				hasDropdown ? 'block-navigation__item--has-dropdown' : '',
			].filter(Boolean).join(' ')}
		>
			{hasDropdown ? (
				<label className="block-navigation__item-label">
					<input
						type="checkbox"
						className="block-navigation__mobile-dropdown-trigger"
						aria-label={`${label} submenu`}
					/>
					<NavItemLabel item={item} activePath={activePath} />
					<div className="block-navigation__dropdown-area">
						<ul className="block-navigation__sublinks">
							{item.subItems.map((subItem, subIndex) => (
								<NavItem
									key={subItem?.id || `${label}-sub-${subIndex}`}
									item={subItem}
									index={subIndex}
									activePath={activePath}
									depth={depth + 1}
								/>
							))}
						</ul>
					</div>
				</label>
			) : (
				<NavItemLabel item={item} activePath={activePath} />
			)}
		</li>
	);
}

export default function BlockNavigation({
	logoSrc,
	logoText = 'Home',
	logoHref = '/',
	logoAlt,
	logoHeightDesktop,
	logoHeightMobile,
	nav = [],
	style = {},
	layout = 'desktop-1',
	mobileLayout = 'mobile-1',
	mobileLinksAlignment = 'left',
	isLogoVisible = true,
	isSticky = false,
	isTransparent = false,
	isCartVisible = false,
	cartText = '',
	cartIconSize = '24px',
	cartButton: CartButton = null,
	stickyBar = null,
	languageSwitcher = null,
	socialIcons = null,
	ctaButton = null,
	searchBar = null,
	searchBarComponent: SearchBarComponent = null,
}) {
	const location = useLocation();
	const stickyTriggerRef = useRef(null);
	const headerRef = useRef(null);
	const [hasUserScrolled, setHasUserScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const headerEl = headerRef.current;
		if (!headerEl) {
			return undefined;
		}

		const publishHeight = () => {
			setPageHeaderHeight(headerEl, headerEl.getBoundingClientRect().height, {
				isTransparent,
			});
		};

		publishHeight();

		if (typeof ResizeObserver === 'undefined') {
			window.addEventListener('resize', publishHeight);
			return () => {
				window.removeEventListener('resize', publishHeight);
			};
		}

		const observer = new ResizeObserver(publishHeight);
		observer.observe(headerEl);

		return () => {
			observer.disconnect();
		};
	}, [isSticky, isTransparent, logoSrc, logoText, nav, isMobileMenuOpen]);

	useEffect(() => {
		if (!isSticky) {
			return undefined;
		}

		const trigger = stickyTriggerRef.current;

		if (!trigger || typeof IntersectionObserver === 'undefined') {
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setHasUserScrolled(!entry.isIntersecting);
			},
			{
				threshold: 1,
			},
		);

		observer.observe(trigger);

		return () => {
			observer.disconnect();
		};
	}, [isSticky]);

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		if (!isMobileMenuOpen) {
			document.body.style.removeProperty('overflow');
			return undefined;
		}

		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.removeProperty('overflow');
		};
	}, [isMobileMenuOpen]);

	const items = Array.isArray(nav) ? nav : [];
	const showImageLogo = Boolean(logoSrc);
	const activePath = normalizePath(location.pathname);

	const isOpaque = !isTransparent || (isSticky && hasUserScrolled);

	const className = [
		'top-blocks',
		isSticky ? 'top-blocks--sticky' : '',
		isSticky && hasUserScrolled ? 'top-blocks--with-shadow' : '',
		isOpaque ? 'top-blocks--opaque' : '',
		isMobileMenuOpen ? 'top-blocks--nav-open' : '',
	].filter(Boolean).join(' ');

	const headerStyle = {
		...style,
		...(logoHeightDesktop
			? { '--logo-height': typeof logoHeightDesktop === 'number' ? `${logoHeightDesktop}px` : logoHeightDesktop }
			: null),
		...(logoHeightMobile
			? { '--m-logo-height': typeof logoHeightMobile === 'number' ? `${logoHeightMobile}px` : logoHeightMobile }
			: null),
	};

	// desktop-5 stacks the logo above its own row, where social icons sit opposite the extras.
	const isSocialIconsStandalone = layout === 'desktop-5';

	const socialIconsSlot = socialIcons?.props ? (
		<div className={[
			'block-navigation__component',
			isSocialIconsStandalone ? 'block-navigation__social-slot' : '',
		].filter(Boolean).join(' ')}
		>
			<GridSocialIcons
				id={socialIcons.props.id}
				className="block-navigation__social-icons"
				links={socialIcons.props.links}
				iconSize={socialIcons.props.iconSize}
				iconColor={socialIcons.props.iconColor}
				iconColorHover={socialIcons.props.iconColorHover}
			/>
		</div>
	) : null;

	// The mobile bar holds the cart while the dropdown holds every other extra.
	const cart = isCartVisible && CartButton ? (
		<CartButton
			cartText={cartText}
			cartIconSize={cartIconSize}
		/>
	) : null;

	const extras = (
		<div className="block-navigation__right-side">
			{languageSwitcher ? (
				<LanguageSwitcher
					currentLocale={languageSwitcher.currentLocale}
					languages={languageSwitcher.languages}
				/>
			) : null}
			{isSocialIconsStandalone ? null : socialIconsSlot}
			{searchBar?.props && SearchBarComponent ? (
				<div className="block-navigation__component block-navigation__search">
					<SearchBarComponent {...searchBar.props} />
				</div>
			) : null}
			{cart ? (
				<div className="block-navigation__cart block-navigation__cart--desktop">
					{cart}
				</div>
			) : null}
			{ctaButton?.props ? (
				<div className="block-navigation__component block-navigation__button">
					<GridButton {...ctaButton.props} />
				</div>
			) : null}
		</div>
	);

	return (
		<>
			{isSticky ? (
				<div
					ref={stickyTriggerRef}
					className="sticky-trigger"
					aria-hidden="true"
				/>
			) : null}
			<div ref={headerRef} className={className} style={headerStyle}>
				{stickyBar ? <BlockStickyBar {...stickyBar} /> : null}
				<header className="block-navigation">
					<div
						className={[
							'block-navigation__inner',
							`block-navigation__inner--${layout}`,
							`block-navigation__inner--${mobileLayout}`,
						].join(' ')}
					>
						{isLogoVisible ? (
							<SmartLink className="block-navigation__logo" href={logoHref || '/'}>
								{showImageLogo ? (
									<img
										className="block-navigation__logo-image"
										src={logoSrc}
										alt={logoAlt || logoText || 'Logo'}
									/>
								) : (
									<span className="block-navigation__logo-text">{logoText}</span>
								)}
							</SmartLink>
						) : null}
						{cart ? (
							<div className="block-navigation__cart block-navigation__cart--mobile">
								{cart}
							</div>
						) : null}
						<button
							type="button"
							className={[
								'block-navigation__hamburger',
								isMobileMenuOpen ? 'block-navigation__hamburger--open' : '',
							].filter(Boolean).join(' ')}
							aria-expanded={isMobileMenuOpen}
							aria-controls="block-navigation-menu"
							aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
							onClick={() => setIsMobileMenuOpen((open) => !open)}
						>
							<span className="block-navigation__hamburger-line" />
							<span className="block-navigation__hamburger-line" />
							<span className="block-navigation__hamburger-line" />
						</button>
						<div
							id="block-navigation-menu"
							className={[
								'block-navigation__end',
								`block-navigation__end--align-${mobileLinksAlignment}`,
								isMobileMenuOpen ? 'block-navigation__end--open' : '',
							].filter(Boolean).join(' ')}
						>
							<ul className="block-navigation__links">
								{items.map((item, index) => (
									<NavItem
										key={item?.id || `${item?.text || 'link'}-${index}`}
										item={item}
										index={index}
										activePath={activePath}
									/>
								))}
							</ul>
							{isSocialIconsStandalone ? socialIconsSlot : null}
							{extras}
						</div>
					</div>
				</header>
			</div>
		</>
	);
}
