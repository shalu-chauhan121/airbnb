const express=require("express");
const router=express.Router();


router.get("/",(req,res)=>{
    res.send("this is home path for posts");
});
router.post("/",(req,res)=>{
    res.send("this is path for post req for post");
});
router.put("/",(req,res)=>{
    res.send("this is path for put req for post");
});
router.delete("/",(req,res)=>{
    res.send("this is path for delete req for post");
});

module.exports=router;