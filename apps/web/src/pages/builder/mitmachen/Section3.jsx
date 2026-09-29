import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridImage from '@/components/builder/elements/GridImage';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section3() {
	return (
		<BlockLayout
			blockId={"zNMklM"}
			htmlId={"volunteer"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 11,
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
				"--t-grid-template-rows": "minmax(52px, auto) minmax(48px, auto) minmax(12px, auto) minmax(105px, auto) minmax(12px, auto) minmax(244px, auto) minmax(12px, auto) minmax(48px, auto) minmax(12px, auto) minmax(437px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(5.88vw, auto) minmax(6.86vw, auto) minmax(3.92vw, auto) minmax(0.98vw, auto) minmax(11.44vw, auto) minmax(0.98vw, auto) minmax(10.78vw, auto) minmax(0.98vw, auto) minmax(4.33vw, auto) minmax(6.86vw, auto) 5.88vw",
				"--grid-template-rows": "minmax(72px, auto) minmax(84px, auto) minmax(48px, auto) minmax(12px, auto) minmax(140px, auto) minmax(12px, auto) minmax(132px, auto) minmax(12px, auto) minmax(53px, auto) minmax(84px, auto) 1fr",
				"--m-grid-template-columns": "25.91% 48.17% 25.91%",
				"--grid-template-columns": "6.54% 14.05% 35.87% 0.98% 35.38% 7.19%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "1046px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "721px"
			}}
			background={{
				color: "#f7f4ef",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"1VzDKn"}
				className={"layout-element layout-element--layout"}
				style={{
					"--z-index": 1,
					"--grid-row": "2/11",
					"--grid-column": "5/6",
					"--m-grid-row": "10/11",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridImage
					id={"1VzDKn"}
					src={"https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/gfsidd-6qwYd1lSuNA6LJMo.png?width=768&fit=crop"}
					srcset={"https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/gfsidd-6qwYd1lSuNA6LJMo.png?width=375&fit=crop 375w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/gfsidd-6qwYd1lSuNA6LJMo.png?width=768&fit=crop 768w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/gfsidd-6qwYd1lSuNA6LJMo.png?width=1024&fit=crop 1024w"}
					alt={""}
					objectFit={"cover"}
					desktopWidth={433}
					desktopHeight={577}
					mobileWidth={328}
					desktopBorderRadius={"8px"}
					mobileBorderRadius={"8px"}
					className={"layout-element__component layout-element__component--GridImage"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"gjKMuM"}
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
					id={"gjKMuM"}
					text={"Mehr erfahren"}
					type={"primary"}
					href={"/kontakt"}
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
				elementId={"qc2O9I"}
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
					id={"qc2O9I"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Ihre Zeit zählt</span>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"SocJxW"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "5/6",
					"--grid-column": "2/4",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/4"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"SocJxW"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Möglichkeiten für Freiwillige</h2>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"hExnbc"}
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
					id={"hExnbc"}
					content={"<p dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Als Freiwilliger können Sie direkt das Leben von Geflüchteten bereichern. Wir suchen engagierte Menschen für Sprachunterricht, Freizeitaktivitäten, handwerkliche Unterstützung und vieles mehr. Ihre Gaben finden bei uns einen sinnvollen Einsatz.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
