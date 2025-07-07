const express=require("express");
const Review =require("../models/review.js");
const Listing=require("../models/listing.js");
const reviewController=require("../controller/listings.js");

module.exports.getReviewbyid=(req,res)=>{
    let {id,rev_id}=req.params;
    res.redirect(`http://localhost:8080/listings/${id}`);
  }

module.exports.createReviewPost=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("review saved");
    req.flash("success","New review added");
    res.redirect(`/listings/${listing._id}`);
  }

module.exports.destroyReview= async (req,res)=>{
    let {id,rev_id}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:rev_id}});
    await Review.findByIdAndDelete(rev_id);
    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
    }