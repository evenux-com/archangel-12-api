import { createUserSchema } from './user.schema';

const validateCreateUserPayload = (req, res, next) => {
  const { error, value } = createUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.validatedPayload = value;
  next();
};

export { validateCreateUserPayload };
