const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Schedule = require('../model/scheduleModel')
const _ = require('lodash')

// edit schedule
router.post('/', async (req, res, next) => {
  // console.log('req.body', req.body)
  const { error } = validatePost(req.body)
  if (error) return res.status(400).send(error)
  const { id, schedule } = req.body
  try {

    const data = await Schedule.updateOne({ _id: id }, {schedule}, {upsert: true, setDefaultsOnInsert: true})

    const scheduleResponse = await Schedule.findOne({ _id: id }).select({ _id: 1, schedule: 1 })
    const response = {
      status: true,
      message: 'Schedule Creation Successful',
      data: {
        ...scheduleResponse._doc
      }
    }
    res.send(response)
  } catch (e) {
    next(`Schedule Creation Failed${e}.`, e)
  }
})

const validatePost = (scheduleData) => {
  const schema = Joi.object({
    id: Joi.string()
      .min(1)
      .required(),
    schedule: Joi.array()
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
