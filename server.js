const express = require("express")
const cookieParser = require('cookie-parser');
const path = require("path")
require ("dotenv").config()
const morgan = require("morgan")
const dbConnection = require("./src/config/db")
const Service = require("./src/models/Service")
const { cookieAuth } = require("./src/auth/auth");
const ServiceCategory = require("./src/models/Category");

const app = express()
app.use(cookieParser());
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

const viewsPath = path.join(__dirname, "src", "views")

app.get("/api/home", cookieAuth, async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            const services = await Service.find();
            const categories = await ServiceCategory.find();
            res.status(200).render("home", { services: services, categories: categories });
        } else {
            res.redirect("/api/auth/login")
        }
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/api/auth/register", async (req, res) => {
    try {
        res.render("sign_up")
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/api/auth/login", async (req, res) => {
    try {
        res.render("log_in")
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/", async (req, res) => {
    try {
        res.render("welcome");
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})