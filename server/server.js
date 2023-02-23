const express = require('express');
const cors = require('cors'); //allows use of json 
const app = express();
const cookieParser = require('cookie-parser'); //used to track cookies

//saves special keys for security
require('dotenv').config();


//allows cookies to be based to server from localhost:3000
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/mongoose.config');
require('./routes/document.route')(app);
require('./routes/user.route')(app);

app.listen(8000, () => console.log(`Listening on port: 8000`));

//node modules: bcrypt, cookie-parser, cors, dotenv, express, jsonwebtoken, mongoose,
// mongoose-mongoose-unique-validator