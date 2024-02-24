const express=require('express');
const app=new express();
const helmet=require('helmet');
const hpp=require('hpp');
const cookieParser=require('cookie-parser');
const mongoSanitize=require('express-mongo-sanitize');
const rateLimiter=require('express-rate-limit');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const router = require("./src/router/api");

//Security middleware Implemet
app.use(helmet());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors());
app.use(hpp());

app.use(bodyParser.json());

//limiter implementation
const limiter=rateLimiter({windowMs:15*60*1000,max:300});
app.use(limiter);

const URL="mongodb+srv://<username>:<password>@cluster0.75qh3yi.mongodb.net/Project_Assignment?retryWrites=true&w=majority"
const option={
    user:'rakib107054',pass:'rakib172561',autoIndex:true
}

mongoose.connect(URL,option).then(()=>{
    console.log("Database Connection Successfull");
}).catch((e)=>{
    console.log(e);
})

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));

app.set('etag',false);
app.use('/api/v1',router)


app.use(express.static('client/dist'));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})




module.exports=app;