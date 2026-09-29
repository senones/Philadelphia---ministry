import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridButton from '@/components/builder/elements/GridButton';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section1() {
	return (
		<BlockLayout
			blockId={"uPYm4o"}
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
				"--m-grid-template-rows": "25.56vw auto 3.33vw auto 3.33vw auto 3.33vw auto 104px",
				"--t-grid-template-rows": "minmax(92px, auto) minmax(48px, auto) minmax(12px, auto) minmax(260px, auto) minmax(12px, auto) minmax(160px, auto) minmax(12px, auto) minmax(48px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(8.50vw, auto) minmax(1.63vw, auto) minmax(3.27vw, auto) minmax(12.58vw, auto) minmax(8.91vw, auto) minmax(2.94vw, auto) minmax(4.25vw, auto) minmax(4.33vw, auto) 8.50vw",
				"--grid-template-rows": "minmax(104px, auto) minmax(20px, auto) minmax(40px, auto) minmax(154px, auto) minmax(109px, auto) minmax(36px, auto) minmax(52px, auto) minmax(53px, auto) 1fr",
				"--m-grid-template-columns": "11.59% 76.83% 11.59%",
				"--grid-template-columns": "13.81% 24.59% 22.55% 24.59% 14.46%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "748px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "672px"
			}}
			background={{
				path: "7bblr1-rJICTRg132JoY3Kv.png",
				origin: "assets",
				current: "image",
				imagePath: "7bblr1-rJICTRg132JoY3Kv.png",
				isTransparent: true,
				"overlay-opacity": "0.50",
				src: "https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/7bblr1-rJICTRg132JoY3Kv.png?width=1440&fit=crop",
				srcset: "https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/7bblr1-rJICTRg132JoY3Kv.png?width=375&fit=crop 375w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/7bblr1-rJICTRg132JoY3Kv.png?width=768&fit=crop 768w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/7bblr1-rJICTRg132JoY3Kv.png?width=1024&fit=crop 1024w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/7bblr1-rJICTRg132JoY3Kv.png?width=1440&fit=crop 1440w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/7bblr1-rJICTRg132JoY3Kv.png?width=1920&fit=crop 1920w, https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/7bblr1-rJICTRg132JoY3Kv.png?width=2560&fit=crop 2560w"
			}}
		>
			<LayoutElement
				elementId={"lpUDRb"}
				className={"layout-element layout-element--layout transition transition--fade hover--lift"}
				style={{
					"--z-index": 1,
					"--grid-row": "8/9",
					"--grid-column": "3/4",
					"--m-grid-row": "8/9",
					"--m-grid-column": "2/3",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridButton
					id={"lpUDRb"}
					text={"Mitmachen & Unterstützen"}
					type={"primary"}
					href={"/mitmachen"}
					target={"_self"}
					borderRadius={8}
					borderWidth={0}
					backgroundColor={"#d99b43"}
					fontColor={"#000000"}
					borderColor={"#d99b43"}
					backgroundColorHover={"#ad7c35"}
					fontColorHover={"#000000"}
					borderColorHover={"#ad7c35"}
					mobileWidthVw={"70vw"}
					mobileHeightVw={"13.333333333333334vw"}
					className={"layout-element__component layout-element__component--GridButton"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"U-MkNs"}
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
					id={"U-MkNs"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(233, 203, 161);\">Praktische Hilfe &amp; Hoffnung</span>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"IU3561"}
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
					id={"IU3561"}
					content={"<h1 dir=\"auto\" style=\"color: rgb(247, 244, 239);\">Gemeinschaft für Geflüchtete, <span style=\"color: rgb(217, 155, 67);\"><strong>Glaube in Aktion</strong></span></h1>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"I_91PN"}
				className={"layout-element layout-element--layout transition transition--slide"}
				style={{
					"--text": "center",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "6/7",
					"--grid-column": "2/5",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/4",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"I_91PN"}
					content={"<p dir=\"auto\" style=\"color: rgb(247, 244, 239);\">Wir bieten ganzheitliche Unterstützung und ein Zuhause für Menschen unterschiedlicher Kulturen, die Schutz und eine neue Perspektive suchen.</p><p dir=\"auto\" style=\"color: rgb(247, 244, 239); margin-top: 18px;\"><a href=\"/unsere-arbeit\" style=\"color: rgb(233, 203, 161); text-decoration: underline; text-underline-offset: 4px;\">Mehr erfahren</a></p>"}
					textAlign={"center"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
