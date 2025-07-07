const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {isLoggedIn,saveRedirectUrl}=require("../middleware.js");
const userController=require("../controller/users.js");
const user = require("../models/user.js");



router.get("/signUp",userController.signupUser);

router.post("/signUp",wrapAsync(userController.signupPostuser)
);
router
.route("/login")
.get(userController.loginUser)
.post(saveRedirectUrl,passport.authenticate("local",
    {failureRedirect:"/login",failureFlash:true}),
   userController.loginPostuser);

router.get("/logout",userController.logoutUser);

module.exports=router;