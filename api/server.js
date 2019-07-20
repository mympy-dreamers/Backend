const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const server = express();
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
var userInViews = require("../middleware/userInViews");
var authRouters = require("../router/auth");
var indexRouter = require("../router/index");
var usersRouter = require("../router/users");

const authRouter = require("./auth/signUp-router.js");
const userRouter = require("./users/users-router.js");

// config express-session
const sess = {
  secret: "MYMPY is awesome project",
  cookie: {},
  resave: false,
  saveUninitialized: true
};

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

server.use(cors());
server.use(express.json());
passport.use(strategy);

server.use(session(sess));
server.use(passport.initialize());
server.use(passport.session());
server.use(userInViews());
server.use('/', authRouters);
server.use('/', indexRouter);
server.use('/', usersRouter);

if (server.get("env") === "production") {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

server.use("/auth", authRouter);
server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ Title: "Mympy Server Up!" });
});

module.exports = server;
