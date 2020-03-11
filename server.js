const express = require('express');
const orm = require(   './orm');

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//posts user's registration information inside database
app.post("/api/registration", async function(req, res){
  console.log(req.body);
  const storeUserInfo = await storeRegistrationInfo(req.body);
  //   // bcrypt.hash(req.body.user_password, saltRounds, function(err,hash){
  //   //   console.log(hash);
  //   //   orm.registerUser({
  //   //       first_name:req.body.first_name,
  //   //       last_name:req.body.last_name,
  //   //       email_address:req.body.email_address,
  //   //       user_password:hash

  //   //   }).then (function(data){
  //   //       console.log(hash);
  //   //       if (data){
  //   //           res.send('success!')
  //   //       }
      
  //   //   })

  console.log( `[POST api/registration] recieved: `, req.body );
})

// //retrieves user's name from the database
// app.get("/api/getUsersName", async function(req,res) {
//   const fullName = await getFullName();
//   console.log(fullName);
//   res.send(fullName);
// });
// //posts user's basic dashboard info on database
// app.post("api/userInfo", async function(){
//   const postBasicInfo = await postUsersInfo();

// });

// //retrieves user's basic dashboard info on database
// app.get("api/userInfo", async function(){
//     const getBasicInfo = await getUsersInfo();
// });








//norma's code
app.get("/api/user/:userid", async function (req, res) {
  const userId = req.params.userid;
  console.log('[GET /api/user/user]' + (`the user id is ${userId}`))
  const displayUserInfo = await orm.getUsersInfo(userId);
  console.log(displayUserInfo);
  res.send(displayUserInfo);
});

//app.get("/api/goal/", async function (req, res) {
  let goal = [];
  const groupGoal = await orm.groupGoal('SELECT member_info.my_weight FROM member_info');
  for ( let i = 0; i < groupGoal.length; i++){
    goal.push(groupGoal[i].my_weight);
    console.log(goal);
    const sum = goal.reduce((total, amount) => total + amount);
    console.log(sum)
  }

  res.send(sum)
//----------------------------




app.listen(PORT, function () {
  console.log(`[pictures] RUNNING, http://localhost:${PORT}`);
});