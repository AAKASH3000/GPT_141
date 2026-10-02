import express from "express";
import Thread from "../model/Thread.js"

const router = express.Router();

router.post("/test2",async(req,res)=>{
   try{
      let data = await Thread.find();
      res.json(data);
      console.log(data);
   }catch(error){
      console.log(error);
      res.status(500).json({error: "Failed to create thread"});
   }
})

router.post("/test", async (req, res) => {
   //   try {
   //      const { userId, message } = req.body;
   //      const newThread = new Thread({
   //          userId,
   //          message
   //      });
   //      await newThread.save();
   //      res.status(201).json(newThread);
   //  } catch (error) {
   //      res.status(500).json({ error: "Failed to create thread" });
   //  }

   // try{
   //    let data = await Thread.find();
   //    res.json(data);
   //    res.send("Thread created successfully");
   //    console.log(data);
   // }catch(error){
   //    console.log(error);
   //    res.status(500).json({error: "Failed to create thread"});
   // }

   try{
      const thread=new Thread({
         threadId: "xyz12346",
         title:"sample thesting 464"
      });

      thread.save().then(ress=>console.log(ress));

      // const data = await thread.save();
      // console.log(data);
      

   }catch(error){{
      console.log(error);
      res.status(500).json.json({error: "Failed to create thread"});
   }
   }
});


export default router;








