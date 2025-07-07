
const Listing =require("../models/listing.js");
// const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
// const mbxClient = require('@mapbox/mapbox-sdk');
// console.log("maptoken",mapToken);
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });
// const geocodingService = mbxGeocoding(baseClient);



module.exports.index=async(req,res)=>{
    let listings = await Listing.find();
    res.render("listings/index.ejs",{listings});
    console.log("titles displayed");
  }

module.exports.createnewListing= (req,res)=>{
    console.log(req.user);
    res.render("listings/new.ejs");
  }


module.exports.getListingById=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({
      path:"reviews",
      populate:{
        path:"author",
      },
    }).populate("owner");
    if(!listing){
      req.flash("error","The listing you requested for does  not exist !!!");
      res.redirect("/listings");
    }
    else 
     res.render("listings/show.ejs",{listing});
     console.log(listing);
  }


module.exports.postnewListing=async (req,res)=>{
  
    // if (req.body.listing.image && req.body.listing.image.url === "") {
    //   req.body.listing.image.filename="listingimage",
    //   req.body.listing.image.url = "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";  // fallback
    // }
    //  console.log("response");
    //  res.send("response");
  //  let response=await geocodingClient.forwardGeocode({
  //     query: "New Delhi, India",
  //     limit: 1,
  //   })
  //     .send();
  //    console.log(response);
  //    res.send("done!");
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"  ",filename);
    let newListing=new Listing(req.body.listing);
    newListing.image={url,filename};
    console.log(req.body.listing);
    console.log(newListing);
    newListing.owner=req.user._id;
   await newListing.save();
   req.flash("success","New listing Created");
   res.redirect("/listings");
  //  console.log(req.file);
   console.log(req.file.path);
   console.log(req.file.filename);
  }

module.exports.editListing=async (req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    let originalUrl=listing.image.url;
   originalUrl=originalUrl.replace("/upload","/upload/h_300,w_250");   
    if(!listing){
      req.flash("error","The listing you requested for does not exist !!!");
      res.redirect("/listings");
    }
    else 
    res.render("listings/edit.ejs",{listing,originalUrl});
    console.log(listing);
  }

module.exports.putEdit=async(req,res)=>{
    let {id}=req.params;
    
    // let listing=await Listing.findById(id);
   
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
   
   if(typeof req.file!=="undefined"){
     console.log(req.file.path,"-------",req.file.filename);
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image=({url,filename});
      await listing.save();
    }
 
    if(!listing){
      req.flash("error","The listing you requested for does not exist !!!");
      res.redirect("/listings");
    }
    else {
      req.flash("success","listing updated");
      res.redirect(`/listings/${id}`);
    }
  
    console.log(listing); 
  }

module.exports.deleteListing=async (req,res)=>{
    let {id}=req.params;
   let deletedListing=await Listing.findByIdAndDelete(id);
   req.flash("success","listing deleted");
   res.redirect("/listings");
   console.log(deletedListing);
   console.log("Deleted!!");
   
  }