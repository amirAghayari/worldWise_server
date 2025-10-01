const express = require("express")
const morgan = require("morgan")

const AppError = require("./utils/appError")


const app = express()

app.use(morgan("dev"))

module.exports = app;