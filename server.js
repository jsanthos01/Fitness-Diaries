const express = require('express');
const orm = require('./orm');
const PORT = process.env.PORT || 8080;
const app = express();
<<<<<<< HEAD
const saltRounds = 10;
=======

//used for bcryption of password 
const bcrypt = require ("bcrypt");
const saltRounds = 10;

>>>>>>> master
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
const bcrypt = require ("bcrypt");

<<<<<<< HEAD

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
=======
//posts user's registration information inside database
app.post("/api/registration", async function(req, res){
  console.log(req.body);
  
  bcrypt.hash(req.body.user_password, saltRounds, function(err, hash){
    console.log(hash);
    orm.registrationSql({
      my_name:req.body.my_name,
      userName:req.body.userName,
      user_password:hash
    }).then ( function(data){
      console.log(hash);
      if (data){
        res.send({
          message: "Success!!!"
        })
      }
    });
  })

})

//checks the validation of user - if they exist in db or not
app.post("/api/checkuser", async function(req, res){
  console.log(req.body)
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const userData = await orm.loginUser(userEmail, userPassword);
  console.log(userData)
  
  if(!userData){
    res.send( { error: 'Sorry unknown user or wrong password' } );
  }
  res.send(userData);
});

//posts user's basic dashboard info on database (ADD INFO)
>>>>>>> master
app.post("/api/userInfo", async function(req, res){
  console.log(req.body);
  const postBasicInfo = await orm.postUsersInfo(req.body);
  res.send('Text here!');
});


//retrieves user's basic dashboard info to display in individual page 
app.get("/api/userInfo", async function(req, res){
  const getBasicInfo = await orm.getUsersInfo();
  console.log(getBasicInfo);
  res.send(getBasicInfo);
});

app.post("/api/fetchID", async function(req, res){
  const getId = await orm.getId(req.body);
  res.send(getId);
});


app.get("/api/dashboardInfo/:id", async function(req, res){
  console.log( `get api/dashboardInfo/ ] recieved: `, req.params.id );
  const dashboardInfo = await orm.getDashboardInfo(req.params.id);
  res.send(dashboardInfo);
});

app.get("/api/getAllRegisteredMembersList", async function(req, res){
  const registeredMemberList = await orm.getAllRegisMember();
  console.log(registeredMemberList)
  res.send(registeredMemberList);
});

app.get("/api/groupList", async function(req, res){
  const getGroupList = await orm.getGroupList();
  console.log(getGroupList)
  res.send(getGroupList);
  
});

app.get("/api/membersList/:id", async function(req, res){
  console.log( `[get api/membersList/ ] recieved: `, req.params.id );
  const membersList = await orm.getMembListForGrpId(req.params.id);
  res.send(membersList);
  
});

app.get("/api/groupName/:id", async function(req, res){
  console.log( `get api/groupName/ ] recieved: `, req.params.id );
  const groupNameList = await orm.getGrpName(req.params.id);
  console.log(groupNameList)
  res.send(groupNameList);
});


app.get("/api/groupInfo/:id", async function(req, res){
  console.log( `get api/groupInfo/ ] recieved: `, req.params.id );
  const groupInfo = await orm.getGrpInfo(req.params.id);
  res.send(groupInfo);
});
 

app.get("/api/userProfile/:id", async function(req, res){
  console.log( `[/api/userProfile/] recieved: `, req.params.id );
  const userProfile = await orm.getUserProfile(req.params.id);
  console.log(userProfile)
  res.send(userProfile);
  
});

//TOP 3 USERS 
app.get("/api/top3List/:id", async function(req, res){
  console.log( `[/api/top3List/] recieved: `, req.params.id );
  const top3List = await orm.getTop3(req.params.id);
  console.log(top3List);
  res.send(top3List);
});

//Addition of Member in Group
app.post( '/api/addNewMember', async function( req, res ){
  console.log( `POST api/addNewMember recieved: `, req.body );
  await orm.addNewMember( req.body );
  res.send( { message: `Thank you, saved ${req.body.memberName}` } );
});

//Posting New groups info in db
app.post( '/api/newGroup', async function( req, res ){
  console.log( `POST api/newGroup recieved: `, req.body );
  await orm.addNewGroup( req.body );
  res.send( { message: `Thank you, saved group: ${req.body.groupName}` } );
});

// delete group member option
app.delete( '/api/deleteMember/:id/:name', async function( req, res ){
  console.log( `[Delete api/deleteMember/] recieved: `, req.body );
  await orm.deleteGrpMember( req.params.id, req.params.name );
  res.send( { message: `Thank you, deleted${req.params.id} ${req.params.name}`} );
});

//delete group option
app.delete( '/api/deleteGroup/:id', async function( req, res ){
  try {
    console.log( `[Delete api/deleteGroup/] recieved: `, req.body );
    await orm.deleteGroup(req.params.id);
    res.send( { message: `Thank you, deleted group: ${req.params.id}`} );
  }
  catch(err) {
    res.send( { message: `Sorry, unable to delete group: ${req.params.id} ${req.params.name}. this may be because there are already members assigned to this group`} );
  }
  
});

//showcases individual's completed goal 
app.get("/api/getCompletedGoal", async function(req, res){
  const getCompletedGoal = await orm.getCompletedGoal();
  console.log( 'completed goal is ' + getCompletedGoal);
  res.send(getCompletedGoal);
});

//showcases other user's completed goal 
app.get("/api/getCompletedGoalOthers/:id", async function(req, res){
  const getCompletedOthersGoal = await orm.getCompletedOthersGoal(req.params.id);
  console.log( 'completed goal is ' + getCompletedOthersGoal);
  res.send(getCompletedOthersGoal);
});


app.post("/api/postGoal", async function(req, res){
  console.log(req.body);
  const postGoal = await orm.postGoalInfo(req.body);
  res.send("Success Posted Goal")
});


app.get("/api/getGoal/:id", async function(req, res){
  const getOthersGoal = await orm.getOthersGoalInfo(req.params.id);
  console.log('getOthersGoal is :' + getOthersGoal);
  res.send(getOthersGoal);
});

app.put("/api/goalUpdate/:id", async function(req, res){
  console.log(req.params.id)
  const updateGoal = await orm.updateGoalStatus(req.params.id);
  res.send("Success!!")

});

// GROUP DASHBOARD
app.get("/api/profilepic", async function(req, res){
  const profilePicDb = await orm.profilePicDbQuery();
  res.send(profilePicDb); 
});

app.post("/api/postinfo", async function(req, res){
  console.log("This is in the user post!")
  const postUserInfo = await orm.postUserDbQuery(req.body);
  res.send("success!")
});

app.post("/api/postComment", async function(req, res){
  console.log("This is in the user comments!")
  const postComment = await orm.postComment(req.body);
  res.send("success!")
});

app.get("/api/getComment/:id", async function(req, res){
  const getComment = await orm.getComment(req.params.id);
  res.send(getComment); 
});

app.get("/api/getCommentsNmb/:id", async function(req, res){
  const getCommentNum = await orm.getCommentNum(req.params.id);
  res.send(getCommentNum); 
});

app.get("/api/getposts/:id", async function(req, res){
  const getPostDbQuery = await orm.getPostDbQueryFn(req.params.id);
  res.send(getPostDbQuery); 
});

app.get("/api/thumbsup/:id", async function(req, res){
  const changeThumbs = await orm.changeThumbsupNum(req.params.id);
  res.send(changeThumbs);
});



<<<<<<< HEAD









































































































































































































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
=======
app.listen(PORT, function () {
  console.log(`[fitness_app] RUNNING, http://localhost:${PORT}`);
});
>>>>>>> master
