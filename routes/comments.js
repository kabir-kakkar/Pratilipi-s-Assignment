var express = require("express");
var router  = express.Router({mergeParams: true});
var Story = require("../models/story");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

// ====================
// COMMENTS ROUTES
// ====================

router.get("/new", middleware.isLoggedIn, function(req, res){
    Story.findById(req.params.id, function(err, story){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new.ejs", {story: story});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
   Story.findById(req.params.id, function(err, story){
       if(err){
           console.log(err);
           res.redirect("/story");
       } else {   
        //create new comment
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash ("error", "Something went wrong");
               console.log(err);
           } else {
                // add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // save comment
                comment.save();
                //connect new comment to campground
               story.comments.push(comment);
               story.save();
                //redirect campground show page
                req.flash ("success", "Successfully added comment");
                res.redirect('/story/' + story._id);
           }
        });
       }
   });
});

// Comment Edit Route
router.get("/:comment_id/edit", middleware.checkCommentsOwnership, function(req, res){
    // Here we first find the id of the Comment
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect ("back");
        } else {
            // If the ID is found then we plug in the values of campground_id and put in the details of comment
            res.render("comments/edit.ejs", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// COMMENT UPDATE ROUTE
router.put ("/:comment_id", middleware.checkCommentsOwnership, function(req, res){
    Comment.findByIdAndUpdate (req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect ("/story/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTES
router.delete("/:comment_id", middleware.checkCommentsOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            res.redirect ("back");
        } else {
            req.flash ("success", "Comment deleted!");
            res.redirect ("/story/" + req.params.id);
        }
    })
});

module.exports = router;
