import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridImage from '@/components/builder/elements/GridImage';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section2() {
	return (
		<BlockLayout
			blockId={"HDnpXE"}
			htmlId={"featured-story"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 12,
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
				"--m-grid-template-rows": "14.44vw auto 3.33vw auto 3.33vw auto 3.33vw auto 3.33vw auto 64px",
				"--t-grid-template-rows": "minmax(52px, auto) minmax(48px, auto) minmax(12px, auto) minmax(105px, auto) minmax(12px, auto) minmax(272px, auto) minmax(12px, auto) minmax(48px, auto) minmax(12px, auto) minmax(437px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(5.88vw, auto) minmax(5.47vw, auto) minmax(3.92vw, auto) minmax(0.98vw, auto) minmax(11.44vw, auto) minmax(0.98vw, auto) minmax(15.36vw, auto) minmax(0.98vw, auto) minmax(4.33vw, auto) minmax(5.56vw, auto) 5.88vw",
				"--grid-template-rows": "minmax(72px, auto) minmax(67px, auto) minmax(48px, auto) minmax(12px, auto) minmax(140px, auto) minmax(12px, auto) minmax(188px, auto) minmax(12px, auto) minmax(53px, auto) minmax(68px, auto) 1fr",
				"--m-grid-template-columns": "12.80% 74.39% 12.80%",
				"--grid-template-columns": "6.54% 21.73% 19.77% 1.96% 50.00%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "1074px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "744px"
			}}
			background={{
				color: "#f7f4ef",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"6LoSkW"}
				className={"layout-element layout-element--layout transition transition--scale transition--root-hidden"}
				style={{
					"--z-index": 1,
					"--grid-row": "2/11",
					"--grid-column": "5/6",
					"--m-grid-row": "10/11",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridImage
					id={"6LoSkW"}
					src={"https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/vtkzbt-yrRWo1UytsCNGBWL.png?width=768&fit=crop"}
					srcset={"https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/vtkzbt-yrRWo1UytsCNGBWL.png?width=375&fit=crop 375w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/vtkzbt-yrRWo1UytsCNGBWL.png?width=768&fit=crop 768w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/vtkzbt-yrRWo1UytsCNGBWL.png?width=1024&fit=crop 1024w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/vtkzbt-yrRWo1UytsCNGBWL.png?width=1440&fit=crop 1440w"}
					alt={""}
					objectFit={"cover"}
					desktopWidth={612}
					desktopHeight={600}
					mobileWidth={328}
					desktopBorderRadius={"8px"}
					mobileBorderRadius={"8px"}
					className={"layout-element__component layout-element__component--GridImage"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"0Ny1i2"}
				className={"layout-element layout-element--layout hover--lift"}
				style={{
					"--z-index": 2,
					"--grid-row": "9/10",
					"--grid-column": "2/3",
					"--m-grid-row": "8/9",
					"--m-grid-column": "2/3"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridButton
					id={"0Ny1i2"}
					text={"Maluks ganze Geschichte"}
					type={"primary"}
					href={"#"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"#231c18"}
					fontColor={"#ffffff"}
					borderColor={"#231c18"}
					backgroundColorHover={"#4f4946"}
					fontColorHover={"#ffffff"}
					borderColorHover={"#4f4946"}
					mobileWidthVw={"67.77777777777777vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"DOdMEQ"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "3/4",
					"--grid-column": "2/4",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"DOdMEQ"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Ein Neuanfang</span>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"5Yzs7S"}
				className={"layout-element layout-element--layout transition transition--slide-right"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "5/6",
					"--grid-column": "2/4",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"5Yzs7S"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Maluks Weg zur Gemeinschaft</h2>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"elJ8QW"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 5,
					"--grid-row": "7/8",
					"--grid-column": "2/4",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"elJ8QW"}
					content={"<p dir=\"auto\" style=\"color: rgb(35, 28, 24);\">[Platzhalter: Maluks Geschichte wird nach Erhalt des Originaltextes und seiner ausdrücklichen Freigabe ergänzt.]</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
