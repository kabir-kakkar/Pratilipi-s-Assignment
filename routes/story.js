var express = require("express");
var router  = express.Router(); 
var Story = require("../models/story");
var middleware = require("../middleware/index.js");

// ==================
//  STORY ROUTES
// ==================

//INDEX - show all stories
router.get("/", function(req, res){
    // Get all stories from DB
    Story.find({}, function(err, allStories){
        if (err) {
            console.log (err);
        } else {
            res.render("story/index.ejs", {story: allStories});
        }
    });  
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("story/new.ejs");
});

router.post("/", middleware.isLoggedIn, function (req, res){
    // get data from form
    var name = req.body.storyTitle; // fetch name of post
    var image = req.body.image; // fetch image of post
    var description = req.body.storyContent;  // fetch description of post
    var author = {
        id: req.user._id,
        username: req.user.username
    } 
    var newStory = {storyTitle: name, image: image, storyContent: description, author: author};
    
    Story.create(newStory, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/story");
        }
    });
});

// SHOW - shows more info about one story
router.get("/:id", function(req, res){
    //find the story with provided ID
    Story.findById(req.params.id).populate("comments").exec(function(err, foundStory){
        if(err){
            console.log(err);
        } else {
            res.render("story/show.ejs", {story: foundStory});
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res){
    Story.findById(req.params.id, function(err, foundStory){
        res.render ("story/edit", {story: foundStory});
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){

    Story.findByIdAndUpdate(req.params.id, req.body.story, function(err, updatedStory){
        if (err) {
            res.redirect("/story");
        } else {
            res.redirect("/story/" + req.params.id);
        }
    });
});

router.delete ("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Story.findByIdAndRemove (req.params.id, function(err){
        if (err) {
            res.redirect("/story");
        } else {
            res.redirect ("/story");
        }
    })
});

module.exports = router;
