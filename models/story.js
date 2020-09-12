var mongooose = require("mongoose");

var storySchema = new mongooose.Schema ({
    storyTitle: String, 
    storyContent: String
});