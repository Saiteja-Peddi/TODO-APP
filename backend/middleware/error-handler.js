const { CustomApiError } = require("../errors/custom-error");

/**
 * When an error is passed to next(), Express skips any remaining non-error-handling middleware and routes,
   passing control directly to the first error-handling middleware that has been defined.
   
 * If no error-handling middleware is defined, Express will use its default error handler to send a response to the client.
 */

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json(JSON.parse(err.message));
  }
  return res
    .status(400)
    .json({ success: false, message: "Unable to process the request." });
};

module.exports = errorHandlerMiddleware;
