if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}



      
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate"); 
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");




app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method")); 
app.use(express.urlencoded({extended:true}));



const sessionOptions=session({
  secret:"secretString",
  resave:false,
  // saveUninitialized:true,
  saveUninitialized:false,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
});

app.use(flash());
app.use(sessionOptions);

app.use(passport.initialize());
app.use(passport.session());

// console.log("user keys", Object.keys(User));

passport.use(new LocalStrategy(User.authenticate())); 


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});

app.get("/demouser",async (req,res)=>{
  let fakeUser=new User({
    email:"delta@gmail.com",
    username:"delta-student"
  });
 let registeredUser=await User.register(fakeUser,"mypass");
 res.send(registeredUser);
 console.log(registeredUser);
});
 


const listings=require("./routes/listings.js"); 
const reviews=require("./routes/reviews.js");
const userRouter=require("./routes/userRouter.js");

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
 

async function main(){
        await mongoose.connect(MONGO_URL);
}


main().then((res)=>{
    console.log("Connection is successful");
}).catch((err)=>{ 
    console.log(err);
}); 
let port=8080;
 app.listen(port,(req,res)=>{
   // res.send("Working!!");
    console.log("server is working");
 });


// app.get("/",(req,res)=>{
//   res.send("Hi,I am root");
// });


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/user",userRouter);


app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong"}=err;

// res.status(statusCode).send(message);
res.status(statusCode).render("error", {message});
});  