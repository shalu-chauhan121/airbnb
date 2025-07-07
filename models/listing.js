const mongoose=require("mongoose");
const Review=require("./review.js");
const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
async function main(){
        await mongoose.connect(MONGO_URL);
}
main().then((res)=>{
    console.log("Connection is successful");
}).catch((err)=>{
    console.log(err);
}); 

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{ 
        type:String,
    },
    image: {
        // filename: {
        //     type: String,
        //     default: "listingimage"
        //   },
        // url: {
        //   type: String,
        //   default: "https://unsplash.com/photos/yellow-flowers-bloom-at-the-mountains-foot-TOKeCFmRtj4",
        //   set: (v) => v === "" ? "https://unsplash.com/photos/yellow-flowers-bloom-at-the-mountains-foot-TOKeCFmRtj4" : v,
        // }
        url:String,
        filename:String,
      },
      
    price:{
        type:Number, 
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing && listing.reviews && listing.reviews.length){
     let res=await Review.deleteMany({_id:{$in:listing.reviews}});
     console.log(res);
    }
    });
    

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;