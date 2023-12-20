const express = require("express")
const path = require("path")
require ("dotenv").config()
const morgan = require("morgan")
const dbConnection = require("./src/config/db")
const Service = require("./src/models/Service")
const { getServices } = require("./src/controllers/serviceController")

const app = express()
app.set('views', path.join(__dirname, 'src', 'views'));
app.set("view engine", "ejs")
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const port = process.env.PORT || 5000
dbConnection()

app.use("/api/auth", require("./src/routes/userRoutes"));
app.use("/api/user", require("./src/routes/userRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/services", require("./src/routes/serviceRoutes"));
app.use("/api/bookings", require("./src/routes/bookingRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));

app.get("/api/auth/login", async (req, res) => {
    try {
        res.sendFile(__dirname + "/src/views/log_in.html")
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/", async (req, res) => {
    try {
        const result = await Service.find();
        res.render("index", { services: result });
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})