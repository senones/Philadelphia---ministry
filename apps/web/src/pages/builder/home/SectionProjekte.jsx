import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridImage from '@/components/builder/elements/GridImage';
import GridTextBox from '@/components/builder/elements/GridTextBox';

const INK = 'rgb(35, 28, 24)';
const GOLD = 'rgb(217, 155, 67)';
const CDN = 'https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d';

const CARDS = [
	{
		id: 'PjCamp',
		img: `${CDN}/93zaqp-SnYHV6dgKB118B67.png`,
		title: 'Sommercamp 2026',
		text: 'Vorbereitungen für das Sommercamp 2026 laufen auf Hochtouren: Programm, Betreuung und Anmeldung für Kinder und Familien aus den Camps.',
		href: '/aktuelles',
		col: '2/3',
		rows: [8, 10, 12, 14],
		mRows: [8, 10, 12, 14],
	},
	{
		id: 'PjSprache',
		img: `${CDN}/9pf9dy-JDoib4C56yBUPEXK.png`,
		title: 'Sprachkurse & Integration',
		text: 'Laufende Sprachkurse und Begegnungstage öffnen Türen: zu Behörden, zu Ausbildung und zu echten Perspektiven im neuen Leben.',
		href: '/unsere-arbeit',
		col: '4/5',
		rows: [8, 10, 12, 14],
		mRows: [16, 18, 20, 22],
	},
	{
		id: 'PjBayt',
		img: `${CDN}/d6qjbh-EyC6kjZGHFlSRV07.png`,
		title: 'Philadelphia Bayt',
		text: 'Unser Haus Philadelphia wächst: Begleitung, Jüngerschaft und ein gemeinsamer Alltag für Bewohner auf ihrem Weg in ein selbstständiges Leben.',
		href: '/philadelphia-bayt',
		col: '6/7',
		rows: [8, 10, 12, 14],
		mRows: [24, 26, 28, 30],
	},
];

export default function SectionProjekte() {
	return (
		<BlockLayout
			blockId={'homeProjekte'}
			htmlId={'aktuelle-projekte'}
			blockClassName={'block'}
			className={'block-layout block-layout--layout'}
			style={{
				'--cols': '12',
				'--width': '1224px',
				'--col-gap': '24px',
				'--row-gap': '16px',
				'--grid-template-columns': '6.54% 28.31% 1.96% 28.31% 1.96% 28.31% 6.54%',
				'--grid-template-rows': '96px auto 16px auto 24px auto 32px auto 16px auto 12px auto 16px auto 96px',
				'--small-desktop-grid-template-rows': '72px auto 16px auto 24px auto 32px auto 16px auto 12px auto 16px auto 72px',
				'--t-grid-template-rows': '56px auto 12px auto 20px auto 24px auto 12px auto 12px auto 16px auto 24px auto 12px auto 12px auto 16px auto 24px auto 12px auto 12px auto 16px auto 56px',
				'--m-grid-template-rows': '48px auto 12px auto 16px auto 16px auto 12px auto 12px auto 16px auto 24px auto 12px auto 12px auto 16px auto 24px auto 12px auto 12px auto 16px auto 48px',
				'--m-grid-template-columns': '100%',
				'--block-min-height': 'auto',
				'--small-desktop-block-min-height': 'auto',
				'--t-block-min-height': 'auto',
				'--m-block-min-height': 'auto',
			}}
			background={{ color: '#ffffff', current: 'color', isTransparent: false }}
		>
			<LayoutElement
				elementId={'hmPjEyebrow'}
				className={'layout-element layout-element--layout transition transition--fade'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 1,
					'--grid-row': '2/3',
					'--grid-column': '2/7',
					'--m-grid-row': '2/3',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'hmPjEyebrow'}
					content={`<span class="body-small" dir="auto" style="color: ${GOLD}; letter-spacing: 0.16em; text-transform: uppercase;">Aktuelle Projekte</span>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'hmPjTitle'}
				className={'layout-element layout-element--layout transition transition--rise'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 2,
					'--grid-row': '4/5',
					'--grid-column': '2/7',
					'--m-grid-row': '4/5',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'hmPjTitle'}
					content={`<h2 dir="auto" style="color: ${INK};">Wo wir gerade wirken</h2>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'hmPjIntro'}
				className={'layout-element layout-element--layout transition transition--slide'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 3,
					'--grid-row': '6/7',
					'--grid-column': '2/7',
					'--m-grid-row': '6/7',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'hmPjIntro'}
					content={`<p dir="auto" style="color: ${INK}; max-width: 720px; margin: 0 auto;">Drei Projekte tragen in diesem Jahr unsere Arbeit – jedes davon ein Ort, an dem Hilfe und Hoffnung konkret werden.</p>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			{CARDS.map((card) => (
				<React.Fragment key={card.id}>
					<LayoutElement
						elementId={`${card.id}Img`}
						className={'layout-element layout-element--layout transition transition--scale transition--root-hidden'}
						style={{
							'--z-index': 4,
							'--grid-row': `${card.rows[0]}/${card.rows[0] + 1}`,
							'--grid-column': card.col,
							'--m-grid-row': `${card.mRows[0]}/${card.mRows[0] + 1}`,
							'--m-grid-column': '1/2',
							'--user-animation-delay': '0.1s',
						}}
						hasRotationFrame={false}
						hasEntranceAnimation={true}
					>
						<GridImage
							id={`${card.id}Img`}
							src={`${card.img}?width=768&fit=crop`}
							srcset={`${card.img}?width=375&fit=crop 375w, ${card.img}?width=768&fit=crop 768w, ${card.img}?width=1024&fit=crop 1024w, ${card.img}?width=1440&fit=crop 1440w`}
							alt={card.title}
							objectFit={'cover'}
							desktopWidth={372}
							desktopHeight={280}
							mobileWidth={328}
							desktopBorderRadius={'8px'}
							mobileBorderRadius={'8px'}
							className={'layout-element__component layout-element__component--GridImage'}
						/>
					</LayoutElement>
					<LayoutElement
						elementId={`${card.id}Title`}
						className={'layout-element layout-element--layout transition transition--fade'}
						style={{
							'--text': 'left',
							'--m-text': 'center',
							'--z-index': 5,
							'--grid-row': `${card.rows[1]}/${card.rows[1] + 1}`,
							'--grid-column': card.col,
							'--m-grid-row': `${card.mRows[1]}/${card.mRows[1] + 1}`,
							'--m-grid-column': '1/2',
							'--user-animation-delay': '0.1s',
						}}
						hasRotationFrame={false}
						hasEntranceAnimation={true}
					>
						<GridTextBox
							id={`${card.id}Title`}
							content={`<h4 dir="auto" style="color: ${INK};">${card.title}</h4>`}
							textAlign={'left'}
							textAlignMobile={'center'}
							className={'layout-element__component layout-element__component--GridTextBox'}
						/>
					</LayoutElement>
					<LayoutElement
						elementId={`${card.id}Text`}
						className={'layout-element layout-element--layout transition transition--fade'}
						style={{
							'--text': 'left',
							'--m-text': 'center',
							'--z-index': 6,
							'--grid-row': `${card.rows[2]}/${card.rows[2] + 1}`,
							'--grid-column': card.col,
							'--m-grid-row': `${card.mRows[2]}/${card.mRows[2] + 1}`,
							'--m-grid-column': '1/2',
							'--user-animation-delay': '0.1s',
						}}
						hasRotationFrame={false}
						hasEntranceAnimation={true}
					>
						<GridTextBox
							id={`${card.id}Text`}
							content={`<p dir="auto" style="color: ${INK};">${card.text}</p>`}
							textAlign={'left'}
							textAlignMobile={'center'}
							className={'layout-element__component layout-element__component--GridTextBox'}
						/>
					</LayoutElement>
					<LayoutElement
						elementId={`${card.id}Link`}
						className={'layout-element layout-element--layout transition transition--fade'}
						style={{
							'--text': 'left',
							'--m-text': 'center',
							'--z-index': 7,
							'--grid-row': `${card.rows[3]}/${card.rows[3] + 1}`,
							'--grid-column': card.col,
							'--m-grid-row': `${card.mRows[3]}/${card.mRows[3] + 1}`,
							'--m-grid-column': '1/2',
							'--user-animation-delay': '0.1s',
						}}
						hasRotationFrame={false}
						hasEntranceAnimation={true}
					>
						<GridTextBox
							id={`${card.id}Link`}
							content={`<p dir="auto"><a href="${card.href}" style="color: ${GOLD}; text-decoration: underline; text-underline-offset: 4px;">Mehr erfahren</a></p>`}
							textAlign={'left'}
							textAlignMobile={'center'}
							className={'layout-element__component layout-element__component--GridTextBox'}
						/>
					</LayoutElement>
				</React.Fragment>
			))}
		</BlockLayout>
	);
}
