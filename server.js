const express = require('express');
const orm = require('./orm');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//=====================================================Joanna ==========================================
//posts user's registration information inside database
app.post("/api/registration", async function(req, res){
  console.log(req.body);
  // const storeUserInfo = await storeRegistrationInfo(req.body);
    // bcrypt.hash(req.body.user_password, saltRounds, function(err,hash){
    //   console.log(hash);
      // orm.registerUser({
      //     first_name:req.body.first_name,
      //     last_name:req.body.last_name,
      //     email_address:req.body.email_address,
      //     user_password:hash

      // }).then (function(data){
      //     console.log(hash);
      //     if (data){
      //         res.send('success!')
      //     }
      
      // })

  console.log( `[POST api/registration] recieved: `, req.body );
  let storeUserInfo = await orm.registrationSql(req.body);
  res.send({
    message: "Success!!!"
  });
})

//this is for the login page
app.post("/api/checkuser", async function(req, res){
    console.log(req.body)
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    const userData = await orm.loginUser(userEmail, userPassword);
    console.log(userData)
    // if( !userData ){
    // res.send( { error: 'Sorry unknown user or wrong password' } );
    // }
    res.send(userData);
   });

//posts user's basic dashboard info on database
app.post("/api/userInfo", async function(req, res){
  console.log("This is in the post basic function okiii")
  console.log(req.body);
  const postBasicInfo = await orm.postUsersInfo(req.body);
//   console.log( `[POST dashboard info] recieved: `, req.body );
  console.log("Basic Info Posted to Database");
  res.send('Text here!')
});

//retrieves user's basic dashboard info on database

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
  console.log( `get api/groupName/ ] recieved: `, req.params.id );
  const dashboardInfo = await orm.getDashboardInfo(req.params.id);
  res.send(dashboardInfo);
  
});

//----------------------Joanna ended ===========================//
//=============sara==============

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
  // console.log(membersList)
  res.send(membersList);
  
});
// `/api/groupName/${idx}`
app.get("/api/groupName/:id", async function(req, res){
  console.log( `get api/groupName/ ] recieved: `, req.params.id );
  const groupNameList = await orm.getGrpName(req.params.id);
  console.log(groupNameList)
  res.send(groupNameList);
  
});
app.get("/api/userProfile/:id", async function(req, res){
  console.log( `[/api/userProfile/] recieved: `, req.params.id );
  const userProfile = await orm.getUserProfile(req.params.id);
  console.log(userProfile)
  res.send(userProfile);
  
});

//==== for TOP 3 ON group dashboard
app.get("/api/top3List/:id", async function(req, res){
  console.log( `[/api/top3List/] recieved: `, req.params.id );
  const top3List = await orm.getTop3(req.params.id);
  console.log(top3List);
  res.send(top3List);
  
});

app.post( '/api/addNewMember', async function( req, res ){
  console.log( `POST api/addNewMember recieved: `, req.body );

  await orm.addNewMember( req.body );

  res.send( { message: `Thank you, saved ${req.body.memberName}` } );
  } );

app.post( '/api/newGroup', async function( req, res ){
  console.log( `POST api/newGroup recieved: `, req.body );

  await orm.addNewGroup( req.body );

  res.send( { message: `Thank you, saved group: ${req.body.groupName}` } );
} );

app.delete( '/api/deleteMember/:id/:name', async function( req, res ){
  console.log( `[Delete api/deleteMember/] recieved: `, req.body );
  await orm.deleteGrpMember( req.params.id, req.params.name );

  res.send( { message: `Thank you, deleted${req.params.id} ${req.params.name}`} );
} );

app.delete( '/api/deleteGroup/:id', async function( req, res ){

  try {
    console.log( `[Delete api/deleteGroup/] recieved: `, req.body );
  await orm.deleteGroup(req.params.id);

  res.send( { message: `Thank you, deleted group: ${req.params.id}`} );
  }
  catch(err) {
    res.send( { message: `Sorry, unable to delete group: ${req.params.id} ${req.params.name}. this may be because there are already members assigned to this group`} );
  }
  
} );


///==========sara ending dont delet below ============
//=====================================================Joanna ==========================================
app.post("/api/postGoal", async function(req, res){
  console.log(req.body);
  const postGoal = await orm.postGoalInfo(req.body);
  res.send("Success Posted Goal")
});

app.get("/api/getGoal", async function(req, res){
  const getGoal = await orm.getGoalInfo();
  console.log("GET GOAL SECTION")
  console.log(getGoal);
  res.send(getGoal);
});

app.put("/api/goalUpdate/:id", async function(req, res){
  console.log(req.params.id)
  const updateGoal = await orm.updateGoalStatus(req.params.id);

  res.send("Success!!")

});

//--------------------------------Norma's Code ----------------------------//

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


//--------------------------------Norma's Code Ended ----------------------------//



app.listen(PORT, function () {
  console.log(`[fitness_app] RUNNING, http://localhost:${PORT}`);
});




























































///======================================================= Joanna ended========================================================

//========================================================Sara start===========================================================

































































































///---------------------------------------Sara ended================================================================================
















































