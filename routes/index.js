var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

// LANDING PAGE
router.get("/", function(req, res){
    res.render ("landing.ejs");
});

// ==================
// AUTH ROUTES
// ==================

// SIGN UP ROUTE
router.get("/register", function(req, res){
    res.render("register");
});

//HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register ( newUser , req.body.password, function(err, user){
        if (err) {
            req.flash ("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash ("success", "Welcome to Pratilipi,  " + user.username);
            res.redirect ("/story");
        });
    });
});

// SHOW LOG IN FORM
router.get("/login", function(req, res){
    res.render("login.ejs");
});

// POST REQUEST FOR LOG IN
// app.post ("/route", middleware, callbackfunction)
router.post ("/login", passport.authenticate("local", 
    {
        successRedirect: "/story",
        failureRedirect: "/login"
    }), function(req, res){
            // THIS CALLBACK DOESN'T DO ANYTHING
});

// LOG OUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/story");
});

module.exports = router;