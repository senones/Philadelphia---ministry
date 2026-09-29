import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridShape from '@/components/builder/elements/GridShape';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Footer() {
	return (
		<BlockLayout
			blockId={"footer"}
			htmlId={"footer"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 3,
				"--width": "1224px",
				"--m-rows": "1",
				"--col-gap": "24px",
				"--row-gap": "16px",
				"--row-size": "48px",
				"--column-gap": "24px",
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "40px 16px",
				"--m-grid-template-rows": "8.89vw auto 3.61vw auto 2.22vw auto 4.44vw auto 4.44vw auto 4.17vw auto 2.22vw auto 32px",
				"--t-grid-template-rows": "minmax(32px, auto) minmax(3px, auto) minmax(13px, auto) minmax(222px, auto) minmax(8px, auto) minmax(59px, auto) minmax(16px, auto) minmax(134px, auto) minmax(16px, auto) minmax(1px, auto) minmax(15px, auto) minmax(79px, auto) minmax(8px, auto) minmax(39px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(3.92vw, auto) minmax(0.25vw, auto) minmax(1.39vw, auto) minmax(0.33vw, auto) minmax(3.19vw, auto) minmax(1.31vw, auto) minmax(7.60vw, auto) minmax(2.70vw, auto) minmax(2.61vw, auto) minmax(0.08vw, auto) minmax(1.23vw, auto) minmax(1.63vw, auto) minmax(1.55vw, auto) 3.59vw",
				"--grid-template-rows": "minmax(48px, auto) minmax(3px, auto) minmax(17px, auto) minmax(4px, auto) minmax(39px, auto) minmax(16px, auto) minmax(93px, auto) minmax(33px, auto) minmax(32px, auto) minmax(1px, auto) minmax(15px, auto) minmax(20px, auto) minmax(19px, auto) 1fr",
				"--m-grid-template-columns": "100.00%",
				"--grid-template-columns": "6.54% 3.92% 32.03% 1.96% 1.31% 45.75% 8.50%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "677px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "384px"
			}}
			background={{
				color: "#e6e2dd",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"HAyR6u"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--z-index": 1,
					"--grid-row": "2/3",
					"--grid-column": "2/3",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"HAyR6u"}
					svg={"<svg preserveAspectRatio=\"none\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\"><path d=\"M0 0H80V80H0V0Z\"></path></svg>"}
					color={"#d99b43"}
					shape={"rectangle"}
					height={3}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"xvXiYT"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--z-index": 2,
					"--grid-row": "10/11",
					"--grid-column": "2/7",
					"--m-grid-row": "10/11",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridShape
					id={"xvXiYT"}
					svg={"<svg preserveAspectRatio=\"none\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\"><path d=\"M0 0H80V80H0V0Z\"></path></svg>"}
					color={"#231c18"}
					shape={"rectangle"}
					height={1}
					className={"layout-element__component layout-element__component--GridShape"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"jJZ3MZ"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "4/8",
					"--grid-column": "2/4",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"jJZ3MZ"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(35, 28, 24); margin-bottom: 8px;\">Philadelphia International Ministry</h3><p dir=\"auto\" class=\"body\" style=\"color: rgb(35, 28, 24); opacity: 0.85;\">Praktische Hilfe, Hoffnung und Gemeinschaft für geflüchtete Menschen.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"Mip9Xy"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "right",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "5/6",
					"--grid-column": "6/7",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"Mip9Xy"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(35, 28, 24); letter-spacing: 0.12em; text-transform: uppercase; text-align: right;\">Startseite<span style=\"color: rgb(35, 28, 24); opacity: 0.45; margin: 0 14px;\">-</span>Über uns<span style=\"color: rgb(35, 28, 24); opacity: 0.45; margin: 0 14px;\">-</span>Unsere Arbeit<span style=\"color: rgb(35, 28, 24); opacity: 0.45; margin: 0 14px;\">-</span>Philadelphia Bayt<span style=\"color: rgb(35, 28, 24); opacity: 0.45; margin: 0 14px;\">-</span>Lebensgeschichten<span style=\"color: rgb(35, 28, 24); opacity: 0.45; margin: 0 14px;\">-</span>Aktuelles<span style=\"color: rgb(35, 28, 24); opacity: 0.45; margin: 0 14px;\">-</span>Mitmachen / Unterstützen<span style=\"color: rgb(35, 28, 24); opacity: 0.45; margin: 0 14px;\">-</span>Kontakt & Anfahrt<span style=\"color: rgb(35, 28, 24); opacity: 0.45; margin: 0 14px;\">-</span>Rechtliches</p>"}
					textAlign={"right"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"7XLiYz"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "right",
					"--m-text": "center",
					"--z-index": 5,
					"--grid-row": "7/9",
					"--grid-column": "6/7",
					"--m-grid-row": "8/9",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"7XLiYz"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(217, 155, 67); letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 10px; text-align: right;\">Kontakt</p><p dir=\"auto\" class=\"body\" style=\"color: rgb(35, 28, 24); opacity: 0.85; text-align: right; margin-bottom: 4px;\">[Kontakt-E-Mail ergänzen]</p><p dir=\"auto\" class=\"body\" style=\"color: rgb(35, 28, 24); opacity: 0.85; text-align: right; margin-bottom: 4px;\">[Adresse ergänzen]</p><p dir=\"auto\" class=\"body\" style=\"color: rgb(35, 28, 24); opacity: 0.85; text-align: right; margin-bottom: 4px;\">Philadelphia Bayt &amp; Camp-Dienste</p>"}
					textAlign={"right"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"llvTct"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 6,
					"--grid-row": "12/14",
					"--grid-column": "2/5",
					"--m-grid-row": "12/13",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"llvTct"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(35, 28, 24); opacity: 0.7; text-align: left;\">© 2026 Philadelphia International Ministry<span style=\"color: rgb(217, 155, 67); opacity: 0.85; margin: 0 10px;\">-</span><a href=\"/impressum\" style=\"color: inherit; text-decoration: underline;\">Impressum</a><span style=\"margin: 0 8px;\">·</span><a href=\"/datenschutz\" style=\"color: inherit; text-decoration: underline;\">Datenschutz</a></p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"y1b86E"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "right",
					"--m-text": "center",
					"--z-index": 7,
					"--grid-row": "12/13",
					"--grid-column": "6/7",
					"--m-grid-row": "14/15",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"y1b86E"}
					content={"<p dir=\"auto\" class=\"body-small\" style=\"color: rgb(217, 155, 67); letter-spacing: 0.16em; text-transform: uppercase; text-align: right;\">Würde - Hoffnung - Gemeinschaft</p>"}
					textAlign={"right"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
