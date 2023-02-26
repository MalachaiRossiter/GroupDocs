const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

//creating the User database with validations
const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "a username is required to make an account"], 
        minlength: [3, "your username must be at least 3 characters long"], 
        unique: [true, "Someone already has this username"]
    },
    
    //email with validations using Regex
    email: {
        type: String, 
        required: [true, "an email is required to make an account"], 
        validate: {validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"},
        unique: [true, "Someone already has this username"]
    },

    password: {type: String, required: [true, "a password is required to make an account"]},
}, {timestamps: true});

//creates unique validator which can be sent to front end for display
UserSchema.plugin(uniqueValidator, {message: `{PATH} must be unique`});

//creats a temporary space for confirmed password
UserSchema.virtual('confirmPassword')
.get(() => this._confirmPassword)
.set(value => this._confirmPassword = value);

//checks if password and confirmedPassword match
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
            const validationError = this.invalidate('confirmPassword', 'Password must match confirm password');
    };
    next();
});

//using Bcrypt, hashes password to save in the database
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model("User", UserSchema);