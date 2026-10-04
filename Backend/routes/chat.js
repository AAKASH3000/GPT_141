import express from "express";
import Thread from "../model/Thread.js"
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();


//test route to create a new thread

router.post("/test", async (req, res) => {
  
   try{
      const thread=new Thread({
         threadId: "xyz54",
         title:"sample2 thesting 43564"
      });

      // thread.save().then(ress=>console.log(ress));

      const data = await thread.save();
      console.log(data);
      res.json({message:"TThreads created successfully", data:data})
      

   }catch(error){{
      console.log(error);
      res.status(500).json({error: "Failed to create thread"});
   }
   }
});

//all threads fetch route
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

// simgle thread fetch route
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

//delete thread route
router.delete("/threads/:threadId",async(req,res)=>{
     try{
         const {threadId}=req.params;
         const deletedThread = await Thread.findOneAndDelete({threadId});
         if(!deletedThread){
            return res.status(404).json({error:"Thread not found"});
         }
         res.status(200).json({message:"Thread deleted successfully"});
     }catch(error){
         console.log(error);
         res.status(500).json({error:"Failed to delete thread"});
     }
});

//add and fetch thread messages route
router.post("/chat",async(req,res)=>{

   const {threadId,message} = req.body;
   if(!threadId || !message){
      res.status(400).json({error:"threadId and message are required"});
   }

   try{
   
      let thread = await Thread.findOne({threadId});
      if(!thread){
         //create a new thread in the db
         thread = new Thread({
            threadId,
            title:message,
            messages:[{
               role:"user",
               content:message
            }]
         });
      }else{
         // if thread id exists, add the new message to the existing thread
         thread.messages.push({
            role:"user",
            content:message
         });
      }

      //get the response from openai api
      const assistantReply = await getOpenAIAPIResponse(message);
      thread.messages.push({
         role:"assistant",
         content:assistantReply
      });
      thread.updatedAt = Date.now();
      await thread.save();

      //send the response back to the client
      res.json({reply:assistantReply});

   }catch(error){
      console.log(error);
      res.status(500).json({error: "Failed to add message to thread"});
   }
})


export default router;








