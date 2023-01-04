class AppError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest(message) {
    message = message ?? 'Bad Request';
    return new AppError(400, message);
  }

  static unathorized(message) {
    message = message ?? 'Unathorized';
    return new AppError(401, message);
  }

  static forbidden(message) {
    message = message ?? 'Forbidden';
    return new AppError(403, message);
  }

  static unprocessed(message) {
    message = message ?? 'Unprocessed';
    return new AppError(422, message);
  }

  static notFound(message) {
    message = message ?? 'Not Found';
    return new AppError(404, message);
  }
}

module.exports = AppError;
