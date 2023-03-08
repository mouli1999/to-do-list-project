const express= require("express");
const bodyParser= require("body-parser");
var app= express();
app.set("view engine","ejs");
//app.use(express.static('/public/CSS'));
app.use("/public", express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));

const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/to_do");
const trySchema= new mongoose.Schema({
    name:String
});
const item = mongoose.model("task",trySchema)
// const todo =new item({
//     name: "something"
// });
// const todo2 =new item({
//     name: "something task"
// });
// const todo3 =new item({
//     name: "something task1"
// });
// const todo4 =new item({
//     name: "something task 2"
// });
// todo2.save();
// todo3.save();
// todo4.save();
app.get("/listItems", (req, res)=>{
    item.find({})
     .then(function(foundItems) 
      {res.render("list",{ dayej : foundItems})
    }) 
      .catch(function(err){
       console.log(err)
    });
}); 
app.post("/create",(req,res)=>{
const itemName= req.body.ele1;
const todo4 = new item ({
    name : itemName
});
todo4.save();
res.redirect("/listItems");
});
// app.post("/delete", (req,res)=>{
//     const deleteItem =req.body.ele2;
//      item.findByIdAndDelete({
//         dayej: deleteItem
//     });
//     res.redirect("/listItems");
// });

app.post("/delete",async(req,res)=>{
try{
 await item.findByIdAndDelete(req.body.checkbox1);
res.redirect("/listitems");
}
    catch{
    res.send(err)
}
});

app.listen("502",function(){
    console.log("server is running");
});
// app.post("/delete",async(req,res)=>{

//     const result = await item.findByIdAndDelete({_id: new mongodb.ObjectId(req.body.checkbox1)});
//    req.send(result);
//    res.redirect("/listitems");})

    