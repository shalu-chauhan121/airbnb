const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

let port=3000;

const sessionOptions=session({
    secret:"mySuperSecretString",
    resave:false,
    saveUninitialized:true,
})


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(sessionOptions);
app.use(flash());

app.use("/users",users);
app.use("/posts",posts);
app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next();
});


app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    console.log(req.session.name);
    if(name==="anonymous"){
        req.flash("error","user not registerd");
    }else {
    req.flash("success","user registered successfully");
}
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
  //  res.send(`hello, ${req.session.name}`);
//    console.log(req.flash("success"));
   res.render("page.ejs",{name:req.session.name});
});




// app.get("/request",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else 
//     req.session.count=1;   
//     res.send(`you sent a req ${req.session.count} times`);
//     console.log("req count");
// });

app.get("/test",(req,res)=>{
    res.send("test successful");
});
app.listen(port,(req,res)=>{
    console.log("server is working");
});

