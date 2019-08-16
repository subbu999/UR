import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import {APPLICATION_PORT} from "./api/config/data/app"
import db from './api/config/common/mongoose';
import {development} from './api/config/data/db';
import {router} from './api/routes';

const app = express();

const server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
                "Origin,X-Requested-With, Content-Type, Accept, Authorization");
    next();            
});

app.use(router)

app.get("*",(req,res)=>res.status(200).send({message:"Welcome to default Api route"}));
server.listen(APPLICATION_PORT,development.host,()=>{console.log(`server listening at http://${development.host}:${APPLICATION_PORT}/`);
})

db.then(
        ()=>{console.log("MongoDB ready to use")},
        error=>{console.log('handle initial connection error');}
        )   
