var express=require("express");
var router=express.Router();
var Campground =require("../models/campgrounds");
var Comment =require("../models/comment");
var middleware=require("../middleware");


//INDEX ROUTE    SHOW ALL CAMPGROUNDS
router.get("/",function(req,res){
    req.user;
    //get campgrounds from db
    Campground.find({},function(err,allCampgrounds){
       if(err) {
           console.log(err);
       }else{
           res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});


//CREATE ROUTE     ADD NEW CAMPGROUND TO DATABASE
router.post("/",middleware.isLoggedIn,function(req,res){
    //get data from form and save to database
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:name,price:price,image:image,description:desc,author:author}
    // create a new campground and save to database
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});


//NEW ROUTE     SHOW FORM FOR NEW CAMPGROUND TO DATABASE
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});


//SHOW ROUTE    SHOW DETAILS OF THE SELECTED ID ELEMENT
router.get("/:id",function(req,res){
    //find the campground with the required id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            if(!foundCampground){
                return res.status(400).send("item not found");
            }
            //render show template with that campground
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

//EDIT CAMPGROUND
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){
             if(!foundCampground){
                return res.status(400).send("item not found");
            }
            res.render("campgrounds/edit",{campground:foundCampground});
        });
});

//UPDATE CAMPGROUND
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds/"+req.params.id);
       }
    });
});

//DESTROY CAMPGROUND
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,deleteCampground){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds/");
       }
    });
});

//MIDDLEWARE


module.exports=router;
