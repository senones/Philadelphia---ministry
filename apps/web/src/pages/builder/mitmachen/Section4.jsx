import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section4() {
	return (
		<BlockLayout
			blockId={"-AHD8J"}
			htmlId={"cta"}
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
				"--t-grid-template-rows": "minmax(92px, auto) minmax(105px, auto) minmax(12px, auto) minmax(132px, auto) minmax(12px, auto) minmax(48px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(8.50vw, auto) minmax(6.54vw, auto) minmax(0.98vw, auto) minmax(6.21vw, auto) minmax(0.98vw, auto) minmax(4.33vw, auto) 8.50vw",
				"--grid-template-rows": "minmax(104px, auto) minmax(80px, auto) minmax(12px, auto) minmax(76px, auto) minmax(12px, auto) minmax(53px, auto) 1fr",
				"--m-grid-template-columns": "25.91% 48.17% 25.91%",
				"--grid-template-columns": "21.08% 21.57% 14.05% 21.57% 21.73%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "505px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "441px"
			}}
			background={{
				color: "#a85032",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"65EpDu"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 1,
					"--grid-row": "6/7",
					"--grid-column": "3/4",
					"--m-grid-row": "6/7",
					"--m-grid-column": "2/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"65EpDu"}
					text={"Jetzt spenden"}
					type={"primary"}
					href={"#"}
					target={"_self"}
					borderRadius={12}
					borderWidth={0}
					backgroundColor={"#231c18"}
					fontColor={"#ffffff"}
					borderColor={"#231c18"}
					backgroundColorHover={"#4f4946"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#4f4946"}
					mobileWidthVw={"43.888888888888886vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"kvqjLE"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 2,
					"--grid-row": "2/3",
					"--grid-column": "2/5",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"kvqjLE"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Gemeinsam Hoffnung schenken</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"cLBkOE"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "4/5",
					"--grid-column": "2/5",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"cLBkOE"}
					content={"<p dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Ihre Unterstützung ermöglicht uns, weiterhin praktische Hilfe und Gemeinschaft für geflüchtete Menschen zu bieten. Jeder Beitrag zählt.</p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
