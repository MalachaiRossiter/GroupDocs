const User = require("../models/user.model");// user model
const jwt = require('jsonwebtoken'); //token used for storing cookie
const bcrypt = require('bcrypt'); //used for password hashing
const secret = "banana"; //secret key for token

module.exports.createUser = (req, res) => {
    User.create(req.body)
    .then(user => {
        const payload = {_id: user._id, email: user.email, username: user.username}
        const userToken = jwt.sign(payload, process.env.FIRST_SECRET_KEY);
        res.cookie("usertoken", userToken, {expires: new Date(Date.now() + 9000000), httpOnly: true})
        .json({ msg: "cookie obtained!", user: payload});
    })
    .catch(err => {
        console.log("string", err);
        res.status(400).json(err)
    });
}

module.exports.getUser = (req, res) => {
    User.findOne({_id:req.params.id})
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
}

module.exports.getAllUsers = (req, res) => {
    User.find({})
    .then( users => {
        console.log(users)
        res.json(users);
    })
    .catch(err => res.status(400).json(err));
}

module.exports.updateUser = (req,res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, reValidators: true})
    .then(updateduser => res.json(updateduser))
    .catch(err => res.status(400).json(err));
}

module.exports.deleteUser = (req,res) => {
    User.deleteOne({_id: req.params.id})
    .then(deleteduser => res.json(deleteduser))
    .catch(err => res.status(400).json(err));
}

module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email});
    console.log('logging in: ' + user)
    try{
        if(user === null) {
            return res.status(400).json({errors: 'Email not found'});
        } else {
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            console.log("I made it this far");
            if(!correctPassword){
                return res.status(400).json({errors: 'Invalid password/email'});
            } else {
                const payload = {_id: user._id, email: user.email, username: user.username}
                const userToken = jwt.sign(payload, process.env.FIRST_SECRET_KEY);
                res.cookie("usertoken", userToken, {expires: new Date(Date.now() + 9000000), httpOnly: true})
                .json({ msg: "cookie obtained!", user: payload});
            }
        }   
    } catch (err) {
        res.status(400).json({errors: 'oops something went wrong when logging in'})
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    console.log("succesffuly logged out");
    res.sendStatus(200);
}

module.exports.secret = secret;
module.exports.loginCheck = (req, res) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) { 
            res.status(401).json({verified: false});
        } else {
            res.status(200).json({msg: "logged in"})
        }
    });
}