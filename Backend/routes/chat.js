import express from 'express';
import Thread from "../models/Thread.js"
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

//test
router.post("/test",async (req,res)=>{
    try{
        const thread = new Thread({
            threadId:"abc",
            title:"Testing New Thread2",
        });
  
        const responce = await thread.save();
        res.send(responce);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to save in DB"})
    }
});

//Get all thread
router.get("/thread", async(req,res)=>{
   try{
      const threads = await thread.find({}).sort({updatedAt: -1});
      //decending order of updateAt...most recent data on top
      res.json(threads);
   }catch(err){
    console.log(err);
    res.status(500).json({error: "Failed to fetch threads"});
   }
});

//Get thread by ID
router.get("/thread/:threadId",async (req,res)=>{
    const {threadId} = req.params;

   try{
        const thread = await thread.findOne({threadId});

        if(!thread){
            res.status(404).json({error: "Thread is not found"});
        }

        res.json(thread.message);
   }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads"});
   }
})

//Delete thread by ID
router.delete("/thread/:threadId",async (req,res)=>{
    let {threadId} = req.params;

    try{
        const deletedThread = await Thread.findOneAndDelete(threadId);

        if(!deletedThread){
            res.status(404).json({error: "Thread is not found"});
        }

        res.status(200).json({success: "Thread deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to delete thread"})
    }
});


// response fetch from open ai api 
router.post("/chat",async(req,res)=>{
    const {threadId, message}=req.body;

    if(!threadId || !message){
           res.status(400).json({error: "missing requierd fields"});    
    }

    try{
        let thread = await Thread.findOne({threadId});
        if(!thread){
            //creat a new thread in DB
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role:"user", content :message}]
            });
        }else{
            //**
            thread.messages.push({role:"user", content: message});
        }

        const assistantReply = await getOpenAIAPIResponse(message);

        thread.messages.push({role:"assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();

        //send responce
        res.json({reply: assistantReply});

    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong" });
    }
});

export default router;