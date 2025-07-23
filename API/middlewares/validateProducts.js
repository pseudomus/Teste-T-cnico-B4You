const yup = require('yup');

const createProductSchema = yup.object({
    name: yup.string().required('Name is necessary'),
    price: yup.number().required('Price is required').positive('Price must be positive')
});

const updateProductSchema = yup.object({
    name: yup.string(),
    price: yup.number().positive('Price must be positive'),
}); 

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        return res.status(400).json({
            errors: err.errors || ['Validation failed']
        });
    }
};

module.exports = {
    validateCreateProduct: validate(createProductSchema),
    validateUpdateProduct: validate(updateProductSchema)
};