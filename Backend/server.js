import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

//------
//DNS
import dns from 'dns';

//Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);
//------

const app = express();
const PORT=8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`);
  connectDb();
});

const connectDb = async()=>{
  try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected with Database!")
  }catch(err){
    console.log("Failed to connect with DB ",err);
  }
}



