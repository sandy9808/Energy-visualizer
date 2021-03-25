const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const mong = require("mongoose");
const app = express();

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//
// mongoose.connect("mongodb://localhost:27017/login",{ useNewUrlParser: true });
//
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  first:String,
  last:String,
  email:String,
});

const User = mongoose.model("User",userSchema);

const userSchema2 = new mong.Schema({
  Datetime : String,
  AEP_MW : Number,
});

const User2 = mong.model("consumption",userSchema2);






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

app.post("/",function(req,res){
 var userName = req.body.username;
 var passWord = req.body.password;
 console.log(userName);
 console.log(passWord);


 mongoose.connect("mongodb://localhost:27017/login",{ useNewUrlParser: true });

  User.exists({username:userName,password:passWord},function (err, docs) {
    mongoose.connection.close();

    if (err){
        console.log(err);
    }
    else{
      if(docs==true){
        res.redirect("/home/"+userName);
        console.log("First function call : ", docs);
      }
      else{
      res.status(400);
       res.send('Current password does not match');
      }
    }
});

})

app.get('/home/:username',function(req,res){
  const {username} = req.params;
  res.render("home",{username:username});
})

app.get('/profile/:username',function(req,res){
  const {username} = req.params;
  console.log(username);

  mongoose.connect("mongodb://localhost:27017/login",{ useNewUrlParser: true });


  User.find({username:username},function(err,docs){
    mongoose.connection.close();

    if (err){
        console.log(err);
    }
    else {
      res.render("profile",{first:docs[0].first,username:docs[0].username,email:docs[0].email,last:docs[0].last});
    }
  })



})

app.get("/view/:username",function(req,res){
  const {username} = req.params;
  res.render("graph",{username:username});
})

app.post("/view/:username",function(req,res){
  var username = req.params.username;
  var startDate = req.body.startDate,startTime = req.body.startTime,endDate = req.body.endDate,endTime = req.body.endTime;
   res.redirect("/barchart/"+startDate+"."+startTime+"."+endDate+"."+endTime+"."+username);
})


app.get("/barchart/:startDate.:startTime.:endDate.:endTime.:username",function(req,res){
  var label=[],data=[];
   var username = req.params.username;
   var starttime = req.params.startTime;
   var endtime = req.params.endTime;
   var startdate = req.params.startDate;
   var enddate = req.params.endDate;

   var start = "2005-" + startdate.substr(5,5) + " " + starttime.substr(0,2) + ":00:00";
   var end = "2005-" + enddate.substr(5,5) + " " + endtime.substr(0,2) + ":00:00";


   console.log(start);
   console.log(end);


   mong.connect("mongodb://localhost:27017/energy",{ useNewUrlParser: true });





  User2.find({Datetime:{$gt:start,$lte:end}},function(err,docs){
    mong.connection.close();

     if (err){
         console.log(err);
     }
     else {
       console.log(docs);
       var sum = 0,maxa=0,mini=-1;
       docs.forEach(myFunction);

      function myFunction(item) {
        label.push(item.Datetime[11]+item.Datetime[12]);
        sum += item.AEP_MW;

        if(maxa<item.AEP_MW)maxa=item.AEP_MW;

        if(mini==-1 || mini>item.AEP_MW)mini=item.AEP_MW;

       data.push(item.AEP_MW);
      }

      res.render("chart",{labels:label,data:data,sum:sum,maxa:maxa,mini:mini,username:username});

     }
   })

})



app.listen("3000",function(){
  console.log("SErver Started");
})
