import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import db from "./config/db.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


dotenv.config()

const app=express()
app.use(cors());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api',router);

const __dirname=path.resolve();
const PORT=3000 || process.env.PORT
db().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running");
    })
})
app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,'client','dist','index.html'));
})

