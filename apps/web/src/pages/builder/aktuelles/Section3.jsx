import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section3() {
	return (
		<BlockLayout
			blockId={"yXVzJi"}
			htmlId={"prayer"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 7,
				"--width": "1224px",
				"--m-rows": "1",
				"--col-gap": "24px",
				"--row-gap": "16px",
				"--row-size": "48px",
				"--block-padding-top": "16px",
				"--block-padding": "16px 0 16px 0",
				"--block-padding-right": "0",
				"--block-padding-bottom": "16px",
				"--block-padding-left": "0",
				"--m-block-padding": "16px",
				"--m-grid-template-rows": "25.56vw auto 3.33vw auto 3.33vw auto 104px",
				"--t-grid-template-rows": "minmax(92px, auto) minmax(48px, auto) minmax(12px, auto) minmax(105px, auto) minmax(12px, auto) minmax(98px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(8.50vw, auto) minmax(3.92vw, auto) minmax(0.98vw, auto) minmax(6.54vw, auto) minmax(0.98vw, auto) minmax(4.82vw, auto) 8.50vw",
				"--grid-template-rows": "minmax(104px, auto) minmax(48px, auto) minmax(12px, auto) minmax(80px, auto) minmax(12px, auto) minmax(59px, auto) 1fr",
				"--m-grid-template-columns": "100.00%",
				"--grid-template-columns": "21.08% 57.19% 21.73%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "471px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "419px"
			}}
			background={{
				color: "#a85032",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"9fywFP"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 1,
					"--grid-row": "2/3",
					"--grid-column": "2/3",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"9fywFP"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Gemeinsam im Glauben</span>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"XHSXaw"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 2,
					"--grid-row": "4/5",
					"--grid-column": "2/3",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"XHSXaw"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Aktuelle Gebetsanliegen</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"feA0Bh"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "6/7",
					"--grid-column": "2/3",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"feA0Bh"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Ihre Fürbitte ist ein wichtiger Pfeiler unserer Arbeit. Beten Sie mit uns für Schutz, Kraft und Wegweisung für die Familien, Mitarbeiter und Projekte.</p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
