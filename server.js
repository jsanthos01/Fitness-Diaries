const express = require('express');
const orm = require('./orm');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//posts user's registration information inside database
app.post("/api/registration", async function(req, res){
  console.log(req.body);
  let storeUserInfo = await orm.registrationSql(req.body);
  res.send({
    message: "Success!!!"
  });
})


//retrieves user's name from the database
app.get("/api/getName", async function(req,res) {
  const fullName = await orm.getFullName();
  console.log(fullName);
  res.send(fullName);
});

//posts user's basic dashboard info on database
app.post("/api/userInfo", async function(){
  console.log(req.body);
  const postBasicInfo = await orm.postUsersInfo(req.body);
  console.log( `[POST dashboard info] recieved: `, req.body );

});

//retrieves user's basic dashboard info on database
app.get("/api/userInfo", async function(){
  const getBasicInfo = await orm.getUsersInfo();
  res.send(getBasicInfo);
  
});



app.listen(PORT, function () {
  console.log(`[fitness_app] RUNNING, http://localhost:${PORT}`);
});




//norma's code
app.get("/api/user", async function (req, res) {
  const displayUserBase = await orm.fetchUserBase();
  res.send(displayUserBase);
});
