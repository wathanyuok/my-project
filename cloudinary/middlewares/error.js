const errorHandler = (err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" });
};

module.exports = errorHandler;


// http://localhost:8080/post/list/1
// http://localhost:8080/post/2
// http://localhost:8080/post

// http://localhost:8080/auth/register
// http://localhost:8080/auth/login
