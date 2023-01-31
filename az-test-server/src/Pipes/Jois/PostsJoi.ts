const Joi = require('joi');


export const PostScheme = Joi.object({
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