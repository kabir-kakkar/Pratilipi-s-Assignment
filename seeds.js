var mongoose = require("mongoose");
var Story = require("./models/story");
var Comment   = require("./models/comment");
 
var data = [
    {
        storyTitle: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        storyContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        },
        userCount: 0
    },
    {
        storyTitle: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        storyContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff71",
            username: "Jill"
        },
        userCount: 0
    },
    {
        storyTitle: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        storyContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff77",
            username: "Jane"
        },
        userCount: 0
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Story.deleteMany({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed stories!");
        Comment.deleteMany({}, function(err) {
            if (err){
                console.log(err);
            }
            console.log("removed comments!");
            
            data.forEach(function(seed){
                Story.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a story");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author:{
                                    id : "588c2e092403d111454fff76",
                                    username: "Jack"
                                }
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        })
    }); 
    //add a few comments
}
 
module.exports = seedDB;