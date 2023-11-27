function createToDoErrorHandler(req, res, next) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Title and Description are required.",
    });
  }

  return next();
}

module.exports = { createToDoErrorHandler };
