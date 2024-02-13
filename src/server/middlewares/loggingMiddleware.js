const loggingMiddleware = (db) => async (req, res, next) => {
  const ip = req.ip.split(':').pop();
  const headers = JSON.stringify(req.headers);
  const originalUrl = req.originalUrl;
  const log = await db.logging.create({
    ip,
    header: headers,
    action: originalUrl,
  });
  await log.save();
  next();
};

module.exports = loggingMiddleware;
