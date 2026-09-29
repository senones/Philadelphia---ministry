/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		const definitions = [
			{
				"name": "contact_form",
				"fields": [
					{
						"name": "name",
						"type": "text"
					},
					{
						"name": "email",
						"type": "text"
					},
					{
						"name": "message",
						"type": "text"
					}
				]
			}
		];

		for (const definition of definitions) {
			let exists = true;

			try {
				app.findCollectionByNameOrId(definition.name);
			} catch (_) {
				exists = false;
			}

			if (exists) {
				continue;
			}

			const collection = new Collection({
				type: "base",
				name: definition.name,
				listRule: null,
				viewRule: null,
				createRule: "",
				updateRule: null,
				deleteRule: null,
				fields: [
					...definition.fields,
					{ name: "submitted_at", type: "date" },
					{ name: "created", type: "autodate", onCreate: true, onUpdate: false },
					{ name: "updated", type: "autodate", onCreate: true, onUpdate: true },
				],
			});

			app.save(collection);
		}

		const labels = definitions.map((definition) => `${definition.name}:create`);
		const settings = app.settings();
		const rules = [];
		const existingRules = settings.rateLimits.rules || [];

		for (let index = 0; index < existingRules.length; index += 1) {
			const rule = existingRules[index];

			if (labels.indexOf(rule.label) === -1) {
				rules.push({
					label: rule.label,
					audience: rule.audience,
					duration: rule.duration,
					maxRequests: rule.maxRequests,
				});
			}
		}

		for (const label of labels) {
			rules.push({
				label,
				audience: "",
				duration: 10 * 60,
				maxRequests: 10,
			});
		}

		settings.rateLimits = {
			enabled: true,
			rules,
		};

		app.save(settings);
	},
	(app) => {
		const names = ["contact_form"];
		const labels = names.map((name) => `${name}:create`);
		const settings = app.settings();
		const rules = [];
		const existingRules = settings.rateLimits.rules || [];

		for (let index = 0; index < existingRules.length; index += 1) {
			const rule = existingRules[index];

			if (labels.indexOf(rule.label) === -1) {
				rules.push({
					label: rule.label,
					audience: rule.audience,
					duration: rule.duration,
					maxRequests: rule.maxRequests,
				});
			}
		}

		settings.rateLimits = {
			enabled: settings.rateLimits.enabled,
			rules,
		};

		app.save(settings);

		for (const name of names) {
			try {
				app.delete(app.findCollectionByNameOrId(name));
			} catch (_) {
				continue;
			}
		}
	},
);
