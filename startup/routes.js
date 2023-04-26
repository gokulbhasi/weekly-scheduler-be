const express = require("express")
const logger = require("../middleware/auth")
const error = require("../middleware/error")
const helmet = require("helmet")
const getSchedule = require("../routes/getSchedule")
const updateSchedule = require("../routes/updateSchedule")

module.exports = function(app) {
  //middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static("public"))
  app.use(logger)
  app.use(helmet())
  //api
  app.use("/api/getSchedule", getSchedule)
  app.use("/api/updateSchedule", updateSchedule)

  app.use(error)
}
