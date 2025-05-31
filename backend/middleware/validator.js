import { badRequestResponse } from '../utils/responseHandler.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        const errors = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }));

        return badRequestResponse(res, 'Validation failed', errors);
      }

      next();
    } catch (err) {
      return badRequestResponse(res, 'Validation error', err.message);
    }
  };
};
