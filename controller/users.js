const express=require("express");
const User =require("../models/user.js");

module.exports.signupUser=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signupPostuser=async (req,res)=>{
    try{
       let {username,email,password}=req.body;
       let newUser=new User({
          username:username,
          email:email,
       });
       let registerdUser=await User.register(newUser,password);
       req.login(User.registerdUser,((err)=>{
           if(err) return next(err);
           else {
               req.flash("success","Welcome to Wanderlust");
               res.redirect("/listings");
           }
       }))
     
       console.log(registerdUser);
   }catch(e){    
       req.flash("error",e.message);
       res.redirect("http://localhost:8080/user/signUp");
       console.log(e);
   } 

}

module.exports.loginUser=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginPostuser= async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust");
    let redirectUrl=res.locals.redirectUrl;
    if(!redirectUrl) redirectUrl="http://localhost:8080/listings";
    console.log(redirectUrl);
    res.redirect(redirectUrl); 
}

module.exports.logoutUser=(req,res,next)=>{
    req.logout((err)=>{
      if(err) return next(err);
      else {
        req.flash("success","you are logged out!");
        res.redirect("/listings");
      }
    });
}