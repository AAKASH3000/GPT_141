import express from "express";
import 'dotenv/config';
import cors from "cors";
import mongoose from 'mongoose';

import chatRoute from './routes/chat.js';


//------
//DNS
import dns from 'dns';

//Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);
//------

const app=express();
const PORT=8080;

app.use(express.json());
app.use(cors());

app.use("/api",chatRoute);

app.listen(8080,()=>{
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  }catch(err){
    console.log("Failed to connect with DB", err);
  }
}



// app.post("/test",async (req,res)=>{
//     const options = {
//         method: "post",
//         headers:{
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     }

//     try{
//        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
//        const data = await response.json();
//     //    console.log(data.choices[0].message.content);
//        res.send(data.choices[0].message.content);  //replay
//     }catch(e){
//         console.log(e);
//     }

// });

