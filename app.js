var express= require ("express"),
    app=express(),
    bodyparser=require("body-parser"),
    mongoose=require("mongoose"),
    flash=require("connect-flash"),
    passport=require("passport"),
    passportLocal=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    LocalStrategy=require("passport-local"),
    Campground=require("./models/campgrounds"),
    seedDB=require("./seeds"),
    Comment=require("./models/comment"),
    methodOverride=require("method-override"),
    User=require("./models/user");
    
var commentRoutes=require("./routes/comments"),
    authRoutes=require("./routes/index"),
    campgroundRoutes=require("./routes/campgrounds");
    
var url=process.env.DATABASEURL||"mongodb://localhost/yelpcampv12";
mongoose.connect(url);
// mongoose.connect("mongodb://localhost/yelpcampv12");
// mongoose.connect("mongodb://rohit:rohit@ds135926.mlab.com:35926/yelpcamp");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seed the database
//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"amal is the cutest dog",
    resave:false,
    saveUnitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("yelpcamp server has started"); 
});