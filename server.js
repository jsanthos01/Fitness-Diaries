const express = require('express');
const orm = require(   './orm');

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.post("/api/registration", async function(){
    const storeUserInfo = await storeRegistrationInfo(req.body);
    // bcrypt.hash(req.body.user_password, saltRounds, function(err,hash){
    //   console.log(hash);
    //   orm.registerUser({
    //       first_name:req.body.first_name,
    //       last_name:req.body.last_name,
    //       email_address:req.body.email_address,
    //       user_password:hash

    //   }).then (function(data){
    //       console.log(hash);
    //       if (data){
    //           res.send('success!')
    //       }
      
    //   })




  console.log( `[POST api/registration] recieved: `, req.body );
})



app.get("api/userInfo", async function(){
    const getBasicInfo = await getUsersInfo();
});
app.post("api/userInfo", async function(){
    const postBasicInfo = await postUsersInfo()
});
app.listen(PORT, function () {
  console.log(`[pictures] RUNNING, http://localhost:${PORT}`);
});


