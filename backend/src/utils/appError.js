class AppError extends Error {
  constructor(message, statusCode = 500, errors = []) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

class AuthenticationError extends AppError {
  constructor(message = "Unauthorized", errors = []) {
    super(message, 401, errors);
  }
}

class AuthorizationError extends AppError {
  constructor(message = "Forbidden", errors = []) {
    super(message, 403, errors);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Record not found", errors = []) {
    super(message, 404, errors);
  }
}

class ConflictError extends AppError {
  constructor(message = "Record already exists", errors = []) {
    super(message, 409, errors);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation failed", errors = []) {
    super(message, 422, errors);
  }
}

module.exports = {
  AppError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  ValidationError
};
