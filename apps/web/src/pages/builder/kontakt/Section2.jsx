import React from 'react';
import BlockLayout from '@/components/builder/layout/BlockLayout';
import LayoutElement from '@/components/builder/layout/LayoutElement';
import GridForm from '@/components/builder/elements/GridForm';
import GridTextBox from '@/components/builder/elements/GridTextBox';

export default function Section2() {
	return (
		<BlockLayout
			blockId={"ILXY8p"}
			htmlId={"contact-form"}
			blockClassName={"block"}
			className={"block-layout block-layout--layout"}
			style={{
				"--cols": "12",
				"--rows": 9,
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
				"--m-grid-template-rows": "14.44vw auto 3.33vw auto 3.33vw auto 3.33vw auto 64px",
				"--t-grid-template-rows": "minmax(52px, auto) minmax(48px, auto) minmax(12px, auto) minmax(105px, auto) minmax(12px, auto) minmax(160px, auto) minmax(12px, auto) minmax(500px, auto) 1fr",
				"--small-desktop-grid-template-rows": "minmax(5.88vw, auto) minmax(2.29vw, auto) minmax(1.88vw, auto) minmax(3.02vw, auto) minmax(9.80vw, auto) minmax(7.52vw, auto) minmax(5.15vw, auto) minmax(3.43vw, auto) 10.38vw",
				"--grid-template-rows": "minmax(72px, auto) minmax(28px, auto) minmax(23px, auto) minmax(37px, auto) minmax(120px, auto) minmax(92px, auto) minmax(63px, auto) minmax(42px, auto) 1fr",
				"--m-grid-template-columns": "100.00%",
				"--grid-template-columns": "6.54% 35.38% 0.98% 49.92% 7.19%",
				"--m-block-min-height": "auto",
				"--t-block-min-height": "965px",
				"--small-desktop-block-min-height": "auto",
				"--block-min-height": "604px"
			}}
			background={{
				color: "#f7f4ef",
				current: "color",
				isTransparent: false
			}}
		>
			<LayoutElement
				elementId={"bcXvS0"}
				className={"layout-element layout-element--layout"}
				style={{
					"--justify": "center",
					"--z-index": 1,
					"--grid-row": "2/9",
					"--grid-column": "4/5",
					"--m-grid-row": "8/9",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridForm
					id={"bcXvS0"}
					formId={"Contact form"}
					elementId={"bcXvS0"}
					collectionName={"contact_form"}
					fields={[
						{
							key: "name",
							sourceName: "Name",
							label: "Name",
							required: true,
							placeholder: "Ihr Name",
							type: "text",
							control: "text"
						},
						{
							key: "email",
							sourceName: "Email",
							label: "E-Mail",
							required: true,
							placeholder: "Ihre E-Mail-Adresse",
							type: "text",
							control: "text"
						},
						{
							key: "message",
							sourceName: "Message",
							label: "Ihre Nachricht",
							required: true,
							placeholder: "Wie können wir Ihnen helfen?",
							type: "text",
							control: "textarea"
						}
					]}
					successMessage={"Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen."}
					formBorderWidth={0}
					formBorderColor={"#00000000"}
					formBorderRadius={12}
					formPadding={0}
					inputFillColor={"#edeae5"}
					inputFillColorHover={"#e3e0db"}
					inputTextColor={"#231c18"}
					labelTextColor={"#231c18"}
					inputBorderColor={"#ccc8c4"}
					inputBorderWidth={1}
					inputBorderRadius={12}
					submitButtonBackgroundColor={"#d99b43"}
					submitButtonBackgroundColorHover={"#ad7c35"}
					submitButtonFontColor={"#000000"}
					submitButtonFontColorHover={"#000000"}
					submitButtonBorderColor={"#d99b43"}
					submitButtonBorderColorHover={"#ad7c35"}
					submitButtonBorderWidth={0}
					submitButtonBorderRadius={12}
					submitLabel={"Nachricht senden"}
					submitAlign={"start"}
					className={"layout-element__component layout-element__component--GridForm"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"8aVFF-"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 2,
					"--grid-row": "3/4",
					"--grid-column": "2/3",
					"--m-grid-row": "2/3",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"8aVFF-"}
					content={"<span class=\"body-small\" dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Sprechen Sie uns an</span>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"yCGaTV"}
				className={"layout-element layout-element--layout transition transition--slide-right"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 3,
					"--grid-row": "5/6",
					"--grid-column": "2/3",
					"--m-grid-row": "4/5",
					"--m-grid-column": "1/2",
					"--user-animation-delay": "0.1s"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={true}
			>
				<GridTextBox
					id={"yCGaTV"}
					content={"<h2 dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Wir freuen uns auf Ihre Nachricht</h2>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
			<LayoutElement
				elementId={"tF2RwR"}
				className={"layout-element layout-element--layout"}
				style={{
					"--text": "left",
					"--m-text": "center",
					"--z-index": 4,
					"--grid-row": "7/8",
					"--grid-column": "2/3",
					"--m-grid-row": "6/7",
					"--m-grid-column": "1/2"
				}}
				hasRotationFrame={false}
				hasEntranceAnimation={false}
			>
				<GridTextBox
					id={"tF2RwR"}
					content={"<p dir=\"auto\" style=\"color: rgb(35, 28, 24);\">Nutzen Sie unser Kontaktformular für alle Anfragen. Wir melden uns so schnell wie möglich bei Ihnen zurück und bieten Ihnen transparente Unterstützung.</p>"}
					textAlign={"left"}
					textAlignMobile={"center"}
					className={"layout-element__component layout-element__component--GridTextBox"}
				/>
			</LayoutElement>
		</BlockLayout>
	);
}
