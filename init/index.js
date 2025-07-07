const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
async function main(){
        await mongoose.connect(MONGO_URL);
}
main().then((res)=>{
    console.log("Connection is successful");
}).catch((err)=>{
    console.log(err);
}); 

const initDB=async()=>{
    await Listing.deleteMany({});
   const listingwithOwner= initdata.data.map((obj)=>({...obj,owner:'68657a17fc6e2df5340f30f4'}));
    await Listing.insertMany(listingwithOwner);
    console.log("data was initialized");
};
initDB();