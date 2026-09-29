import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section5() {
	return (
		<BlockLayout
			blockId={"29T6rb"}
			htmlId={"cta"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 8,
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
				"--t-grid-template-rows": "minmax(92px, auto) minmax(105px, auto) minmax(12px, auto) minmax(160px, auto) minmax(12px, auto) minmax(48px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(8.50vw, auto) minmax(4.90vw, auto) minmax(7.52vw, auto) minmax(2.94vw, auto) minmax(6.54vw, auto) minmax(4.33vw, auto) 8.50vw",
				"--grid-template-rows": "minmax(104px, auto) minmax(60px, auto) minmax(92px, auto) minmax(36px, auto) minmax(80px, auto) minmax(53px, auto) 1fr",
				"--m-grid-template-columns": "11.59% 76.83% 11.59%",
				"--grid-template-columns": "21.08% 17.32% 22.55% 17.32% 21.73%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "533px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "529px"
			}}
			background={{
				color: "#a85032",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"PCEDTA"}
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
					id={"PCEDTA"}
					text={"Mitmachen & Unterstützen"}
					type={"primary"}
					href={"/mitmachen"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"#231c18"}
					fontColor={"#ffffff"}
					borderColor={"#231c18"}
					backgroundColorHover={"#4f4946"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#4f4946"}
					mobileWidthVw={"70vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"jPAD7w"}
				className={"layout-element layout-element--layout transition transition--slide-left"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 2,
					"--grid-row": "2/3",
					"--grid-column": "2/5",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"jPAD7w"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Werden Sie Teil unserer Mission</h2>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"tafnBy"}
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
					id={"tafnBy"}
					content={"<p dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Jede Spende, jedes Gebet und jeder ehrenamtliche Einsatz macht einen Unterschied im Leben geflüchteter Menschen. Helfen Sie uns, Hoffnung zu verbreiten.</p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
