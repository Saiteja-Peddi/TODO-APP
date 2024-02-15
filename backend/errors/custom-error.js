class CustomApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomApiError = (statusCode, message) => {
  return new CustomApiError(statusCode, message);
};

module.exports = { createCustomApiError, CustomApiError };
