import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridImage from '@/components/builder/elements/GridImage';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section1() {
	return (
		<BlockLayout
			blockId={"tpX8np"}
			htmlId={"hero"}
			blockClassName={"block block--desktop-first-visible block--mobile-first-visible"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 13,
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
				"--t-grid-template-rows": "minmax(80px, auto) minmax(437px, auto) minmax(12px, auto) minmax(48px, auto) minmax(12px, auto) minmax(212px, auto) minmax(12px, auto) minmax(160px, auto) minmax(12px, auto) minmax(48px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(8.50vw, auto) minmax(1.23vw, auto) minmax(3.92vw, auto) minmax(0.98vw, auto) minmax(26.80vw, auto) minmax(0.98vw, auto) minmax(8.50vw, auto) minmax(0.98vw, auto) minmax(4.33vw, auto) minmax(1.31vw, auto) 8.50vw",
				"--grid-template-rows": "minmax(104px, auto) minmax(15px, auto) minmax(48px, auto) minmax(12px, auto) minmax(328px, auto) minmax(12px, auto) minmax(104px, auto) minmax(12px, auto) minmax(53px, auto) minmax(16px, auto) 1fr",
				"--m-grid-template-columns": "25.91% 48.17% 25.91%",
				"--grid-template-columns": "50.00% 1.96% 14.05% 27.45% 6.54%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "1125px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "808px"
			}}
			background={{
				color: "#f7f4ef",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"nxDGAt"}
				className={"layout-element layout-element--layout transition transition--blur transition--root-hidden"}
				style={{
					"--z-index": 1,
					"--grid-row": "2/11",
					"--grid-column": "1/2",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridImage
					id={"nxDGAt"}
					src={"https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/n8nv24-t609uHo9h0kC6da6.png?width=768&fit=crop"}
					srcset={"https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/n8nv24-t609uHo9h0kC6da6.png?width=375&fit=crop 375w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/n8nv24-t609uHo9h0kC6da6.png?width=768&fit=crop 768w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/n8nv24-t609uHo9h0kC6da6.png?width=1024&fit=crop 1024w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/n8nv24-t609uHo9h0kC6da6.png?width=1440&fit=crop 1440w"}
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
				elementId={"U7ay-T"}
				className={"layout-element layout-element--layout transition transition--fade hover--lift"}
				style={{
					"--z-index": 2,
					"--grid-row": "9/10",
					"--grid-column": "3/4",
					"--m-grid-row": "10/11",
					"--m-grid-column": "2/3",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"U7ay-T"}
					text={"Mehr erfahren"}
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
					mobileWidthVw={"43.888888888888886vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"V2S7Ww"}
				className={"layout-element layout-element--layout transition transition--fade"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "3/4",
					"--grid-column": "3/5",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"V2S7Ww"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Ein Zuhause der Hoffnung</span>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"1kf9op"}
				className={"layout-element layout-element--layout transition transition--rise"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "5/6",
					"--grid-column": "3/5",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"1kf9op"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Philadelphia Bayt: <strong>Geborgenheit</strong> und Neuanfang</h1>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"Mk0Ybj"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 5,
					"--grid-row": "7/8",
					"--grid-column": "3/5",
					"--m-grid-row": "8/9",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"Mk0Ybj"}
					content={"<p dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Im Philadelphia Bayt bieten wir geflüchteten Menschen ein sicheres und familiäres Umfeld für ganzheitliche Unterstützung und Gemeinschaft.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
