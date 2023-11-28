import Joi from "joi";

const changePasswordSchema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
});


export default changePasswordSchema;