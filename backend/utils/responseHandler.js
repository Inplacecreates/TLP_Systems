export const statusCodes = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
};

export const createResponse = (res, statusCode, message, data = null, error = null) => {
    const response = {
        success: statusCode < 400,
        message,
        ...(data && { data }),
        ...(error && { error })
    };

    return res.status(statusCode).json(response);
};

export const successResponse = (res, data, message = 'Success') => {
    return createResponse(res, statusCodes.SUCCESS, message, data);
};

export const createdResponse = (res, data, message = 'Created successfully') => {
    return createResponse(res, statusCodes.CREATED, message, data);
};

export const errorResponse = (res, statusCode, message, error = null) => {
    return createResponse(res, statusCode, message, null, error);
};

export const badRequestResponse = (res, message = 'Bad request', error = null) => {
    return errorResponse(res, statusCodes.BAD_REQUEST, message, error);
};

export const notFoundResponse = (res, message = 'Resource not found', error = null) => {
    return errorResponse(res, statusCodes.NOT_FOUND, message, error);
};

export const unauthorizedResponse = (res, message = 'Unauthorized', error = null) => {
    return errorResponse(res, statusCodes.UNAUTHORIZED, message, error);
};

export const forbiddenResponse = (res, message = 'Forbidden', error = null) => {
    return errorResponse(res, statusCodes.FORBIDDEN, message, error);
};
