const mongoose = require('mongoose');

//Document database with creator embedded to the user database 
const DocumentSchema = new mongoose.Schema({
    creator: {type: String, required: [true, "name is required"], 
    minlength: [3, "creator musted be at least 3 characters long"]},
    
    
    title: {type: String, required: [true, "please provide a title for your post"], 
    minlength: [3, "title must be at least 3 characters long"], 
    maxlength: [50, "title must be no more than 50 characters long"]},
    
    
    body: {type: String, required: [true, "please provide a body section for your post"], 
    minlength: [20, "body must at contain at least 20 characters"]},
    
}, {timestamps: true});
module.exports = mongoose.model("Document", DocumentSchema);