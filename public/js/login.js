
async function loginBtn(){
console.log('clicked');
const userInfo = {
    userEmail : $("#userEmail").val(),
    userPassword :  $("#userPassword").val()
}

//login uses post to keep data secure
const checkUser = await $.post("/api/checkuser", userInfo);
console.log(checkUser.id);
console.log(checkUser.my_name);
if (checkUser.id){
    console.log('passwords match!')
    let userData = {
    userId: checkUser.id,
    my_name: checkUser.my_name,
    userName: checkUser.username
    } 

    localStorage.setItem("myUser", JSON.stringify(userData));
    console.log("local storage workeddd???")
    location.href = 'individual.html';
}else{
    alert("User not found");
}
}

$(document).ready( function(){
let userData = localStorage.getItem("myUser");
userData = JSON.parse(userData);
if( userData.userId )
location.href = '/individual.html';
});

function registerBtn(){
location.href = "registration.html";
}
