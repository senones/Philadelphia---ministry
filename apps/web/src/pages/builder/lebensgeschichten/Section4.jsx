import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section4() {
	return (
		<BlockLayout
			blockId={"9jyrIp"}
			htmlId={"cta"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 4,
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
				"--m-grid-template-rows": "10.00vw auto 1.67vw auto 3.33vw auto 48px",
				"--t-grid-template-rows": "minmax(36px, auto) minmax(93px, auto) minmax(6px, auto) minmax(79px, auto) minmax(12px, auto) minmax(48px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(3.92vw, auto) minmax(3.10vw, auto) minmax(2.21vw, auto) minmax(0.49vw, auto) minmax(1.63vw, auto) minmax(3.19vw, auto) 5.07vw",
				"--grid-template-rows": "minmax(48px, auto) minmax(38px, auto) minmax(27px, auto) minmax(6px, auto) minmax(20px, auto) minmax(39px, auto) 1fr",
				"--m-grid-template-columns": "23.17% 53.66% 23.17%",
				"--grid-template-columns": "6.54% 57.19% 13.56% 15.52% 7.19%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "322px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "240px"
			}}
			background={{
				color: "#f7f4ef",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"i8X2jv"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 1,
					"--grid-row": "3/6",
					"--grid-column": "4/5",
					"--m-grid-row": "6/7",
					"--m-grid-column": "2/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"i8X2jv"}
					text={"Jetzt mitmachen"}
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
					mobileWidthVw={"48.888888888888886vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"nZkS9X"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 2,
					"--grid-row": "2/4",
					"--grid-column": "2/3",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"nZkS9X"}
					content={"<h3 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Jede Geschichte verdient eine Zukunft.</h3>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"ZE2tVe"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "5/7",
					"--grid-column": "2/3",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"ZE2tVe"}
					content={"<p class=\"body-small\" dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Ihre Unterstützung macht Hoffnung und Transformation möglich. Helfen Sie uns, weitere Lebenswege zu gestalten.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
