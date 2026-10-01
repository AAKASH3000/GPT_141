import express from "express";
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hi i am root! ");
});



router.get("/:id",(req,res)=>{
    console.log("show users")
});

router.post("/",(req,res)=>{
    console.log("post for users")
});

router.delete("/:id",(req,res)=>{
    console.log("delete users")
});


export default router;