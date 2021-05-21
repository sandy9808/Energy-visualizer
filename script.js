const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const mong = require("mongoose");
const app = express();

var path = require('path');
var sessiion = require('express-session');
var flush = require('connect-flash');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(sessiion({
  secret: 'secret',
  cookie: {maxAge : 60000},
  resave: false,
  saveUninitialized: false
}));

app.use(flush());

//
// mongoose.connect("mongodb://localhost:27017/login",{ useNewUrlParser: true });
//


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  first:String,
  last:String,
  email:String,
  contact:String,
  DOB:String,
  age:String,
  address:String,
  admin:Number,
});

const User = mongoose.model("User",userSchema);





// const user = new User({
    // username: "iib2019016",
    // password: "iiita123",
    // first: "Ashish",
    // last: "Tyagi",
    // email: "iib2019016@iiita.ac.in",
    // contact:"781xxxx50",
    // DOB:"04/16/2000",
    // age :"20",
    // address : "B-93, XYZ colong, ABC city",
    // admin:1,
// });
//
// user.save();



const userSchema2 = new mong.Schema({
  Datetime : String,
  AEP_MW : Number,
});

const User2 = mong.model("consumption",userSchema2);

// -------------------------------------------------------------------------------------------------------------
// login page

app.get("/",function(req,res){
  res.render("login",{message : req.flash('message')});
})

app.post("/",function(req,res){
 var userName = req.body.username;
 var passWord = req.body.password;
 console.log(userName);
 console.log(passWord);


 mongoose.connect("mongodb://localhost:27017/login",{poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});

  User.exists({username:userName,password:passWord},function (err, docs) {
    mongoose.connection.close();

    if (err){
        console.log(err);
    }
    else{
      if(docs==true){
        req.flash('message','Welcome '+ userName);
        // console.log("/home/" + userName + "." + 0);
        res.redirect("/home/" + userName);
        console.log("Accepted");
      }
      else{
        console.log("Rejected");
        req.flash('message','Wrong Username/Password');

        // alert('Wrong Username/Password');
        res.redirect("/");
      }
    }
});

})

//-------------------------------------------------------------------------------------------------------------
// signup page

app.get("/signup",function(req,res){
  res.render("signup",{message : req.flash('message')});

})

app.post("/signup",function(req,res){
  // console.log(req);
  var username = req.body.username;
  var first = req.body.first;
  var last = req.body.last;
  var email = req.body.email;
  var DOB = req.body.DOB;
  var contact = req.body.contact;
  var address = req.body.address;
  var password = req.body.password;

    mongoose.connect("mongodb://localhost:27017/login",{poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});
    var user = new User({username:username,first:first,last:last,email:email,contact:contact,address:address,password:password,DOB:DOB,admin:0});
    user.save();
    res.redirect("/home/"+username);

  });



    // user.save(function(err,result) {
    //   mongoose.connection.close();
    //
    //     if (err) {
    //       res.send(err);
    //     } else {
    //       // console.log(result);
    //       res.redirect("/profile/"+username);
    //     }
    //   });




//-------------------------------------------------------------------------------------------------
// home page

app.get('/home/:username',function(req,res){
  const {username} = req.params;
  // var val = req.params.value;

  // console.log(username);


  mongoose.connect("mongodb://localhost:27017/login",{poolSize: 10, bufferMaxEntries: 0,useNewUrlParser: true,useUnifiedTopology: true});

   User.exists({username:username,admin:0},function (err, docs) {
     mongoose.connection.close();

     if (err){
         console.log(err);
     }
     else{
       if(docs==true){
         res.render("home",{username:username,message : req.flash('message')});
         // console.log("First function call : ", docs);
       }
       else{
         res.render("homeadmin",{username:username,message : req.flash('message')});
       }
     }
 });

})


//----------------------------------------------------------------------------------------------
// profile page

app.get('/profile/:username',function(req,res){
  const {username} = req.params;
  var admin;

  // console.log(username);

  mongoose.connect("mongodb://localhost:27017/login",{poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});

  User.exists({username:username,admin:0},function (err2, docs2) {
    mongoose.connection.close();

    if (err2){
        console.log(err2);
    }
    else{
      if(docs2==true){
          admin=0;
      }
      else{
         admin=1;
      }
    }
 });



  User.find({username:username},function(err,docs){
    mongoose.connection.close();

    if (err){
        console.log(err);
    }
    else {
      if(admin==0)
      res.render("profile",{message : req.flash('message'),first:docs[0].first,username:docs[0].username,email:docs[0].email,last:docs[0].last,address:docs[0].address,DOB:docs[0].DOB,contact:docs[0].contact});
      else
      res.render("profileadmin",{message : req.flash('message'),first:docs[0].first,username:docs[0].username,email:docs[0].email,last:docs[0].last,address:docs[0].address,DOB:docs[0].DOB,contact:docs[0].contact});
    }
  })
})


//-----------------------------------------------------------------------------------------------
// view graphs portal

app.get("/view/:username",function(req,res){
  const {username} = req.params;

  var admin;

  // console.log(username);

  mongoose.connect("mongodb://localhost:27017/login",{poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});

  User.exists({username:username,admin:0},function (err2, docs2) {
    mongoose.connection.close();

    if (err2){
        console.log(err2);
    }
    else{
      if(docs2==true){
        res.render("graph",{username:username,message : req.flash('message')});
      }
      else{
           res.render("graphadmin",{username:username,message : req.flash('message')});
      }
    }
  });
})

app.post("/view/:username",function(req,res){
  // console.log(req);
  const {username} = req.params;
  var startDate = req.body.startDate,startTime = req.body.startTime,endDate = req.body.endDate,endTime = req.body.endTime,cost=req.body.cost;
   res.redirect("/barchart/"+startDate+"."+startTime+"."+endDate+"."+endTime+"."+username+"."+cost);
})


//------------------------------------------------------------------------------------------------------------
// graph show
app.get("/barchart/:startDate.:startTime.:endDate.:endTime.:username.:cost",function(req,res){
  var label=[],data=[];
   var username = req.params.username;
   var starttime = req.params.startTime;
   var endtime = req.params.endTime;
   var startdate = req.params.startDate;
   var enddate = req.params.endDate;
   var cost = req.params.cost;

  //  var admin;
  //
  //  mongoose.connect("mongodb://localhost:27017/login",{ useNewUrlParser: true });
  //
  //  User.exists({username:username,admin:0},function (err2, docs2) {
  //    mongoose.connection.close();
  //
  //    if (err2){
  //        console.log(err2);
  //    }
  //    else{
  //      if(docs2==true){
  //          admin=0;
  //      }
  //      else{
  //         admin=1;
  //      }
  //    }
  // });




   var start = "2005-" + startdate.substr(5,5) + " " + starttime.substr(0,2) + ":00:00";
   var end = "2005-" + enddate.substr(5,5) + " " + endtime.substr(0,2) + ":00:00";


   console.log(start);
   console.log(end);


   mong.connect("mongodb://localhost:27017/energy",{poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});



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

      cost = cost * sum;

      // if(admin==0)
      res.render("chart",{labels:label,data:data,sum:sum,maxa:maxa,mini:mini,username:username,cost:cost,message : req.flash('message')});
      // else
      // res.render("chartadmin",{labels:label,data:data,sum:sum,maxa:maxa,mini:mini,username:username,cost:cost});
     }
   })

})





//-----------------------------------------------------------------------------------------------------
// update raw data

app.get("/Update/:username",function(req,res){
  const {username} = req.params;

  res.render("updateadmin",{username:username,message : req.flash('message')});

})

app.post("/Update/:username",function(req,res){
  // console.log(req);
  const {username} = req.params;
  var startdate = req.body.Date;
  var starttime = req.body.Time;
  var value = req.body.Value;

  // console.log(starttime);
  // console.log(startdate);
  // console.log(value);

   var start = "2005-" + startdate.substr(5,5) + " " + starttime.substr(0,2) + ":00:00";

   mong.connect("mongodb://localhost:27017/energy",{poolSize: 10, bufferMaxEntries: 0,  useNewUrlParser: true,useUnifiedTopology: true});

User2.updateOne({Datetime:start}, {AEP_MW:value}, function(err,result) {
  mong.connection.close();

    if (err) {
      res.send(err);
    } else {
      console.log("Value Updated");
      req.flash('message','Value Updated');
      res.redirect("/Update/"+username);
    }
  });
})

// -----------------------------------------------------------------------------------------------------------------------
// edit profile

app.get("/editprofile/:username",function(req,res){
  const {username} = req.params;
  var admin;

  // console.log(username);

  mongoose.connect("mongodb://localhost:27017/login",{poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});

  User.exists({username:username,admin:0},function (err2, docs2) {
    mongoose.connection.close();

    if (err2){
        console.log(err2);
    }
    else{
      if(docs2==true){
          admin=0;
      }
      else{
         admin=1;
      }
    }
 });



  User.find({username:username},function(err,docs){
    mongoose.connection.close();

    if (err){
        console.log(err);
    }
    else {
      if(admin==0)
      res.render("edit",{message : req.flash('message'),first:docs[0].first,username:docs[0].username,email:docs[0].email,last:docs[0].last,address:docs[0].address,DOB:docs[0].DOB,contact:docs[0].contact});
      else
      res.render("editadmin",{message : req.flash('message'),first:docs[0].first,username:docs[0].username,email:docs[0].email,last:docs[0].last,address:docs[0].address,DOB:docs[0].DOB,contact:docs[0].contact});
    }
  })
})

app.post("/editprofile/:username",function(req,res){
  // console.log(req);
  const {username} = req.params;
  var first = req.body.first;
  var last = req.body.last;
  var email = req.body.email;
  var DOB = req.body.DOB;
  var contact = req.body.contact;
  var address = req.body.address;
  var password = req.body.password;

    mongoose.connect("mongodb://localhost:27017/login",{poolSize: 10, bufferMaxEntries: 0,  useNewUrlParser: true,useUnifiedTopology: true});

    User.updateOne({username:username},{first:first,last:last,email:email,contact:contact,address:address,password:password,DOB:DOB}, function(err,result) {
      mongoose.connection.close();

        if (err) {
          res.send(err);
        } else {
          console.log("Profile Updated");
          req.flash('message','Profile Updated');

          res.redirect("/profile/"+username);
        }
      });
})


//--------------------------------------------------------------------------------------
app.get("/RawView/:username",function(req,res){
  const {username} = req.params;

  mongoose.connect("mongodb://localhost:27017/login",{poolSize: 10, bufferMaxEntries: 0,  useNewUrlParser: true,useUnifiedTopology: true});

  User.exists({username:username,admin:0},function (err2, docs2) {
    mongoose.connection.close();

    if (err2){
        console.log(err2);
    }
    else{
      if(docs2==true){
        res.render("view_data",{username:username,message : req.flash('message')});
      }
      else{
           res.render("view_dataadmin",{username:username,message : req.flash('message')});
      }
    }
  });
})

app.post("/RawView/:username",function(req,res){
  // console.log(req);
  const {username} = req.params;
  var startdate = req.body.Date;
  var starttime = req.body.Time;
  console.log(username);
  console.log(startdate);
  console.log(starttime);

   var start = "2005-" + startdate.substr(5,5) + " " + starttime.substr(0,2) + ":00:00";

   mong.connect("mongodb://localhost:27017/energy",{poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});

User2.find({Datetime:start}, function(err,result) {
  mong.connection.close();

    if (err) {
      res.send(err);
    } else {
      console.log(result[0].AEP_MW);
      req.flash('message',"Value is " + result[0].AEP_MW);

      res.redirect("/RawView/"+username);
    }
  });
})









app.listen("3000",function(){
  console.log("SErver Started");
})
