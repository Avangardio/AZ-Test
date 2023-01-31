const Joi = require('joi');


export const addNumberScheme = Joi.object({
     number: Joi.number()
        .required()
        .custom((value, helper) => {
            if (isNaN(value)) throw new Error('Error');
        }),
     negative: Joi.boolean()
        .required(),
     float: Joi.boolean()
         .required(),
     account: Joi.string()
}).options({
    abortEarly: false,
});