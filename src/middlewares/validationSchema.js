const validateSchema = (schema) => {
    return (req, res, next) => {
       // get form data
       const data = req.body;
       console.log(data)
        const { error } = schema.validate(req.body);
        if (error) {
        return res.status(400).send(error.details[0].message);
        }
        next();
    };
    };

export default validateSchema;