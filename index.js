const express = require("express")
require ("dotenv").config()
const dbConnection = require("./db")

const app = express()
app.use(express.json())
const port = process.env.PORT || 5000
dbConnection()

app.use("/", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})