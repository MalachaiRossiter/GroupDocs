const express = require('express');
const cors = require('cors'); //allows use of json 
const app = express();
const cookieParser = require('cookie-parser'); //used to track cookies
const socket = require('socket.io');

//saves special keys for security
require('dotenv').config();


//allows cookies to be based to server from localhost:3000
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/mongoose.config');
require('./routes/document.route')(app);
require('./routes/user.route.js')(app);

const server = app.listen(8000, () => console.log(`Listening on port: 8000`));

// to initialize the socket, we need to invoke a new instance
//     of socket.io and pass it our express server instance
// We must also include a configuration settings object to prevent CORS errors
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    // NOTE: Each client that connects get their own socket id!
    // if this is logged in our node terminal, that means we a new client
    //     has successfully completed the handshake!
    console.log('socket id: ' + socket.id);

    socket.on("changeBody", data => {
        io.emit("updateNewBody", data);
    });
});

//node modules: bcrypt, cookie-parser, cors, dotenv, express, jsonwebtoken, mongoose,
//mongoose-unique-validator