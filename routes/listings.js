const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
const listingController=require("../controller/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");

const upload = multer({storage });


// router.get("/",(req,res)=>{
//     res.send("Hi,I am root");
// });

const  validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
     let errmsg=error.details.map((el)=>el.message).join(',');
     throw new ExpressError(400,error);
    }else next();
      
}



router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing,wrapAsync(listingController.postnewListing)); 
// .post(upload.single('listing[image]'),(req,res)=>{
//   res.send(req.file.path);
//   // console.log(JSON.stringify(req.file,null,2));
//   console.log(req.file.path); 
// });



router.get("/new",isLoggedIn,listingController.createnewListing);
  
router
.route("/:id")
.get(wrapAsync(listingController.getListingById))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.putEdit));
  
  
  
  router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));
  
  
 router.delete("/:id/delete",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports=router;