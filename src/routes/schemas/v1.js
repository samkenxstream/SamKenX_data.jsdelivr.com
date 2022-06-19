const Joi = require('joi');
const { continents, countries } = require('countries-list');
const dateRange = require('../utils/dateRange');

const primitives = {
	byOptional:
		Joi.valid('hits', 'bandwidth').default('hits'),

	continent:
		Joi.valid(...Object.keys(continents)).messages({
			'*': '{{#label}} must be a valid continent code in uppercase',
		}),

	country:
		Joi.valid(...Object.keys(countries)).messages({
			'*': '{{#label}} must be a valid ISO 3166-1 alpha-2 country code in uppercase',
		}),

	hash:
		Joi.string().hex().length(64).required()
			.messages({ '*': 'must be a hex-encoded sha256 hash' })
			.prefs({ abortEarly: true }),

	limit:
		Joi.number().integer().positive().max(100),

	page:
		Joi.number().integer().positive(),

	periodOptional:
		Joi.custom((value, helpers) => {
			if (dateRange.isFloatingPeriod(value)) {
				return dateRange.parseFloatingPeriod(value);
			}

			if (dateRange.isStaticPeriod(value)) {
				let result = dateRange.parseStaticPeriod(value);

				if (!result) {
					return helpers.error('any.invalid');
				}

				return result;
			}

			return helpers.error('any.invalid');
		}).messages({
			'*': '{{#label}} must be one of [day, week, month, year, s-month, s-year] or a valid date in one of the following ISO formats [YYYY, YYYY-MM]',
		}).default(() => dateRange.parseFloatingPeriod('month')),

	periodStatic:
		Joi.custom((value, helpers) => {
			if (dateRange.isStaticPeriod(value)) {
				let result = dateRange.parseStaticPeriod(value);

				if (!result) {
					return helpers.error('any.invalid');
				}

				return result;
			}

			return helpers.error('any.invalid');
		}).messages({
			'*': '{{#label}} must be one of [s-month, s-year] or a valid date in one of the following ISO formats [YYYY, YYYY-MM]',
		}).required(),
};

const composedTypes = {
	by: primitives.byOptional.required(),
	paginatedStats: { limit: primitives.limit, page: primitives.page },
	period: primitives.periodOptional.required(),
};

const composedSchemas = {
	location: Joi.object({ continent: primitives.continent, country: primitives.country })
		.oxor('continent', 'country')
		.messages({ 'object.oxor': 'object contains a conflict between optional exclusive peers {{#peersWithLabels}}' }),
};

module.exports = {
	...primitives,
	...composedTypes,
	...composedSchemas,
};
