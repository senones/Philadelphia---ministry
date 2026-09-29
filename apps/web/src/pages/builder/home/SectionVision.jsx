import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';

const INK = 'rgb(35, 28, 24)';
const GOLD = 'rgb(217, 155, 67)';

export default function SectionVision() {
	return (
		<BlockLayout
			blockId={'homeVision'}
			htmlId={'vision'}
			blockClassName={'block'}
			className={'block-layout block-layout--layout'}
			style={{
				'--cols': '12',
				'--width': '1224px',
				'--col-gap': '24px',
				'--row-gap': '16px',
				'--grid-template-columns': '6.54% 86.92% 6.54%',
				'--grid-template-rows': '96px auto 16px auto 24px auto 24px auto 96px',
				'--small-desktop-grid-template-rows': '72px auto 16px auto 24px auto 24px auto 72px',
				'--t-grid-template-rows': '56px auto 12px auto 20px auto 20px auto 56px',
				'--m-grid-template-rows': '48px auto 12px auto 16px auto 16px auto 48px',
				'--m-grid-template-columns': '100%',
				'--block-min-height': 'auto',
				'--small-desktop-block-min-height': 'auto',
				'--t-block-min-height': 'auto',
				'--m-block-min-height': 'auto',
			}}
			background={{ color: '#ffffff', current: 'color', isTransparent: false }}
		>
			<LayoutElement
				elementId={'hmViEyebrow'}
				className={'layout-element layout-element--layout transition transition--fade'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 1,
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
					id={'hmViEyebrow'}
					content={`<span class="body-small" dir="auto" style="color: ${GOLD}; letter-spacing: 0.16em; text-transform: uppercase;">Vision & Leitgedanke</span>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'hmViTitle'}
				className={'layout-element layout-element--layout transition transition--rise'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 2,
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
					id={'hmViTitle'}
					content={`<h2 dir="auto" style="color: ${INK};">Würde, Glaube und ein neuer Anfang</h2>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'hmViText'}
				className={'layout-element layout-element--layout transition transition--slide'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 3,
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
					id={'hmViText'}
					content={`<p dir="auto" style="color: ${INK}; max-width: 760px; margin: 0 auto;">Unser Leitgedanke: Kein Mensch bleibt allein. Wir begleiten geflüchtete Menschen ganzheitlich – mit praktischer Hilfe, Sprachkursen, Seelsorge und einem Zuhause, in dem Gemeinschaft gelebt wird. So wird aus Ankunft ein Neuanfang.</p>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={'hmViMotto'}
				className={'layout-element layout-element--layout transition transition--fade'}
				style={{
					'--text': 'center',
					'--m-text': 'center',
					'--z-index': 4,
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
					id={'hmViMotto'}
					content={`<p dir="auto" class="body-small" style="color: ${GOLD}; letter-spacing: 0.16em; text-transform: uppercase;">Würde - Hoffnung - Gemeinschaft</p>`}
					textAlign={'center'}
					textAlignMobile={'center'}
					className={'layout-element__component layout-element__component--GridTextBox'}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
