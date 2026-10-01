import express from "express";
const app = express();
import users from "./routes/user.js";
import posts from "./routes/post.js";


app.use("/users",users);

//post

app.use("/post",posts);






app.listen("3000",()=>{
    console.log("app is listning");
})