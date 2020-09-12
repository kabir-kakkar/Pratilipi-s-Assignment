var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require ("passport"),
    LocalStrategy   = require ("passport-local"),
    methodOverride  = require ("method-override"),
    User            = require("./models/user"),
    flash           = require("connect-flash"),
    removeAllUsers  = require ("./seedUser.js"),
    seedDB          = require("./seeds");

var commentRoutes    = require("./routes/comments"),
    storyRoutes      = require("./routes/story"),
    indexRoutes      = require("./routes/index")


mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:true}));
// __dirname is the directory on which this script is running
// Serve public directory for using stylesheet
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());

//seedDB();
//removeAllUsers(); // This code removes all Users from the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dogs!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use (function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash ("error");
    res.locals.success     = req.flash ("success");
    next();
});

app.use("/", indexRoutes);
app.use("/story", storyRoutes);
app.use("/story/:id/comments", commentRoutes);

var PORT = process.env.PORT || 3000;
app.listen(PORT, process.env.IP);