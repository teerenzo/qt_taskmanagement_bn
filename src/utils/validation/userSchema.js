import joi from 'joi';

const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    userName: joi.string().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.number().required(),
    dob: joi.date().required(),
    password: joi.string().required(),
    address: joi.string(),
});

export default userSchema;