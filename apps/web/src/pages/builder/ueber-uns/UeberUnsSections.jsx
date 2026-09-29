import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';

const INK = 'rgb(35, 28, 24)';
const GOLD = 'rgb(217, 155, 67)';

function TextBox({ id, content, align = 'left' }) {
	return (
		<LayoutElement
			elementId={id}
			className={'layout-element layout-element--layout transition transition--fade'}
			style={{
				'--text': align,
				'--m-text': 'center',
				'--z-index': 1,
				'--grid-row': 'var(--el-row)',
				'--grid-column': 'var(--el-col)',
				'--m-grid-row': 'var(--el-m-row)',
				'--m-grid-column': '1/2',
				'--user-animation-delay': '0.1s',
			}}
			hasRotationFrame={false}
			hasEntranceAnimation={true}
		>
			<GridTextBox
				id={id}
				content={content}
				textAlign={align}
				textAlignMobile={'center'}
				className={'layout-element__component layout-element__component--GridTextBox'}
			/>
		</LayoutElement>
	);
}

/* Wrapper: setzt pro Element die Grid-Position über CSS-Variablen */
function El({ row, col, mRow, children }) {
	return (
		<div
			style={{
				display: 'contents',
				'--el-row': `${row}/${row + 1}`,
				'--el-col': col,
				'--el-m-row': `${mRow}/${mRow + 1}`,
			}}
		>
			{children}
		</div>
	);
}

export function SectionGeschichte() {
	return (
		<BlockLayout
			blockId={'ubGeschichte'}
			htmlId={'geschichte'}
			blockClassName={'block'}
			className={'block-layout block-layout--layout'}
			style={{
				'--cols': '12',
				'--width': '1224px',
				'--col-gap': '24px',
				'--row-gap': '16px',
				'--grid-template-columns': '6.54% 86.92% 6.54%',
				'--grid-template-rows': '96px auto 16px auto 24px auto 24px auto 24px auto 24px auto 96px',
				'--small-desktop-grid-template-rows': '72px auto 16px auto 24px auto 24px auto 24px auto 24px auto 72px',
				'--t-grid-template-rows': '56px auto 12px auto 20px auto 20px auto 20px auto 20px auto 56px',
				'--m-grid-template-rows': '48px auto 12px auto 16px auto 16px auto 16px auto 16px auto 48px',
				'--m-grid-template-columns': '100%',
				'--block-min-height': 'auto',
				'--small-desktop-block-min-height': 'auto',
				'--t-block-min-height': 'auto',
				'--m-block-min-height': 'auto',
			}}
			background={{ color: '#f7f4ef', current: 'color', isTransparent: false }}
		>
			<El row={2} col={'2/3'} mRow={2}>
				<TextBox
					id={'ubGeEyebrow'}
					content={`<span class="body-small" dir="auto" style="color: ${GOLD}; letter-spacing: 0.16em; text-transform: uppercase;">Unsere Geschichte</span>`}
				/>
			</El>
			<El row={4} col={'2/3'} mRow={4}>
				<TextBox
					id={'ubGeTitle'}
					content={`<h2 dir="auto" style="color: ${INK};">Von den Anfängen bis heute</h2>`}
				/>
			</El>
			<El row={6} col={'2/3'} mRow={6}>
				<TextBox
					id={'ubGeIntro'}
					content={`<p dir="auto" style="color: ${INK}; max-width: 720px;">Was mit einem einfachen Gebetskreis für geflüchtete Familien begann, ist heute ein Ministry, das Menschen ganzheitlich begleitet – praktisch, geistlich und in Gemeinschaft.</p>`}
				/>
			</El>
			<El row={8} col={'2/3'} mRow={8}>
				<TextBox
					id={'ubGeP1'}
					content={`<h4 dir="auto" style="color: ${GOLD}; margin-bottom: 6px;">Der Anfang</h4><p dir="auto" style="color: ${INK};">Ein kleiner Kreis von Helfern traf sich regelmäßig mit Geflüchteten in Athen – zum Zuhören, Beten und ersten praktischen Unterstützung.</p>`}
				/>
			</El>
			<El row={10} col={'2/3'} mRow={10}>
				<TextBox
					id={'ubGeP2'}
					content={`<h4 dir="auto" style="color: ${GOLD}; margin-bottom: 6px;">Das Wachstum</h4><p dir="auto" style="color: ${INK};">Aus den Begegnungen wuchsen regelmäßige Camp-Besuche, Sprachkurse und Gemeinschaftstreffen – und mit ihnen ein Netzwerk von Partnern und Freiwilligen.</p>`}
				/>
			</El>
			<El row={12} col={'2/3'} mRow={12}>
				<TextBox
					id={'ubGeP3'}
					content={`<h4 dir="auto" style="color: ${GOLD}; margin-bottom: 6px;">Heute</h4><p dir="auto" style="color: ${INK};">Mit dem Philadelphia Bayt, Sommercamps und ständiger Begleitung leben wir denselben Gedanken wie am ersten Tag: Jeder Mensch ist willkommen.</p>`}
				/>
			</El>
		</BlockLayout>
	);
}

export function SectionVisionZiele() {
	return (
		<BlockLayout
			blockId={'ubVision'}
			htmlId={'vision-ziele'}
			blockClassName={'block'}
			className={'block-layout block-layout--layout'}
			style={{
				'--cols': '12',
				'--width': '1224px',
				'--col-gap': '24px',
				'--row-gap': '16px',
				'--grid-template-columns': '6.54% 28.31% 1.96% 28.31% 1.96% 28.31% 6.54%',
				'--grid-template-rows': '96px auto 16px auto 24px auto 32px auto 96px',
				'--small-desktop-grid-template-rows': '72px auto 16px auto 24px auto 32px auto 72px',
				'--t-grid-template-rows': '56px auto 12px auto 20px auto 20px auto 16px auto 16px auto 56px',
				'--m-grid-template-rows': '48px auto 12px auto 16px auto 16px auto 16px auto 16px auto 48px',
				'--m-grid-template-columns': '100%',
				'--block-min-height': 'auto',
				'--small-desktop-block-min-height': 'auto',
				'--t-block-min-height': 'auto',
				'--m-block-min-height': 'auto',
			}}
			background={{ color: '#ffffff', current: 'color', isTransparent: false }}
		>
			<El row={2} col={'2/7'} mRow={2}>
				<TextBox
					id={'ubViEyebrow'}
					content={`<span class="body-small" dir="auto" style="color: ${GOLD}; letter-spacing: 0.16em; text-transform: uppercase;">Vision & Ziele</span>`}
				/>
			</El>
			<El row={4} col={'2/7'} mRow={4}>
				<TextBox
					id={'ubViTitle'}
					content={`<h2 dir="auto" style="color: ${INK};">Unsere Vision</h2>`}
				/>
			</El>
			<El row={6} col={'2/7'} mRow={6}>
				<TextBox
					id={'ubViIntro'}
					content={`<p dir="auto" style="color: ${INK};">Wir glauben an eine Zukunft, in der geflüchtete Menschen nicht nur ankommen, sondern wachsen – in Würde, im Glauben und in einer Gemeinschaft, die sie trägt.</p>`}
				/>
			</El>
			<El row={8} col={'2/3'} mRow={8}>
				<TextBox
					id={'ubViZ1'}
					content={`<h4 dir="auto" style="color: ${INK}; margin-bottom: 6px;">Würde leben</h4><p dir="auto" style="color: ${INK};">Jeder Mensch begegnet uns auf Augenhöhe – unabhängig von Herkunft, Kultur oder Geschichte.</p>`}
				/>
			</El>
			<El row={8} col={'4/5'} mRow={10}>
				<TextBox
					id={'ubViZ2'}
					content={`<h4 dir="auto" style="color: ${INK}; margin-bottom: 6px;">Glaube weitergeben</h4><p dir="auto" style="color: ${INK};">Evangelisation und Jüngerschaft verbinden wir mit alltäglichem, praktischem Dienst am Nächsten.</p>`}
				/>
			</El>
			<El row={8} col={'6/7'} mRow={12}>
				<TextBox
					id={'ubViZ3'}
					content={`<h4 dir="auto" style="color: ${INK}; margin-bottom: 6px;">Perspektiven öffnen</h4><p dir="auto" style="color: ${INK};">Durch Sprache, Begleitung und Gemeinschaft entstehen echte Chancen für ein neues Leben.</p>`}
				/>
			</El>
		</BlockLayout>
	);
}

export function SectionGlaubensgrundlagen() {
	return (
		<BlockLayout
			blockId={'ubGlaube'}
			htmlId={'glaubensgrundlagen'}
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
			background={{ color: '#f7f4ef', current: 'color', isTransparent: false }}
		>
			<El row={2} col={'2/3'} mRow={2}>
				<TextBox
					id={'ubGlEyebrow'}
					content={`<span class="body-small" dir="auto" style="color: ${GOLD}; letter-spacing: 0.16em; text-transform: uppercase;">Glaubensgrundlagen</span>`}
				/>
			</El>
			<El row={4} col={'2/3'} mRow={4}>
				<TextBox
					id={'ubGlTitle'}
					content={`<h2 dir="auto" style="color: ${INK};">Unser Fundament</h2>`}
				/>
			</El>
			<El row={6} col={'2/3'} mRow={6}>
				<TextBox
					id={'ubGlIntro'}
					content={`<p dir="auto" style="color: ${INK}; max-width: 720px;">Unser Dienst trägt sich von dem, was wir glauben. Die Bibel ist dafür Maßstab und Quelle – im Wort und im Alltag.</p>`}
				/>
			</El>
			<El row={8} col={'2/3'} mRow={8}>
				<TextBox
					id={'ubGlList'}
					content={`<ul dir="auto" style="color: ${INK}; text-align: left; padding-left: 20px; line-height: 1.9;"><li>Die Bibel als Gottes verlässliches Wort und Grundlage für Leben und Dienst</li><li>Jeder Mensch ist von Gott geschaffen und trägt göttliche Würde</li><li>Heil und Neuanfang durch den Glauben an Jesus Christus</li><li>Nächstenliebe als praktischer, sichtbarer Ausdruck des Glaubens</li><li>Gemeinschaft und Jüngerschaft als Weg des Wachstens</li></ul>`}
				/>
			</El>
		</BlockLayout>
	);
}

export function SectionTeam() {
	return (
		<BlockLayout
			blockId={'ubTeam'}
			htmlId={'team-leitung'}
			blockClassName={'block'}
			className={'block-layout block-layout--layout'}
			style={{
				'--cols': '12',
				'--width': '1224px',
				'--col-gap': '24px',
				'--row-gap': '16px',
				'--grid-template-columns': '6.54% 28.31% 1.96% 28.31% 1.96% 28.31% 6.54%',
				'--grid-template-rows': '96px auto 16px auto 24px auto 32px auto 96px',
				'--small-desktop-grid-template-rows': '72px auto 16px auto 24px auto 32px auto 72px',
				'--t-grid-template-rows': '56px auto 12px auto 20px auto 20px auto 16px auto 16px auto 56px',
				'--m-grid-template-rows': '48px auto 12px auto 16px auto 16px auto 16px auto 16px auto 48px',
				'--m-grid-template-columns': '100%',
				'--block-min-height': 'auto',
				'--small-desktop-block-min-height': 'auto',
				'--t-block-min-height': 'auto',
				'--m-block-min-height': 'auto',
			}}
			background={{ color: '#ffffff', current: 'color', isTransparent: false }}
		>
			<El row={2} col={'2/7'} mRow={2}>
				<TextBox
					id={'ubTeEyebrow'}
					content={`<span class="body-small" dir="auto" style="color: ${GOLD}; letter-spacing: 0.16em; text-transform: uppercase;">Team & Leitung</span>`}
				/>
			</El>
			<El row={4} col={'2/7'} mRow={4}>
				<TextBox
					id={'ubTeTitle'}
					content={`<h2 dir="auto" style="color: ${INK};">Die Menschen hinter dem Ministry</h2>`}
				/>
			</El>
			<El row={6} col={'2/7'} mRow={6}>
				<TextBox
					id={'ubTeIntro'}
					content={`<p dir="auto" style="color: ${INK};">Ein kleines, eingespieltes Team aus haupt- und ehrenamtlichen Mitarbeitenden trägt die Arbeit – vom Camp-Besuch bis zur Begleitung im Philadelphia Bayt.</p>`}
				/>
			</El>
			<El row={8} col={'2/3'} mRow={8}>
				<TextBox
					id={'ubTeR1'}
					content={`<h4 dir="auto" style="color: ${INK}; margin-bottom: 6px;">Leitung</h4><p dir="auto" style="color: ${INK};">Geistliche Leitung, Vision und Gesamtverantwortung für das Ministry. [Name ergänzen]</p>`}
				/>
			</El>
			<El row={8} col={'4/5'} mRow={10}>
				<TextBox
					id={'ubTeR2'}
					content={`<h4 dir="auto" style="color: ${INK}; margin-bottom: 6px;">Begleitung & Soziales</h4><p dir="auto" style="color: ${INK};">Casework, Behördenbegleitung und die Arbeit mit den Bewohnern des Philadelphia Bayt. [Name ergänzen]</p>`}
				/>
			</El>
			<El row={8} col={'6/7'} mRow={12}>
				<TextBox
					id={'ubTeR3'}
					content={`<h4 dir="auto" style="color: ${INK}; margin-bottom: 6px;">Ehrenamt & Koordination</h4><p dir="auto" style="color: ${INK};">Koordination von Freiwilligen, Sprachkursen, Camps und Veranstaltungen. [Name ergänzen]</p>`}
				/>
			</El>
		</BlockLayout>
	);
}
