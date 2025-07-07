const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Review =require("../models/review.js");
const Listing =require("../models/listing.js");
const { isLoggedIn, isOwner, isAuthor, saveRedirectUrl } = require("../middleware");
const reviewController = require("../controller/reviews.js");


const  validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
     let errmsg=error.details.map((el)=>el.message).join(',');
     throw new ExpressError(400,error);
    }else next();
  
  }

router
.route("/:rev_id")
.get(reviewController.getReviewbyid)
.delete(isLoggedIn,isAuthor,reviewController.destroyReview);

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReviewPost));
  
  

module.exports=router;