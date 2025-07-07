const express=require("express");
const router=express.Router();




router.get("/",(req,res)=>{
    res.send("this is path is for users");
});
router.post("/",(req,res)=>{
    res.send("this is path for post req for user");
});
router.put("/",(req,res)=>{
    res.send("this path is for put req for user");
});
router.delete("/",(req,res)=>{
    res.send("this path is for delete req for user");
});


module.exports=router;