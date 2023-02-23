const Document = require("../models/document.model"); // Document moddel
const jwt = require('jsonwebtoken'); //token used for storing cookie and authentication
const FIRST_SECRET_KEY = "banana"; //secret key for checking credentials

//creates Document after verifying the user
module.exports.createDocument = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    console.log(user);
    Document.create({creator: user.username, ...req.body})
    .then(document => {
        res.status(200).json({msg: document})
    })
    .catch(err => res.status(400).json(err));
}

//retreaves a Document from database
module.exports.getDocument = (req, res) => {
    Document.findOne({_id:req.params.id})
    .then(document => res.json(document))
    .catch(err => res.status(400).json(err));
}

//retreaves all Documents from database
module.exports.getAllDocuments = (req, res) => {
    Document.find({})
    .then( documents => {
        res.json(documents);
    })
    .catch(err => res.status(400).json(err));
}

//retreaves all Documents based on the username provided after checking the cookie to verify user
module.exports.getDocumentByCreator = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    console.log(user.username);
    Document.find({creator: user.username})
    .then( documents => {
        res.json(documents);
    })
    .catch(err => res.status(400).json(err));
}

//verifies the user and then checks that the Document is created by the verified user.
//if they are, it then updates the Document with the new form information
module.exports.updateDocument = (req,res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    Document.findById({_id: req.params.id})
    .then(document => {
        if (document.creator == user.username){
            Document.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
            .then(updatedDocument => res.json(updatedDocument))
            .catch(err => res.status(400).json(err));
        }
        else res.status(400).json({msg: "Document and user do not match"})
    })
    .catch(err => res.status(400).json(err))
}

module.exports.deleteDocument = (req,res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    Document.findById({_id: req.params.id})
    .then(document => {
        if (document.creator == user.username){
            Document.deleteOne({_id: req.params.id})
            .then(deletedDocument => res.json(deletedDocument))
            .catch(err => res.status(400).json(err));
        }
        else res.status(400).json({msg: "Document and user do not match"})
    })
    .catch(err => res.status(400).json(err))
}