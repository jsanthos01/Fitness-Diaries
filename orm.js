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

var db;
if(process.env.JAWSDB_URL){
     db = new Database(process.env.JAWSDB_URL);
     console.log('jaws db is connected');
}else{
     db = new Database({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "bootcamp2020", //change 
        database: "fitness_diaries"
    });
};

//store registration info 
async function registrationSql(myPost){
    console.log(myPost);
    const postUserLogin = await db.query( 
        "INSERT INTO login_credential(my_name,username,user_password) VALUES(?,?,?)",
        [ myPost.my_name, myPost.userName, myPost.user_password]);

    const storeUsersName = await db.query("INSERT INTO personal_info(my_name, username) VALUES(?,?)", [myPost.my_name, myPost.userName]);
    return postUserLogin, storeUsersName;
}


//retrieve fullname of user 
async function postUsersInfo(myPost){
    console.log("This is for the sql posting section");
    console.log(myPost.userName);
    const postMemberInfo = await db.query("UPDATE personal_info SET my_weight=?, height=?, goal=?, BMI=? WHERE username=?", [ myPost.inputWeight, myPost.inputHeight, myPost.inputGoal, myPost.bmi, myPost.userName]);
    // const postMemberInfo = await db.query("INSERT INTO personal_info(my_weight, height, goal) VALUES(?,?,?) WHERE username=?", [ myPost.inputWeight, myPost.inputHeight, myPost.inputGoal, myPost.userName]);
    return postMemberInfo;
}

async function getUsersInfo() {
    console.log("This is for the sql get section");

    let myInfo = await db.query("SELECT my_weight, height, goal, BMI FROM personal_info");
    myInfo = JSON.stringify(myInfo); 
    myInfo = JSON.parse(myInfo); 
    return myInfo[0];
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

async function getAllRegisMember(){
    const regisMembList = await db.query("SELECT * FROM personal_info;");
    return regisMembList;
}
async function getGroupList(){
    const GroupList = await db.query("SELECT * FROM new_group;");
    return GroupList;
}
async function  getMembListForGrpId( grpId ){
    const myResult = await db.query( 
        "SELECT new_group.group_name,new_group.group_id,personal_info.id,personal_info.user_img, personal_info.username, personal_info.my_name, personal_info.my_weight, personal_info.height, personal_info.BMI, personal_info.diet, group_member.grp_mbr_id FROM new_group, personal_info, group_member WHERE new_group.group_id=group_member.group_id_fk AND personal_info.id=group_member.member_id_frk AND new_group.group_id = ? ;",
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

async function  getUserProfile( userId ){
    const userProfile = await db.query( 
        "SELECT * FROM personal_info WHERE id = ?",
        [ userId ] );
        console.log(` in orm the value of myGrpName ` + userProfile[0]);
    return userProfile[0];
}
async function addNewMember( newMember ){
    const myNewMemberResult = await db.query( 
        "INSERT INTO group_member (member_name, member_id_frk, group_id_fk) VALUES(?,?,?);",
        [ newMember.memberName, newMember.memberId, newMember.groupId ] );
    return myNewMemberResult;
}
async function addNewGroup( newGroup ){
    const myNewGroupResult = await db.query( 
        "INSERT INTO new_group (group_name, group_imageUrl, group_goal) VALUES(?,?,?);",
        [ newGroup.groupName, newGroup.groupImageUrl, newGroup.groupGoal ] );
    return myNewGroupResult;
}
async function deleteGrpMember( membId, memName ){
    const myDeletedMember = await db.query( 
        "DELETE FROM group_member WHERE grp_mbr_id = ?",
        [ membId ] );
    return myDeletedMember;
}
async function deleteGroup( grId ){
    const myDeletedGroup = await db.query( 
        "DELETE FROM new_group WHERE group_id = ?",
        [ grId ] );
    return myDeletedGroup;
}

        //=============top 3 sara=======

async function getTop3( grpNameId ){
    const myGrpName = await db.query( 
        "SELECT new_group.group_name,new_group.group_id,personal_info.id,personal_info.user_img, personal_info.my_name, personal_info.my_weight, group_member.grp_mbr_id FROM new_group, personal_info, group_member WHERE new_group.group_id=group_member.group_id_fk AND personal_info.id=group_member.member_id_frk AND new_group.group_id = ? ORDER BY my_weight ASC LIMIT 3;",
        [ grpNameId ] );
        console.log(` in orm the value of myGrpName ` + myGrpName);
    return myGrpName;
}

//===============sara dont delete above sara============

//====================Joanna --------------------------------
async function getId(emailId){
    let userFetch = await db.query('SELECT * FROM personal_info WHERE username=?', [ emailId ] );
    userFetch = JSON.stringify(userFetch); 
    userFetch = JSON.parse(userFetch); 
    return userFetch[0]
}

async function getDashboardInfo(id){
    let putInDashboard = await db.query('SELECT * FROM personal_info WHERE id=?', [ id ] );
    console.log(putInDashboard)
    return putInDashboard[0]
}

async function postGoalInfo(myGoals){
    console.log("INSIDE ORM FILE FOR POST GOAL");
    const postGoalSql = await db.query("INSERT INTO personal_goal(goal_range,goal_message, goalCompleted) VALUES(?,?,?) ", [myGoals.goalRange,myGoals.goalInput, myGoals.goalCompleted]);
    return postGoalSql;
}

async function getGoalInfo(){
    let getGoalSql = await db.query("SELECT * FROM personal_goal WHERE goalCompleted=0");
    getGoalSql = JSON.stringify(getGoalSql);
    getGoalSql = JSON.parse(getGoalSql);

    console.log(getGoalSql);
    
    return getGoalSql;
}

async function updateGoalStatus(goalId){
    const updateGoal = await db.query("UPDATE personal_goal SET goalCompleted=? WHERE goal_id=?", [true, goalId]);
    console.log("Goal is updated")
    console.log(updateGoal);    

}

//====================Joanna ended --------------------------------

//------------------------- Norma's code------------------------------//

async function profilePicDbQuery(){
    let profileImage = await db.query('SELECT user_img FROM personal_info limit 10')
    // console.log( `[loadUser] profileImage:`, profileImage );
    return profileImage;
    
}

async function postUserDbQuery(userPost){
    let postDbRes = await db.query("INSERT INTO group_posts(my_name, info, member_id) VALUES(?,?,?)", [userPost.name, userPost.inputpost, userPost.member_id]);
    // console.log( `[loadUser] profileImage:`, postDbRes );
    return postDbRes;
}

async function getPostDbQueryFn(Post){
    let postRes = await db.query("SELECT user_img, info, creation_time, group_posts.my_name from group_posts LEFT JOIN personal_info ON group_posts.member_id = personal_info.id");
    // console.log( `[loadUser] userPost:`, postRes );
    return postRes;
}

async function changeThumbsupNum(id){
    let thumbsupSql = await db.query("UPDATE group_posts SET thumbs_up = thumbs_up + 1 WHERE id = ?",[id]);
    let getThumbsUpVal = await db.query("SELECT thumbs_up, group_posts.my_name FROM group_posts WHERE id = ?", [id]);

    // console.log( `[loadUser] thumbsupSql:`, getThumbsUpVal );
    return getThumbsUpVal;
}

//==================Norma code ended ============================

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
    deleteGrpMember,
    deleteGroup,
    getId,
    getDashboardInfo,
    postGoalInfo,
    getGoalInfo,
    updateGoalStatus,
    getTop3,
    getAllRegisMember,
    getUserProfile,
    profilePicDbQuery,
    postUserDbQuery,
    getPostDbQueryFn,
    changeThumbsupNum
    
}