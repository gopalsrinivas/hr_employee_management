let requestCounter = 0;

const requestContext = (req, res, next) => {
  requestCounter += 1;
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const sequence = String(requestCounter).padStart(6, "0");
  const requestId = req.headers["x-request-id"] || `REQ-${datePart}-${sequence}`;

  req.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
};

module.exports = requestContext;
