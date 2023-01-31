"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNumberScheme = void 0;
const Joi = require('joi');
exports.addNumberScheme = Joi.object({
    number: Joi.number()
        .required()
        .custom((value, helper) => {
        if (isNaN(value))
            throw new Error('Error');
    }),
    negative: Joi.boolean()
        .required(),
    float: Joi.boolean()
        .required(),
    account: Joi.string()
}).options({
    abortEarly: false,
});
//# sourceMappingURL=NumberJoi.js.map