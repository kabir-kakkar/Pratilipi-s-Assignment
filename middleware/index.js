var Story = require("../models/story");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {        
       Story.findById(req.params.id, function(err, foundStory){
           if (err) {
               req.flash ("error", "Story Not Found");
               res.redirect("back");
           } else {
               if (foundStory.author.id.equals(req.user._id)){
                    next();  
                } else {
                    req.flash ("error", "You don't have permission to do that");
                    res.redirect("back");
                }
           }
       });
   } else {
       req.flash ("error", "You need to be logged in to do that");
       res.redirect ("back");
   }  
}

middlewareObj.checkCommentsOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {        
       Comment.findById(req.params.comment_id, function(err, foundComment){
           if (err) {
               res.redirect("back");
           } else {
               if (foundComment.author.id.equals(req.user._id)){
                    next();  
                } else {
                    req.flash ("error", "You don't have permission to do that");
                    res.redirect("back");
                }
           }
       });
   } else {
       res.redirect ("back");
   }  
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash ("error", "You need to be logged in to do that");
    res.redirect("/login");
}
module.exports = middlewareObj;