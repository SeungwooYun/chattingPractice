const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config({ path: "./.env" })
const cors = require("cors")
const app = express()
app.use(cors())

mongoose.connect(process.env.DB)
    .then(() => { console.log("connected to database on", process.env.DB) })
    .catch((err) => { console.error("error connecting to database: ", err) })

module.exports = app