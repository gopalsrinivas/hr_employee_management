const statusMessages = {
  400: "Please check the highlighted fields.",
  401: "Your session has expired. Please sign in again.",
  403: "You do not have permission to perform this action.",
  404: "The requested record was not found.",
  409: "A duplicate or conflicting record already exists.",
  422: "Please check the highlighted fields.",
  500: "Server error. Please try again later."
};

const getResponseData = (error) => error?.response?.data || error?.data || {};

export const getApiStatusCode = (error) => error?.status || error?.response?.status || getResponseData(error).statusCode;

export const getApiRequestId = (error) => getResponseData(error).requestId;

export const getApiFieldErrors = (error) => {
  const errors = error?.errors || getResponseData(error).errors || [];

  return errors.reduce((fieldErrors, item) => {
    const field = item.path || item.param || item.field;
    const message = item.msg || item.message;

    if (!field || !message) {
      return fieldErrors;
    }

    fieldErrors[field] = fieldErrors[field] ? `${fieldErrors[field]} ${message}` : message;
    return fieldErrors;
  }, {});
};

export const getApiErrorMessage = (error) => {
  const fieldErrors = getApiFieldErrors(error);
  const firstFieldMessage = Object.values(fieldErrors)[0];

  if (firstFieldMessage) {
    return firstFieldMessage;
  }

  const data = getResponseData(error);
  const statusCode = getApiStatusCode(error);
  return data.message || error?.message || statusMessages[statusCode] || "Request failed";
};

export const normalizeApiError = (error) => ({
  message: getApiErrorMessage(error),
  backendMessage: getResponseData(error).message || error?.message || "",
  fieldErrors: getApiFieldErrors(error),
  statusCode: getApiStatusCode(error),
  requestId: getApiRequestId(error),
  errors: error?.errors || getResponseData(error).errors || []
});
