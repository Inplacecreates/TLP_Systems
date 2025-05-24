// Common test helper functions
export function expectSuccess(response, statusCode = 200) {
    expect(response.status).toBe(statusCode);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    return response.body.data;
}

export function expectError(response, statusCode, message) {
    expect(response.status).toBe(statusCode);
    expect(response.body).toHaveProperty('message');
    if (message) {
        expect(response.body.message).toMatch(message);
    }
}

export function expectValidationError(response) {
    expectError(response, 400, /validation/i);
}

export function expectUnauthorizedError(response) {
    expectError(response, 401, /unauthorized/i);
}

export function expectForbiddenError(response) {
    expectError(response, 403, /forbidden|not allowed/i);
}

export function expectNotFoundError(response) {
    expectError(response, 404, /not found/i);
}