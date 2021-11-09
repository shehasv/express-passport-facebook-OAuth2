const express = require('express');

const indexRouter = express.Router();

indexRouter.get('/',(req, res, next)=>{
    res.setHeader('Content-type','text/html')
    res.send('Hello World')
})

module.exports  = indexRouter;