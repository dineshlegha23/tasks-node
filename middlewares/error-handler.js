const { CustomAPIError } = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(err.statusCode).json({ msg: "Some error occured!!!" });
};

module.exports = errorHandler;
