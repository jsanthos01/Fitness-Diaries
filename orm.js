const mysql = require("mysql");

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

// at top INIT DB connection
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234", //change 
    database: "fitness_diaries"
});

//store registration info 

async function registrationSql(myPost){
    const postUserLogin = await db.query( 
        "INSERT INTO login_credential(my_name,username,user_password) VALUES(?,?,?)",
        [ myPost.my_name, myPost.userName, myPost.user_password]);

    const storeUsersName = await db.query("INSERT INTO member_info(my_name, username) VALUES(?,?)", [myPost.my_name, myPost.userName]);
    return postUserLogin, storeUsersName;
}


//retrieve fullname of user 
async function getFullName(){
    const myResult = await db.query("SELECT my_name FROM member_name");
    return myResult 
}

async function postUsersInfo(myPost){
    const postMemberInfo = await db.query("INSERT INTO member_info(weight, height) VALUES(?,?) WHERE username=?", [ myPost.inputWeight, myPost.inputHeight, myPost.userName ]);
    return postMemberInfo;
}

async function getUsersInfo() {
    const myInfo = await db.query("SELECT weight, height, user_image FROM member_info");
    return myInfo
}
async function loginUser( email, password ) {
    let userFetch = await db.query('SELECT * FROM login_credential WHERE username=?', [ email ] );
    userFetch = JSON.stringify(userFetch); 
    userFetch = JSON.parse(userFetch); 
    
    console.log( `[loadUser] email='${email}' userFetch:`, userFetch );

    if( !userFetch ) {
       return false;
    }
    return userFetch[0]
}

//==============sara==========

async function getGroupList(){
    const GroupList = await db.query("SELECT * FROM new_group;");
    return GroupList;
}
async function  getMembListForGrpId( grpId ){
    const myResult = await db.query( 
        "SELECT * FROM member_info WHERE group_id_fk = ?",
        [ grpId ] );
        console.log(myResult);
    return myResult;
}
async function  getGrpName( grpNameId ){
    const myGrpName = await db.query( 
        "SELECT * FROM new_group WHERE group_id = ?",
        [ grpNameId ] );
        console.log(` in orm the value of myGrpName ` + myGrpName[0]);
    return myGrpName[0];
}
async function addNewMember( newMember ){
    const myNewMemberResult = await db.query( 
        "INSERT INTO member_info (member_name, email_id, group_id_fk) VALUES(?,?,?);",
        [ newMember.memberName, newMember.memberEmail, newMember.memberFrKey ] );
    return myNewMemberResult;
}
async function addNewGroup( newGroup ){
    const myNewGroupResult = await db.query( 
        "INSERT INTO new_group (group_name, group_imageUrl, group_goal) VALUES(?,?,?);",
        [ newGroup.groupName, newGroup.groupImageUrl, newGroup.groupGoal ] );
    return myNewGroupResult;
}
async function deleteMember( membId, memName ){
    const myDeletedMember = await db.query( 
        "DELETE FROM member_info WHERE member_id = ?",
        [ membId ] );
    return myDeletedMember;
}
async function deleteGroup( grId ){
    const myDeletedGroup = await db.query( 
        "DELETE FROM new_group WHERE group_id = ?",
        [ grId ] );
    return myDeletedGroup;
}


//===============sara dont delete above============

// //norma's code
// async function getUsersInfo(myId) {
//     const userInfo =await db.query("SELECT * FROM member_info WHERE id=?", [ myId ]);
//     return userInf0[0];   
// }

//query to fetch all user image to display
//whats the order of showing images

//------
//query to get group post
//get last 10 posts from the database
//get username, imag, timestamp
//----

//like button 

//query to get top 3 data 
//from weight table

//winners of last week, winners of last month






//-----------------

module.exports = {
    registrationSql,
    postUsersInfo,
    getUsersInfo,
    loginUser,
    getGroupList,
    getMembListForGrpId,
    getGrpName,
    addNewMember,
    addNewGroup,
    deleteMember,
    deleteGroup
}