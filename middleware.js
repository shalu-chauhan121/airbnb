const Listing=require("./models/listing");
const Review=require("./models/review");


module.exports.isLoggedIn= function(req,res,next){
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you ,must be logged in");
       return res.redirect("http://localhost:8080/user/login");
    }
     next();
}
module.exports.saveRedirectUrl=function(req,res,next){
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        // console.log( "url",res.locals.redirectUrl);
    }
    next();
}
module.exports.isOwner= async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","you are not the owner of the listing");
      return res.redirect(`/listings/${id}`);
    } next();
}

module.exports.isAuthor= async(req,res,next)=>{
    let {id,rev_id}=req.params;
    let review=await Review.findById(rev_id);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","you are not the author of the review");
      return res.redirect(`/listings/${id}`);
    } next();
}
