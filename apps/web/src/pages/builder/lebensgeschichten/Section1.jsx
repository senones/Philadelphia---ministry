import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section1() {
	return (
		<BlockLayout
			blockId={"SlXmsY"}
			htmlId={"hero"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
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
				"--m-grid-template-rows": "22.22vw auto 3.33vw auto 3.33vw auto 3.33vw auto 3.33vw auto 92px",
				"--t-grid-template-rows": "minmax(80px, auto) minmax(48px, auto) minmax(12px, auto) minmax(116px, auto) minmax(12px, auto) minmax(132px, auto) minmax(12px, auto) minmax(48px, auto) minmax(12px, auto) minmax(48px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(8.50vw, auto) minmax(3.92vw, auto) minmax(0.98vw, auto) minmax(7.92vw, auto) minmax(0.98vw, auto) minmax(3.92vw, auto) minmax(0.98vw, auto) minmax(4.33vw, auto) 8.50vw",
				"--grid-template-rows": "minmax(104px, auto) minmax(48px, auto) minmax(12px, auto) minmax(97px, auto) minmax(12px, auto) minmax(48px, auto) minmax(12px, auto) minmax(53px, auto) 1fr",
				"--m-grid-template-columns": "23.17% 2.74% 48.17% 2.74% 23.17%",
				"--grid-template-columns": "6.54% 14.05% 0.98% 15.52% 55.72% 7.19%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "612px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "490px"
			}}
			background={{
				color: "#f7f4ef",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"piShDB"}
				className={"layout-element layout-element--layout transition transition--fade hover--lift"}
				style={{
					"--z-index": 1,
					"--grid-row": "8/9",
					"--grid-column": "2/3",
					"--m-grid-row": "8/9",
					"--m-grid-column": "3/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"piShDB"}
					text={"Mehr erfahren"}
					type={"primary"}
					href={"/ueber-uns"}
					target={"_self"}
					borderRadius={8}
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
				elementId={"o1odqe"}
				className={"layout-element layout-element--layout transition transition--fade hover--lift"}
				style={{
					"--z-index": 2,
					"--grid-row": "8/9",
					"--grid-column": "4/5",
					"--m-grid-row": "10/11",
					"--m-grid-column": "2/5",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"o1odqe"}
					text={"Hoffnung teilen"}
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
				elementId={"_iRihY"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "2/3",
					"--grid-column": "2/6",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/6",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"_iRihY"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Echte Einblicke</span>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"Kx4jAr"}
				className={"layout-element layout-element--layout transition transition--rise"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "4/5",
					"--grid-column": "2/6",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/6",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"Kx4jAr"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Geschichten der <strong>Hoffnung</strong></h1>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"I-CdEF"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 5,
					"--grid-row": "6/7",
					"--grid-column": "2/6",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/6",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"I-CdEF"}
					content={"<p dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Erfahren Sie, wie Menschen bei Philadelphia International Ministry einen Neuanfang finden und ihr Leben transformieren.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
