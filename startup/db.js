const { logger} = require("../startup/logging")
const mongoose = require("mongoose")
const config = require("config")

module.exports = function() {
  mongoose
    .connect(config.get("db"), { useNewUrlParser: true })
    .then(() =>
      logger.info(`Connected to db : ${config.get("collectionName")}`)
    ).
    catch(error => 
      logger.error(error)
    )
}
