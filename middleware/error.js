const Log = require("../startup/logging")

module.exports = function(err, req, res, next) {
  Log.logger.error(err.message, err)
  res
    .status(500)
    .send({ status: false, message: "Internal server error", error: err })
}
