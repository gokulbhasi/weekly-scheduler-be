const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

const Log = require("./startup/logging")
Log.error()
require("./startup/routes")(app)
require("./startup/db")()
require("./startup/config")(app)

//configuration
//debug("Application Name: " + config.get("name")) //export NODE_ENV=production // DEBUG=app:startup nodemon index.js //

const port = process.env.PORT || 5000
app.listen(port, () => Log.logger.info(`listening to port ${port}`))