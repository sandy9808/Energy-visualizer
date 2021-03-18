const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');


const app = express();

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb://localhost:27017/login",{ useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  first:String,
  last:String,
  email:String,
});

const User = mongoose.model("User",userSchema);

// const user = new User({
//     username: "iib2019005",
//     password: "iiita123",
//     first: "Sandeep",
//     last: "Kumar",
//     email: "iib2019005@iiita.ac.in"
// });
//
// user.save();

app.get("/",function(req,res){
  res.sendFile(__dirname + "/login.html");
})

app.get('/profile/:username',function(req,res){
  const {username} = req.params;
  console.log(username);

  User.find({username:username},function(err,docs){
    if (err){
        console.log(err);
    }
    else {
      res.render("profile",{first:docs[0].first,username:docs[0].username,email:docs[0].email,last:docs[0].last});
    }
  })

})

app.post("/",function(req,res){
 var userName = req.body.username;
 var passWord = req.body.password;
 console.log(userName);
 console.log(passWord);

  User.exists({username:userName,password:passWord},function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
      if(docs==true){
        res.redirect("/profile/"+userName);
        console.log("First function call : ", docs);
      }
      else{
      res.status(400);
       res.send('Current password does not match');
      }
    }
});
})

app.listen("3000",function(){
  console.log("SErver Started");
})
