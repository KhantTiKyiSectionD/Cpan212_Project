const logger = (req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`
  );
  next();
};

export default logger;