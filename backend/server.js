require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");

const passportStrategy = require("./passport");
const app = express();
const routerUser = require("./routes/Engineer/user.controller");
const contractorRouter = require("./routes/Contractor/user.controller");

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

const bodyParser = require("body-parser");

// use bodyParser middleware to parse request payload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
// mongoose
//   .connect(
//     "mongodb+srv://7kingscode:7kingscode$@bidspek.hal1v1h.mongodb.net/?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => console.log(`Couldn't connected to MongoDB, ${error}`));

mongoose
  .connect("mongodb://0.0.0.0:27017/bidspek")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("couldn't connected to mongodb"));

app.use("/auth", authRoute);
app.use("/engineer", routerUser);
app.use("/contractor", contractorRouter);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
