const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const indexRouter  = require('./routes/index');
const config = require('./config');
const passport = require('passport');
const authenticate = require('./authenticate');

// express connection
const app = express();

// mongodb connectino
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(()=>{
    console.log('connected to database');
},(err)=>{
    console.log(err);
})


app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));


function auth (req, res, next) {
    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
          next();
    }
    
  }

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(3443, () =>{
    console.log('Secure server on port 3443')
});

