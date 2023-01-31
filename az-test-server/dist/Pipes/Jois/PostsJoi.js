"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostScheme = void 0;
const Joi = require('joi');
exports.PostScheme = Joi.object({
    post: {
        author: Joi.string()
            .required(),
        text: Joi.string()
            .required(),
    },
    account: Joi.string()
        .required()
}).options({
    abortEarly: false,
});
//# sourceMappingURL=PostsJoi.js.map