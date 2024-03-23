module.exports = (err, req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(200).json({
      status: err.statusCode,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  return res.status(200).json({
    status: err.statusCode,
    message: err.message,
  });
};
