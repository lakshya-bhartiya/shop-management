const express = require("express")
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
const router = require("./api/route")
app.use("/" , router)
require("./db")

module.exports = app