import express from "express";
import Thread from "../model/Thread.js"

const router = express.Router();


//test route to create a new thread

router.post("/test", async (req, res) => {
  
   try{
      const thread=new Thread({
         threadId: "xyz77854",
         title:"sample2 thesting 43564"
      });

      // thread.save().then(ress=>console.log(ress));

      const data = await thread.save();
      console.log(data);
      res.json({message:"TThreads created successfully", data:data})
      

   }catch(error){{
      console.log(error);
      res.status(500).json.json({error: "Failed to create thread"});
   }
   }
});

router.get("/threads",async(req,res)=>{
   try{
      const threads = await Thread.find({}).sort({updatedAt:-1});
      //descending order based on updatedAt...most recent threads will be at the top
      res.json(threads);
   }catch(error){
      console.log(error);
      res.status(500).json({error:"Failed to fetch threads"});
   }
});

router.get("/threads/:threadsId",async(req,res)=>{
   try{
      // const threadId = req.params.threadsId;
      const {threadId}=req.params;
      const thread = await Thread.findOne({threadId});
      if(!thread){
         return res.status(404).json({error:"Thread not found"});
      }
      res.json(thread.messages);
   }catch(error){
      console.log(error);
      res.status(500).json({error:"Failed to fetch thread"});
   }
});


export default router;








