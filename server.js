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
  res.send("Basic Info Posted to Database")
});

//retrieves user's basic dashboard info on database
// app.get("/api/userInfo", async function(){
//   const getBasicInfo = await orm.getUsersInfo();
//   res.send(getBasicInfo);
  
// });
app.get("/api/userInfo", async function(req, res){
  const getBasicInfo = await orm.getUsersInfo();
  console.log(getBasicInfo);
  res.send(getBasicInfo);
  
});
app.post("/api/fetchID", async function(req, res){
  const getId = await orm.getId(req.body);
  res.send(getId)
  
  // console.log(getBasicInfo);
  // res.send(getBasicInfo);
  
});

app.get("/api/dashboardInfo/:id", async function(req, res){
  console.log( `get api/groupName/ ] recieved: `, req.params.id );
  const dashboardInfo = await orm.getDashboardInfo(req.params.id);
  res.send(dashboardInfo);
  
});

//=============sara==============

app.get("/api/groupList", async function(req, res){
  const getGroupList = await orm.getGroupList();
  console.log(getGroupList)
  res.send(getGroupList);
  
});
app.get("/api/membersList/:id", async function(req, res){
  console.log( `[get api/membersList/ ] recieved: `, req.params.id );
  const membersList = await orm.getMembListForGrpId(req.params.id);
  console.log(membersList)
  res.send(membersList);
  
});
// `/api/groupName/${idx}`
app.get("/api/groupName/:id", async function(req, res){
  console.log( `get api/groupName/ ] recieved: `, req.params.id );
  const groupNameList = await orm.getGrpName(req.params.id);
  console.log(groupNameList)
  res.send(groupNameList);
  
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
  await orm.deleteMember( req.params.id, req.params.name );

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




// ===================================== Joanna=======================================================================





































































///======================================================= Joanna ended========================================================

//========================================================Sara start===========================================================

































































































///---------------------------------------Sara ended================================================================================
















































