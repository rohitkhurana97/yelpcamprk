var mongoose=require("mongoose");
var Campground=require("./models/campgrounds");
var Comment=require("./models/comment");

var data=[
    {
        name:"clouds rest",
        image:" https://www-redrow-co-uk.azureedge.net/fe/v2/dist/images/homepage/36588.jpg",
        description:"Las Meninas is a 1656 painting in the Museo del Prado in Madrid, by Diego Velázquez, the leading artist of the Spanish Golden Age. It shows a large room in the Royal Alcázar  of Madrid during the reign of King Philip IV of Spain, and presents several figures, including the young Infanta Margaret Theresa surrounded by her entourage.  Las Meninas has been recognised as one of the most important paintings in Western art history, and its complex and enigmatic composition has frequently been the subject of analysis.It has been described as Velázquez's supreme achievement, a highly self-conscious, calculated demonstration of what painting could achieve, and perhaps the most searching  comment ever made on the possibilities of the easel painting"   
        },
    {
        name:"donut rest",
        image:" http://www.atlocation.com/wp-content/uploads/2015/05/mediterraneanlakehouse33_03-720x720.jpg",
        description:"Las Meninas is a 1656 painting in the Museo del Prado in Madrid, by Diego Velázquez, the leading artist of the Spanish Golden Age. It shows a large room in the Royal Alcázar  of Madrid during the reign of King Philip IV of Spain, and presents several figures, including the young Infanta Margaret Theresa surrounded by her entourage.  Las Meninas has been recognised as one of the most important paintings in Western art history, and its complex and enigmatic composition has frequently been the subject of analysis.It has been described as Velázquez's supreme achievement, a highly self-conscious, calculated demonstration of what painting could achieve, and perhaps the most searching  comment ever made on the possibilities of the easel painting"   
    },
    {
        name:"pizza rest",
        image:" http://klosteria.com/wp-content/uploads/2017/11/exterior-house-4-5a02f13584f68.jpg",
        description:"Las Meninas is a 1656 painting in the Museo del Prado in Madrid, by Diego Velázquez, the leading artist of the Spanish Golden Age. It shows a large room in the Royal Alcázar  of Madrid during the reign of King Philip IV of Spain, and presents several figures, including the young Infanta Margaret Theresa surrounded by her entourage.  Las Meninas has been recognised as one of the most important paintings in Western art history, and its complex and enigmatic composition has frequently been the subject of analysis.It has been described as Velázquez's supreme achievement, a highly self-conscious, calculated demonstration of what painting could achieve, and perhaps the most searching  comment ever made on the possibilities of the easel painting"   
    }
]

function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
      console.log("removed campgrounds");
      //ADD NEW CAMPGROUNDS
      data.forEach(function(seed){
          Campground.create(seed,function(err,campground){
              if(err){
                  console.log(err);
              }else{
                  console.log("added a campground");
                  //CREATE COMMENT
                  Comment.create(
                      {
                            text:"this place is great",
                            author:"Homer"
                      },function(err,comment){
                          if(err){
                              console.log(err);
                          }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                          }
                      });
              }
          });
      });
    });
}

module.exports=seedDB;