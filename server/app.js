const express = require("express");
const bodyParser = require("body-parser"); //Not needed with new version of express.abs
const cors = require("cors");
const mongoose = require("mongoose");
//Passport
const passport = require("passport");

//Config Express
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});
app.use(expressSession);
app.use(cors());
app.use(express.json()); //app.use(bodyParser.json()); //included with new express
//use this instead

//Config passport
app.use(passport.initialize());
app.use(passport.session());

//Config mongoose
const uri = process.env.ATLAS_URI;
//mongodb node driver rewrite the tool to parse mongodb connection string
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Config Model
/* PASSPORT LOCAL AUTHENTICATION */
const User = require("./Models/user.model");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Config Routes
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const categoryRouter = require("./routes/category");
const ProductRouter = require("./routes/product");
const RoleRouter = require("./routes/role");
//Use the routes
app.use("/exercises", exercisesRouter);
app.use(usersRouter);
app.use(categoryRouter);
app.use(ProductRouter);
app.use(RoleRouter);

//Starting the server
app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press Ctrl-C to terminate.`
  )
);
