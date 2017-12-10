var Campground=require("../models/campgrounds");
var Comment=require("../models/comment");

var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
            
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("error","campground not found");
                res.redirect("back");
            }else{
                if(!foundCampground){
                    req.flash("error","item not found");
                    return res.redirect("back");
                }
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","you dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","you need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                 res.redirect("back");
            }else{
                
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                    }else{
                        req.flash("error","you dont have permission to do that");
                        res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","you need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","you need to be logged in to do that");
    res.redirect("/login");
}


module.exports=middlewareObj;