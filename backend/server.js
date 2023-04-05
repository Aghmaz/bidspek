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
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// app.use(
//   session({
//     cookie: { maxAge: 86400000 },
//     store: new MemoryStore({
//       checkPeriod: 86400000, // prune expired entries every 24h
//     }),
//     secret:
//       "AQWZTJVp-P7jmIAX-WVx6TU6i5g-2XuAw0iUWOnFHjTsDEMbFyFxSBKUj3jmADcisF4BuYgVK4RNeoQ_Ngzvv-uPnKr2-an2DoV9VcsIf7grDaAnI2HCYHr8V8nljfkhOZj1TdM0Wvkr39NZWpGT5HNW4Jty48shY7vQ3xcUBppKjaEjMWyw7L_unkvy9drVKPXm4B3VROYOCTZaeX8h8VUP-ad9enoWR3cNe5KOXUC57MPj4hXcvT9GmdeFmC2RTK8h4RzhpEIcqx05wrLlDj627dEDnndEWGHZmpMWV8HKR1OoBHjPOioJ51GlVu_-3_pwKp1WNytn9CvAB8xq2rivZdH6tQ",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

const bodyParser = require("body-parser");

// use bodyParser middleware to parse request payload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
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
