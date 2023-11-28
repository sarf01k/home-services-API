const express = require("express")
require ("dotenv").config()
const morgan = require("morgan")
const dbConnection = require("./config/db")

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const port = process.env.PORT || 5000
dbConnection()

app.use("/", require("./routes/categoryRoutes"));
app.use("/", require("./routes/serviceRoutes"));
app.use("/", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})