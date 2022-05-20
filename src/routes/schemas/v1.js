const Joi = require('joi');
const dateRange = require('../utils/dateRange');

const primitives = {
	hash:
		Joi.string().hex().length(64).required()
			.messages({ '*': 'must be a hex-encoded sha256 hash' })
			.prefs({ abortEarly: true }),

	limit:
		Joi.number().integer().positive().max(100),

	page:
		Joi.number().integer().positive(),

	period:
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
			'*': '{{#label}} must be one of [day, week, month, year] or a valid date in one of the following ISO formats [YYYY, YYYY-MM]',
		}).default(() => dateRange.parseFloatingPeriod('month')),

	type:
		Joi.valid('hits', 'bandwidth'),
};

const composedTypes = {
	paginatedStats: { limit: primitives.limit, page: primitives.page, period: primitives.period },
};

const composedSchemas = {
	queryTypeRequired: Joi.object({ type: primitives.type.required() }),
};

module.exports = {
	...primitives,
	...composedTypes,
	...composedSchemas,
};