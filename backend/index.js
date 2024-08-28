import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import db from "./config/db.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


dotenv.config()
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
  };

const app=express()
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api',router);


const PORT=3000 || process.env.PORT
db().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running");
    })
})


