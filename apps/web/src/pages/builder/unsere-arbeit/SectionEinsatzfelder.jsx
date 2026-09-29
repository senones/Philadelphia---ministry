import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';

const INK = 'rgb(35, 28, 24)';
const GOLD = 'rgb(217, 155, 67)';

const FELDER = [
	{
		id: 'EfEvangelisation',
		title: 'Evangelisation',
		text: 'Wir teilen den Glauben an Jesus Christus in Wort und Tat – offen, einladend und ohne Druck.',
		col: '2/3',
		row: 8,
		mRow: 8,
	},
	{
		id: 'EfFluechtlinge',
		title: 'Flüchtlingsarbeit',
		text: 'Ganzheitliche Begleitung geflüchteter Menschen: vom ersten Ankommen bis zu einem selbstständigen Leben.',
		col: '4/5',
		row: 8,
		mRow: 10,
	},
	{
		id: 'EfBesuche',
		title: 'Besuche in Flüchtlingscamps',
		text: 'Regelmäßige Besuche in den Camps: Zuhören, Hilfsgüter bringen und Beziehungen aufbauen, die bleiben.',
		col: '2/3',
		row: 10,
		mRow: 12,
	},
	{
		id: 'EfPraktisch',
		title: 'Praktische Hilfe',
		text: 'Kleidung, Lebensmittel, Begleitung zu Behörden und Ärzten – Hilfe, die im Alltag ankommt.',
		col: '4/5',
		row: 10,
		mRow: 14,
	},
	{
		id: 'EfSprache',
		title: 'Sprachkurse',
		text: 'Regelmäßige Sprachkurse öffnen Türen zu Behörden, Ausbildung und echten Perspektiven.',
		col: '2/3',
		row: 12,
		mRow: 16,
	},
	{
		id: 'EfJuengerschaft',
		title: 'Jüngerschaft',
		text: 'Bibelarbeit, Gebet und geistliche Begleitung fördern ein Wachstum im Glauben, das trägt.',
		col: '4/5',
		row: 12,
		mRow: 18,
	},
	{
		id: 'EfFreizeit',
		title: 'Freizeit & Gemeinschaft',
		text: 'Gemeinsame Mahlzeiten, Ausflüge und Feiern schaffen Zugehörigkeit und echte Begegnung.',
		col: '2/3',
		row: 14,
		mRow: 20,
	},
	{
		id: 'EfCamps',
		title: 'Camps & Veranstaltungen',
		text: 'Sommercamps und Veranstaltungen sind Höhepunkte im Jahr – voller Programm, Begegnung und Freude.',
		col: '4/5',
		row: 14,
		mRow: 22,
	},
];

export default function SectionEinsatzfelder() {
	return (
		<BlockLayout
			blockId={'arbeitFelder'}
			htmlId={'einsatzfelder'}
			blockClassName={'block'}
			className={'block-layout block-layout--layout'}
			style={{
				'--cols': '12',
				'--width': '1224px',
				'--col-gap': '24px',
				'--row-gap': '16px',
				'--grid-template-columns': '6.54% 42.73% 1.96% 42.73% 6.54%',
				'--grid-template-rows': '96px auto 16px auto 24px auto 32px auto 24px auto 24px auto 24px auto 96px',
				'--small-desktop-grid-template-rows': '72px auto 16px auto 24px auto 32px auto 24px auto 24px auto 24px auto 72px',
				'--t-grid-template-rows': '56px auto 12px auto 20px auto 24px auto 16px auto 16px auto 16px auto 16px auto 16px auto 16px auto 16px auto 56px',
				'--m-grid-template-rows': '48px auto 12px auto 16px auto 16px auto 16px auto 16px auto 16px auto 16px auto 16px auto 16px auto 16px auto 48px',
				'--m-grid-template-columns': '100%',
				'--block-min-height': 'auto',
				'--small-desktop-block-min-height': 'auto',
				'--t-block-min-height': 'auto',
				'--m-block-min-height': 'auto',
			}}
			background={{ color: '#ffffff', current: 'color', isTransparent: false }}
		>
			<LayoutElement
				elementId={'arEfEyebrow'}
				className={'layout-element layout-element--layout transition transition--fade'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 1,
					'--grid-row': '2/3',
					'--grid-column': '2/5',
					'--m-grid-row': '2/3',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'arEfEyebrow'}
					content={`<span class="body-small" dir="auto" style="color: ${GOLD}; letter-spacing: 0.16em; text-transform: uppercase;">Unsere Einsatzfelder</span>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'arEfTitle'}
				className={'layout-element layout-element--layout transition transition--rise'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 2,
					'--grid-row': '4/5',
					'--grid-column': '2/5',
					'--m-grid-row': '4/5',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'arEfTitle'}
					content={`<h2 dir="auto" style="color: ${INK};">Alles, was wir tun – im Überblick</h2>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'arEfIntro'}
				className={'layout-element layout-element--layout transition transition--slide'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 3,
					'--grid-row': '6/7',
					'--grid-column': '2/5',
					'--m-grid-row': '6/7',
					'--m-grid-column': '1/2',
					'--user-animation-delay': '0.1s',
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={'arEfIntro'}
					content={`<p dir="auto" style="color: ${INK}; max-width: 720px; margin: 0 auto;">Acht Felder, ein Ziel: dass geflüchtete Menschen Hilfe, Glauben und Gemeinschaft erleben.</p>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			{FELDER.map((feld) => (
				<LayoutElement
					key={feld.id}
					elementId={feld.id}
					className={'layout-element layout-element--layout transition transition--fade'}
					style={{
						'--text': 'left',
						'--m-text': 'center',
						'--z-index': 4,
						'--grid-row': `${feld.row}/${feld.row + 1}`,
						'--grid-column': feld.col,
						'--m-grid-row': `${feld.mRow}/${feld.mRow + 1}`,
						'--m-grid-column': '1/2',
						'--user-animation-delay': '0.1s',
					}}
					hasRotationFrame={false}
					hasEntranceAnimation={true}
				>
					<GridTextBox
						id={feld.id}
						content={`<h4 dir="auto" style="color: ${GOLD}; margin-bottom: 6px;">${feld.title}</h4><p dir="auto" style="color: ${INK};">${feld.text}</p>`}
						textAlign={'left'}
						textAlignMobile={'center'}
						className={'layout-element__component layout-element__component--GridTextBox'}
					/>
				</LayoutElement>
			))}
		</BlockLayout>
	);
}
