import React, { useMemo, useState } from 'react';
import pocketbaseClient from '@/lib/pocketbaseClient';

const toPx = (value) => (value != null ? `${value}px` : undefined);

export default function GridForm({
	id,
	formId,
	collectionName,
	fields = [],
	successMessage = 'Thank you',
	formBackgroundColor,
	formBorderWidth,
	formBorderColor,
	formBorderRadius,
	formPadding,
	formFontFamily,
	formFontWeight,
	inputFillColor,
	inputFillColorHover,
	inputTextColor,
	inputTextColorHover,
	labelTextColor,
	inputBorderColor,
	inputBorderColorHover,
	inputBorderWidth,
	inputBorderRadius,
	submitButtonBackgroundColor,
	submitButtonBackgroundColorHover,
	submitButtonFontColor,
	submitButtonFontColorHover,
	submitButtonFontFamily,
	submitButtonFontWeight,
	submitButtonBorderColor,
	submitButtonBorderColorHover,
	submitButtonBorderWidth,
	submitButtonBorderRadius,
	submitLabel = 'Submit',
	submitAlign,
}) {
	const initialValues = useMemo(() => {
		const values = {};
		for (const field of fields) {
			values[field.key] = field.control === 'checkbox' ? [] : '';
		}
		return values;
	}, [fields]);

	const [values, setValues] = useState(initialValues);
	const [status, setStatus] = useState('idle');

	const handleChange = (key, value) => {
		setValues((current) => ({
			...current,
			[key]: value,
		}));
	};

	const handleCheckboxToggle = (key, option) => {
		setValues((current) => {
			const selected = Array.isArray(current[key]) ? current[key] : [];

			return {
				...current,
				[key]: selected.includes(option)
					? selected.filter((value) => value !== option)
					: [...selected, option],
			};
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!collectionName) {
			console.warn(`[GridForm] Missing collection name for formId="${formId}"`);
			setStatus('error');
			return;
		}

		const missingRequiredCheckbox = fields.some(
			(field) => field.control === 'checkbox' && field.required && !(values[field.key] || []).length,
		);
		if (missingRequiredCheckbox) {
			setStatus('error');
			return;
		}

		setStatus('loading');

		try {
			const payload = {};
			for (const field of fields) {
				const value = values[field.key];
				const isEmpty = value == null || value === '' || (Array.isArray(value) && !value.length);

				if (!isEmpty) {
					payload[field.key] = value;
				}
			}

			await pocketbaseClient.collection(collectionName).create(payload);

			setStatus('success');
			setValues(initialValues);
		} catch (error) {
			console.error('[GridForm] submit failed', error);
			setStatus('error');
		}
	};

	const formStyle = {
		'--form-bg': formBackgroundColor,
		'--form-border-width': toPx(formBorderWidth),
		'--form-border-color': formBorderColor,
		'--form-border-radius': toPx(formBorderRadius),
		'--form-padding': toPx(formPadding),
		'--form-font-family': formFontFamily,
		'--form-font-weight': formFontWeight,
		'--input-fill': inputFillColor,
		'--input-fill-hover': inputFillColorHover || inputFillColor,
		'--input-text': inputTextColor,
		'--input-text-hover': inputTextColorHover || inputTextColor,
		'--label-text': labelTextColor,
		'--input-border': inputBorderColor,
		'--input-border-hover': inputBorderColorHover || inputBorderColor,
		'--input-border-width': toPx(inputBorderWidth),
		'--input-radius': toPx(inputBorderRadius),
		'--submit-bg': submitButtonBackgroundColor,
		'--submit-bg-hover': submitButtonBackgroundColorHover || submitButtonBackgroundColor,
		'--submit-color': submitButtonFontColor,
		'--submit-color-hover': submitButtonFontColorHover || submitButtonFontColor,
		'--submit-font-family': submitButtonFontFamily,
		'--submit-font-weight': submitButtonFontWeight,
		'--submit-border': submitButtonBorderColor,
		'--submit-border-hover': submitButtonBorderColorHover || submitButtonBorderColor,
		'--submit-border-width': toPx(submitButtonBorderWidth),
		'--submit-radius': toPx(submitButtonBorderRadius),
		'--submit-align': submitAlign === 'start' ? 'flex-start' : 'stretch',
	};

	if (status === 'success') {
		return (
			<div className="grid-form grid-form--success" data-element-id={id} style={formStyle}>
				<p>{successMessage}</p>
			</div>
		);
	}

	return (
		<form className="grid-form" data-element-id={id} name={formId} onSubmit={handleSubmit} style={formStyle}>
			{fields.map((field) => {
				if (field.control === 'radio' || field.control === 'checkbox') {
					return (
						<fieldset key={field.key} className="grid-form__label grid-form__fieldset">
							<legend className="grid-form__legend">{field.label}</legend>
							{(field.values || []).map((option) => (
								<label key={option} className="grid-form__option">
									<input
										type={field.control}
										name={field.key}
										value={option}
										required={field.control === 'radio' ? field.required : undefined}
										checked={field.control === 'checkbox'
											? (values[field.key] || []).includes(option)
											: values[field.key] === option}
										onChange={() => (field.control === 'checkbox'
											? handleCheckboxToggle(field.key, option)
											: handleChange(field.key, option))}
									/>
									<span>{option}</span>
								</label>
							))}
						</fieldset>
					);
				}

				if (field.control === 'textarea') {
					return (
						<label key={field.key} className="grid-form__label">
							<span>{field.label}</span>
							<textarea
								name={field.key}
								placeholder={field.placeholder || ''}
								required={field.required}
								rows={4}
								value={values[field.key] || ''}
								onChange={(event) => handleChange(field.key, event.target.value)}
								className="grid-form__input"
							/>
						</label>
					);
				}

				return (
					<label key={field.key} className="grid-form__label">
						<span>{field.label}</span>
						<input
							type={field.type === 'email' ? 'email' : 'text'}
							name={field.key}
							placeholder={field.placeholder || ''}
							required={field.required}
							value={values[field.key] || ''}
							onChange={(event) => handleChange(field.key, event.target.value)}
							className="grid-form__input"
						/>
					</label>
				);
			})}
			<button
				type="submit"
				className="grid-form__submit"
				disabled={status === 'loading'}
			>
				{submitLabel}
			</button>
			{status === 'error' ? <p>Something went wrong</p> : null}
		</form>
	);
}
