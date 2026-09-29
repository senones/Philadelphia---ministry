/// <reference path="../pb_data/types.d.ts" />

onRecordCreateRequest((e) => {
	e.next();

	const formName = "Contact form";
	const destinationEmail = "senon_uzeiroski@hotmail.com";
	const emailFieldKey = null;
	const fields = [
		{
			"key": "name",
			"name": "Name"
		},
		{
			"key": "email",
			"name": "Email"
		},
		{
			"key": "message",
			"name": "Message"
		}
	];
	const texts = {
		"subject": "You have a new message on your website",
		"title": "Congrats! You have a new message",
		"subtitle": null,
		"previewText": "Take a look now",
		"websiteLabel": "Website:",
		"formNameLabel": "Form name:",
		"detailsLabel": "Details:",
		"buttonText": "View Forms",
		"buttonReply": "Reply"
	};
	const buttonLink = "https://horizons.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d?openDrawer=data";

	const escapeHtml = (value) => String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

	const fontFamily = "verdana, geneva, sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
	const siteUrl = $app.settings().meta.appName;

	const formDetails = fields
		.map((field) => {
			const value = e.record.get(field.key);
			const text = Array.isArray(value) ? value.join(", ") : (value == null ? "" : String(value));

			return `<strong>${escapeHtml(field.name)}</strong>: ${escapeHtml(text)}\n<br>`;
		})
		.join("");

	const emailFromSubmission = emailFieldKey ? String(e.record.get(emailFieldKey) || "") : "";

	const subtitleRows = texts.subtitle
		? `
																	<tr>
																		<td height="10" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
																	</tr>
																	<tr>
																		<td align="left" valign="top" style="font-family: ${fontFamily}; font-size: 14px; font-weight: normal; font-style: normal; letter-spacing: normal; color: #000000;">
																			${escapeHtml(texts.subtitle)}
																		</td>
																	</tr>`
		: "";

	const replyButton = emailFromSubmission
		? `
																								<td style="padding-left: 16px;"></td>
																								<td align="center" style="background-color: #ffffff; border-radius: 50px; mso-padding-alt: 15px 25px 15px 25px; mso-border-alt: 1px solid #dadce0; box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box;" class="w100pc">
																									<a href="mailto:${escapeHtml(emailFromSubmission)}" target="_blank" style="padding: 15px 25px 15px 25px; border: solid 1px #dadce0; mso-padding-alt: 15px 25px 15px 25px; mso-border-alt: none; border-radius: 50px; font-family: ${fontFamily}; font-size: 14px; line-height: 17px; font-weight: bold; font-style: normal; letter-spacing: normal; display: block; text-decoration: none; color: #673DE6;" class="txt_12">
																										<span style="text-decoration: none; color: #673DE6;" class="cta">${escapeHtml(texts.buttonReply)}</span>
																									</a>
																								</td>`
		: "";

	const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>${escapeHtml(texts.title)}</title>
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<style type="text/css">
		* { margin-top: 0px; margin-bottom: 0px; padding: 0px; border: none; outline: none; -webkit-text-size-adjust: none; }
		body { margin: 0 !important; padding: 0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; background-color: #F5F8FB; }
		img { border: 0 !important; display: block !important; outline: none !important; }
		table { border-collapse: collapse; mso-table-lspace: 0px; mso-table-rspace: 0px; }
		td { border-collapse: collapse; mso-line-height-rule: exactly; }
		a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
		.richTextLinks a { color: #673DE6; text-decoration: underline; }
		@media only screen and (max-width: 640px) {
			.w100pc_e { width: 100% !important; }
			.mobile_cta { width: 80% !important; max-width: 80% !important; }
			.blockSides { width: 20px !important; }
			.txt_12 { font-size: 12px !important; line-height: 16px !important; }
			.txt_24 { font-size: 24px !important; line-height: 28px !important; }
		}
	</style>
</head>

<body marginwidth="0" marginheight="0" style="margin: 0; padding: 0; width: 100% !important; background-color: #F5F8FB;" offset="0" topmargin="0" leftmargin="0">

	<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F8FB;">
		<tr>
			<td align="center" valign="top" style="font-family:sans-serif;color:#F5F8FB;font-size:1px;line-height:1px;display:none;">${escapeHtml(texts.previewText)}</td>
		</tr>
	</table>

	<!-- Content Header -->
	<table width="100%" bgcolor="#F5F8FB">
		<tr>
			<td style="background-color: #F5F8FB;">
				<table bgcolor="#F5F8FB" align="center" width="600" style="width: 600px; text-align: left;">
					<tr>
						<td height="44" style="height: 44px; color: #949799; font-family: ${fontFamily}; font-size: 14px; background-color: #F5F8FB;"></td>
					</tr>
				</table>
			</td>
		</tr>
	</table>

	<!-- Main Content Block: Headline-Body-Button -->
	<table width="100%" cellpadding="0" cellspacing="0" align="center" style="background-color: #F5F8FB;">
		<tr>
			<td align="center" valign="top">
				<table width="640" cellpadding="0" cellspacing="0" style="width: 640px;" class="w100pc_e">
					<tr>
						<td align="center" valign="top">
							<table width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td width="20" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
									<td align="center" valign="top">
										<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
											<tr>
												<td height="40" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
											</tr>
											<tr>
												<td align="center" valign="top">
													<table width="100%" cellpadding="0" cellspacing="0">
														<tr>
															<td width="40" class="blockSides">&nbsp;</td>
															<td align="center" valign="top">
																<table width="100%" cellpadding="0" cellspacing="0">

																	<!-- Headline -->
																	<tr>
																		<td align="left" valign="top" style="font-family: ${fontFamily}; font-size: 28px; line-height: 30px; font-weight: bold; font-style: normal; letter-spacing: normal; color: #000000;" class="txt_24">
																			<span class="hed">${escapeHtml(texts.title)}</span>
																		</td>
																	</tr>${subtitleRows}
																	<tr>
																		<td height="24" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
																	</tr>

																	<!-- Body Text -->
																	<tr>
																		<td align="left" valign="top" style="font-family: ${fontFamily}; font-size: 14px; line-height: 20px; font-weight: 400; font-style: normal; letter-spacing: normal; color: #000000;" class="richTextLinks txt_12">
																			<b>${escapeHtml(texts.websiteLabel)}</b> ${escapeHtml(siteUrl)}<br>
																			<b>${escapeHtml(texts.formNameLabel)}</b> ${escapeHtml(formName)}<br>
																			<b>${escapeHtml(texts.detailsLabel)}</b><br>
																			${formDetails}
																		</td>
																	</tr>
																	<tr>
																		<td height="25" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
																	</tr>

																	<!-- Buttons -->
																	<tr>
																		<td align="center" valign="top">
																			<table width="100%" cellpadding="0" cellspacing="0">
																				<tr>
																					<td align="left" valign="top">
																						<table cellspacing="0" cellpadding="0" border="0" class="mobile_cta">
																							<tr>
																								<td align="center" style="background-color: #673DE6; border-radius: 50px; mso-padding-alt: 15px 25px 15px 25px; mso-border-alt: 1px solid #673DE6; box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box;" class="w100pc">
																									<a href="${buttonLink}" target="_blank" style="padding: 15px 25px 15px 25px; border: solid 1px #673DE6; mso-padding-alt: 15px 25px 15px 25px; mso-border-alt: none; border-radius: 50px; font-family: ${fontFamily}; font-size: 14px; line-height: 17px; font-weight: bold; font-style: normal; letter-spacing: normal; display: block; text-decoration: none; color: #ffffff;" class="txt_12">
																										<span style="text-decoration: none; color: #ffffff;" class="cta">${escapeHtml(texts.buttonText)}</span>
																									</a>
																								</td>${replyButton}
																							</tr>
																						</table>
																					</td>
																				</tr>
																			</table>
																		</td>
																	</tr>

																</table>
															</td>
															<td width="40" class="blockSides">&nbsp;</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td height="20" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
											</tr>
										</table>
									</td>
									<td width="20" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>

	<!-- Bottom Spacer -->
	<table width="100%" bgcolor="#F5F8FB">
		<tr>
			<td height="50" style="background-color: #F5F8FB"></td>
		</tr>
	</table>

</body>
</html>`;

	try {
		const message = new MailerMessage({
			to: [{ address: destinationEmail }],
			subject: texts.subject,
			html,
		});

		$app.newMailClient().send(message);
	} catch (err) {
		$app.logger().error("builder form submission email failed", "form", formName, "err", String(err));
	}
}, "contact_form");
