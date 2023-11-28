import Joi from "joi";

const addTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    endDate: Joi.date().required(),
    priority: Joi.string().required(),
    assignees: Joi.string().required(),
    projects: Joi.string().required(),
    startDate: Joi.date().required(),
})

export default addTaskSchema;