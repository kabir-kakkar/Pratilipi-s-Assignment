var mongoose = require("mongoose");

var storySchema = new mongoose.Schema ({
    storyTitle: String,
    image: String,
    storyContent: String,
    author: {
       id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
       }, 
       username: String
    },
    comments: [ 
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
});

module.exports = mongoose.model("Story", storySchema);