import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section1() {
	return (
		<BlockLayout
			blockId={"gqcJIO"}
			htmlId={"hero"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 10,
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
				"--m-grid-template-rows": "25.56vw auto 3.33vw auto 3.33vw 63.33vw auto auto 104px",
				"--t-grid-template-rows": "minmax(92px, auto) minmax(48px, auto) minmax(12px, auto) minmax(164px, auto) minmax(12px, auto) minmax(228px, auto) minmax(24px, auto) minmax(24px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(8.50vw, auto) minmax(3.92vw, auto) minmax(0.98vw, auto) minmax(14.22vw, auto) minmax(0.98vw, auto) minmax(8.50vw, auto) minmax(0.98vw, auto) minmax(4.33vw, auto) 8.50vw",
				"--grid-template-rows": "minmax(104px, auto) minmax(48px, auto) minmax(12px, auto) minmax(174px, auto) minmax(12px, auto) minmax(104px, auto) minmax(12px, auto) minmax(53px, auto) 1fr",
				"--m-grid-template-columns": "16.77% 66.46% 16.77%",
				"--grid-template-columns": "13.81% 26.14% 19.44% 26.14% 14.46%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "708px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "623px"
			}}
			background={{
				color: "#f7f4ef",
				current: "gradient",
				gradient: {
					angle: 180,
					colors: [
						{
							value: "#f7f4ef"
						},
						{
							value: "#d3aa99"
						}
					],
					isAnimated: false
				},
				"gradient-type": "linear",
				isTransparent: false,
				"gradient-value": "linear-gradient(180deg, #f7f4ef, #d3aa99)"
			}}
		>
			<LayoutElement
				elementId={"F9yKyt"}
				className={"layout-element layout-element--layout transition transition--fade hover--lift"}
				style={{
					"--z-index": 1,
					"--grid-row": "8/9",
					"--grid-column": "3/4",
					"--m-grid-row": "7/9",
					"--m-grid-column": "2/3",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"F9yKyt"}
					text={"Freiwillig mithelfen"}
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
					mobileWidthVw={"60.55555555555556vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"8iW4-A"}
				className={"layout-element layout-element--layout transition transition--fade"}
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
					id={"8iW4-A"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Unsere Mission in Aktion</span>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"njl_o3"}
				className={"layout-element layout-element--layout transition transition--rise"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "4/5",
					"--grid-column": "2/5",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"njl_o3"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Ganzheitliche Hilfe und <strong>Hoffnung</strong></h1>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"K-R27l"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "6/7",
					"--grid-column": "2/5",
					"--m-grid-row": "6/8",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"K-R27l"}
					content={"<p dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Wir bieten praktische Unterstützung, Bildung und geistlichen Beistand, um geflüchteten Menschen in Philadelphia Bayt und darüber hinaus ein neues Zuhause und eine Zukunft zu schenken. Gemeinsam bauen wir Brücken der Nächstenliebe.</p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
