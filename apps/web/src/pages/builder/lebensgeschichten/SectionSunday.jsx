import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridImage from '@/components/builder/elements/GridImage';
import GridTextBox from '@/components/builder/elements/GridTextBox';

const INK = 'rgb(35, 28, 24)';
const GOLD = 'rgb(217, 155, 67)';
const IMG = 'https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/gfsidd-6qwYd1lSuNA6LJMo.png';

export default function SectionSunday() {
	return (
		<BlockLayout
			blockId={'storySunday'}
			htmlId={'sunday'}
			blockClassName={'block'}
			className={'block-layout block-layout--layout'}
			style={{
				'--cols': '12',
				'--width': '1224px',
				'--col-gap': '24px',
				'--row-gap': '16px',
				'--grid-template-columns': '6.54% 41.5% 4.92% 41.5% 6.54%',
				'--grid-template-rows': '96px auto 16px auto 24px auto 32px auto 96px',
				'--small-desktop-grid-template-rows': '72px auto 16px auto 24px auto 32px auto 72px',
				'--t-grid-template-rows': '56px auto 12px auto 20px auto 20px auto 24px auto 56px',
				'--m-grid-template-rows': '48px auto 12px auto 16px auto 16px auto 24px auto 48px',
				'--m-grid-template-columns': '100%',
				'--block-min-height': 'auto',
				'--small-desktop-block-min-height': 'auto',
				'--t-block-min-height': 'auto',
				'--m-block-min-height': 'auto',
			}}
			background={{ color: '#ffffff', current: 'color', isTransparent: false }}
		>
			<LayoutElement
				elementId={'stSuImg'}
				className={'layout-element layout-element--layout transition transition--scale transition--root-hidden'}
				style={{
					'--z-index': 1,
					'--grid-row': '2/9',
					'--grid-column': '4/5',
					'--m-grid-row': '10/11',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridImage
					id={'stSuImg'}
					src={`${IMG}?width=768&fit=crop`}
					srcset={`${IMG}?width=375&fit=crop 375w, ${IMG}?width=768&fit=crop 768w, ${IMG}?width=1024&fit=crop 1024w, ${IMG}?width=1440&fit=crop 1440w`}
					alt={'Sunday'}
					objectFit={'cover'}
					desktopWidth={612}
					desktopHeight={600}
					mobileWidth={328}
					desktopBorderRadius={'8px'}
					mobileBorderRadius={'8px'}
					className={'layout-element__component layout-element__component--GridImage'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'stSuEyebrow'}
				className={'layout-element layout-element--layout transition transition--fade'}
				style={{
					'--text': 'left',
					'--m-text': 'center',
					'--z-index': 2,
					'--grid-row': '2/3',
					'--grid-column': '2/3',
					'--m-grid-row': '2/3',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'stSuEyebrow'}
					content={`<span class="body-small" dir="auto" style="color: ${GOLD}; letter-spacing: 0.16em; text-transform: uppercase;">Zeugnis eines Bewohners</span>`}
					textAlign={'left'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'stSuTitle'}
				className={'layout-element layout-element--layout transition transition--slide-right'}
				style={{
					'--text': 'left',
					'--m-text': 'center',
					'--z-index': 3,
					'--grid-row': '4/5',
					'--grid-column': '2/3',
					'--m-grid-row': '4/5',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'stSuTitle'}
					content={`<h2 dir="auto" style="color: ${INK};">Sundays Weg in ein neues Leben</h2>`}
					textAlign={'left'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'stSuText'}
				className={'layout-element layout-element--layout transition transition--fade'}
				style={{
					'--text': 'left',
					'--m-text': 'center',
					'--z-index': 4,
					'--grid-row': '6/7',
					'--grid-column': '2/3',
					'--m-grid-row': '6/7',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'stSuText'}
					content={`<p dir="auto" style="color: ${INK};">[Platzhalter: Sundays Geschichte wird nach Erhalt des Originaltextes und seiner ausdrücklichen Freigabe ergänzt.]</p>`}
					textAlign={'left'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'stSuLink'}
				className={'layout-element layout-element--layout transition transition--fade'}
				style={{
					'--text': 'left',
					'--m-text': 'center',
					'--z-index': 5,
					'--grid-row': '8/9',
					'--grid-column': '2/3',
					'--m-grid-row': '8/9',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'stSuLink'}
					content={`<p dir="auto"><a href="/ueber-uns" style="color: ${GOLD}; text-decoration: underline; text-underline-offset: 4px;">Zeugnisse & Dokumente ansehen</a></p>`}
					textAlign={'left'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
