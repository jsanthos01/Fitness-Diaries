const express = require('express');
const orm = require('./orm');

const PORT = process.env.PORT || 8080;
const app = express();
const saltRounds = 10;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
const bcrypt = require ("bcrypt");


//=====================================================Joanna / norma bcrypt ==========================================
//posts user's registration information inside database
app.post("/api/registration", async function(req, res){
  console.log(req.body);
  bcrypt.hash(req.body.user_password, saltRounds, function(err,hash){
    console.log(hash);
    orm.registrationSql({
          my_name:req.body.my_name,
          userName:req.body.userName,
          user_password:hash

      }).then (function(data){
          console.log(hash);
          if (data){
              res.send('success!')
          }
      
      });
    }); 
  });
  // const saltRounds = 10;
  // const bcrypt = require ("bcrypt");
  //============================== norma bcrypt end works fine add require bcrypt & salt = 10 =============================
  // const storeUserInfo = await storeRegistrationInfo(req.body);
  // let storeUserInfo = await orm.registrationSql(req.body);//different line
    // bcrypt.hash(req.body.user_password, saltRounds, function(err,hash){
    //   console.log(hash);
      // orm.registerUser({
      //     my_name:req.body.my_name,
      //     userName:req.body.userName,
      //     user_password:hash

      // }).then (function(data){
      //     console.log(hash);
      //     if (data){
      //         res.send('success!')
      //     }
      
      // })

      //----------------obj---------------
      //my_name: $('#myName').val(),
      //userName: $('#userEmail').val(),
      //user_password: $('#userPassword').val()  
      //----------------------------end of obj delete--------------

  // console.log( `[POST api/registration] recieved: `, req.body );
  // let storeUserInfo = await orm.registrationSql(req.body);
  // res.send({
  //   message: "Success!!!"
  // });


//this is for the login page=====norma bcrypt==============
app.post("/api/checkuser", async function(req, res){
    // console.log(req.body)
    // const userEmail = req.body.userEmail;
    // const userPassword = req.body.userPassword;
    console.log(req.body.userPassword);
    const userData = await orm.loginUser(userEmail, userPassword);
    // console.log(`[POST ] recieved: `,userData);
    console.log(userData.user_password);
    bcrypt.compare(req.body.userPassword, userData.user_password, function (err, result) {
      if (result == true) {
        // console.log(result);
        res.send(userData);
    } else {
        console.log(result)
        res.send({ error: 'Sorry unknown user or wrong password' } );
    }
    });
    
  });
    
  

 //==========================norma bcrypt=================  

//posts user's basic dashboard info on database
app.post("/api/userInfo", async function(req, res){
  console.log("This is in the post basic function okiii")
  console.log(req.body);
  const postBasicInfo = await orm.postUsersInfo(req.body);
//   console.log( `[POST dashboard info] recieved: `, req.body );
  res.send("Basic Info Posted to Database")
});

//retrieves user's basic dashboard info on database
app.get("/api/userInfo", async function(req, res){
  const getBasicInfo = await orm.getUsersInfo();
  console.log(getBasicInfo);
  res.send(getBasicInfo);
  
});

//=====================================================Joanna ==========================================


app.listen(PORT, function () {
  console.log(`[fitness_app] RUNNING, http://localhost:${PORT}`);
});


//norma's code
// app.get("/api/user/:userid", async function (req, res) {
//   const userId = req.params.userid;
//   console.log('[GET /api/user/user]' + (`the user id is ${userId}`))
//   const displayUserInfo = await orm.getUsersInfo(userId);
//   console.log(displayUserInfo);
//   res.send(displayUserInfo);
// });

//app.get("/api/goal/", async function (req, res) {
  // let goal = [];
  // const groupGoal = await orm.groupGoal('SELECT member_info.my_weight FROM member_info');
  // for ( let i = 0; i < groupGoal.length; i++){
  //   goal.push(groupGoal[i].my_weight);
  //   console.log(goal);
  //   const sum = goal.reduce((total, amount) => total + amount);
  //   console.log(sum)
  // }

  // res.send(sum)
//----------------------------












































































































































































































// =================================== norma code============================
app.get("/api/profilepic", async function(req, res){
  const profilePicDb = await orm.profilePicDbQuery();
  // console.log("the server profile pic" + { profilePicDb });
  res.send(profilePicDb); 
});

app.post("/api/postinfo", async function(req, res){
  console.log("This is in the user post!")
  // console.log(req.body);
  const postUserInfo = await orm.postUserDbQuery(req.body);
//   console.log( `[POST dashboard info] recieved: `, req.body );
  // console.log(postUserInfo);
  res.send("success!")
}); 

app.get("/api/getposts", async function(req, res){
  const getPostDbQuery = await orm.getPostDbQueryFn();
  // console.log("the server response pic" + { getPostDbQuery });
  res.send(getPostDbQuery); 
});

app.get("/api/thumbsup/:id", async function(req, res){
  const changeThumbs = await orm.changeThumbsupNum(req.params.id);
  res.send(changeThumbs);
});