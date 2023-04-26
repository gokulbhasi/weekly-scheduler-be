const express = require("express")
const router = express.Router()
const Joi = require("joi")
const Schedule = require("../model/scheduleModel")
const jwt = require("jsonwebtoken")
const config = require("config")
const _ = require('lodash')

router.get("/", async (req, res, next) => {
  // console.log('req,', req.query)
  const { id } = req.query // the user who is searching
  const { err } = validateId(req.query)
  if (err) {
    next(err)
    return
  }
  //db search
  let scheduleData = await Schedule.find({_id: id})
    .select({ _id: 1, schedule: 1 }) //get schedule
  //json structure
  if (_.isEmpty(scheduleData)) {
    await Schedule.updateOne({ _id: id }, {schedule: []}, {upsert: true, setDefaultsOnInsert: true})
    scheduleData = await Schedule.find({_id: id})
    .select({ _id: 1, schedule: 1 }) //get schedule
  }
  const result = {
    status: true,
    data: scheduleData[0]
  }
  //return json result with header
  //const token = Schedule.generateAuthToken()
  const token = jwt.sign(config.get("accessCode"), config.get("webToken"))
  res.header("x-auth-token", token).send(result)
})



const validateId = (scheduleData) => {
  const schema = Joi.object({
    id: Joi.string()
      .min(1)
      .required()
  })

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  }

  return schema.validate(scheduleData, options)
}

module.exports = router
