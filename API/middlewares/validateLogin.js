const yup = require('yup');

const loginSchema = yup.object({
    email: yup.string().email().required('email is required'),
    password: yup.string().required('password is required')
});

module.exports = async (req, res, next) => {
    try {
        await loginSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        res.status(400).json({
            errors: err.errors || [err.message || 'Validation failed']
        });
    }
};