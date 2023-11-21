import Joi from 'joi';

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(16),
}).options({
  abortEarly: false, // Prevent validation on first error
  messages: {
    'any.required': '"{{#label}}" is a required field',
    'string.email': '"{{#label}}" must be a valid email address',
    'string.min': '"{{#label}}" must be at least {{#limit}} characters',
    'string.max': '"{{#label}}" must be at most {{#limit}} characters',
  },
});

export { createUserSchema };
