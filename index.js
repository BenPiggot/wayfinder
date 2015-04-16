var express = require('express')
var app = express();
var bcrypt = require('bcrypt');
var mapsCtrl = require("./controllers/maps");
var authCtrl = require("./controllers/auth");
var narrativesCtrl = require("./controllers/narratives");
var session = require('express-session');
var bodyParser = require("body-parser");
var flash = require('connect-flash');
var geocoder = require('geocoder');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret:'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// custom middleware - is user logged in
app.use(function(req,res,next) {
  req.getUser = function() {
    return req.session.user || false;
  }
  next()
})

// get logged-in user info
app.use(function(req,res,next) {
  res.locals.loggedIn = req.getUser();
  next();
})

//custom middleware for alerts
app.use(function(req,res,next){
  res.locals.alerts=req.flash();
  next();
})


app.set("view engine", "ejs")
app.use("/maps", mapsCtrl);
app.use("/auth", authCtrl);
app.use("/narratives", narrativesCtrl);




app.get("/", function(req, res) {
  res.render("front");
})



app.listen(process.env.PORT || 3000) function() {
  console.log("Server started ...")
})