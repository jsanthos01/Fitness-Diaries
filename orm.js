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

async function registrationSql(myPost){
    console.log(myPost);
    const postUserLogin = await db.query( 
        "INSERT INTO login_credential(my_name,username,user_password) VALUES(?,?,?)",
        [ myPost.my_name, myPost.userName, myPost.user_password]);

    const storeUsersName = await db.query("INSERT INTO personal_info(my_name, username) VALUES(?,?)", [myPost.my_name, myPost.userName]);
    return postUserLogin, storeUsersName;
}

async function postUsersInfo(myPost){
    console.log("This is for the sql posting section");
    console.log(myPost.userName);
    const postMemberInfo = await db.query("UPDATE personal_info SET my_weight=?, height=?, goal=?, BMI=?,user_img=? WHERE username=?", [ myPost.inputWeight, myPost.inputHeight, myPost.inputGoal, myPost.bmi, myPost.inputUrl, myPost.userName]);
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

async function  getGrpInfo( grpId ){
    const myGrpId = await db.query( 
        "SELECT new_group.group_id,new_group.group_name,new_group.group_imageUrl,new_group.group_goal,new_group.createdAt, personal_info.id, personal_info.user_img, personal_info.username, personal_info.my_name, personal_info.my_weight, personal_info.height, personal_info.goal, group_member.grp_mbr_id FROM new_group, personal_info, group_member WHERE new_group.group_id=group_member.group_id_fk AND personal_info.id=group_member.member_id_frk AND new_group.group_id = ?;",
        [ grpId ] );
        console.log(` in orm the value of myGrpId ` + myGrpId);
    return myGrpId;
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

async function getTop3( grpNameId ){
    const myGrpName = await db.query( 
        "SELECT new_group.group_name,new_group.group_id,personal_info.id,personal_info.user_img, personal_info.my_name, personal_info.my_weight, group_member.grp_mbr_id FROM new_group, personal_info, group_member WHERE new_group.group_id=group_member.group_id_fk AND personal_info.id=group_member.member_id_frk AND new_group.group_id = ? ORDER BY my_weight ASC LIMIT 3;",
        [ grpNameId ] );
        console.log(` in orm the value of myGrpName ` + myGrpName);
    return myGrpName;
}

async function getCompletedGoal(){
    let getCompletedGoalSql = await db.query("SELECT * FROM personal_goal WHERE goalCompleted= 1 ORDER BY updatedTime DESC LIMIT 20;");    
    return getCompletedGoalSql;
}

async function postComment( comments ){
    const newComment = await db.query( 
        "INSERT INTO post_comments (commenters_name, commenters_id, comments, cmnts_post_id) VALUES(?,?,?,?);",
        [ comments.commenters_name, comments.commenters_id, comments.comments, comments.cmnts_post_id ] );
    return newComment;
}
async function getComment( postId ){
    const getComment = await db.query( 
        "SELECT post_comments.commenters_name, post_comments.comment_id, post_comments.comments, post_comments.createdAt, personal_info.id, personal_info.user_img, personal_info.my_name, group_posts.post_id,group_posts.posts_group_id FROM post_comments, personal_info, group_posts WHERE post_comments.commenters_id = personal_info.id AND post_comments.cmnts_post_id = group_posts.post_id AND cmnts_post_id = ? ORDER BY post_comments.createdAt DESC;",
        [ postId ] );
    return getComment;
}

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
    const postGoalSql = await db.query("INSERT INTO personal_goal(goal_range,goal_message, goalCompleted,userId) VALUES(?,?,?,?) ", [myGoals.goalRange,myGoals.goalInput, myGoals.goalCompleted, myGoals.userId]);
    return postGoalSql;
}

async function getGoalInfo(){
    let getGoalSql = await db.query("SELECT * FROM personal_goal WHERE goalCompleted=0");
    getGoalSql = JSON.stringify(getGoalSql);
    getGoalSql = JSON.parse(getGoalSql);
    console.log(getGoalSql);

    return getGoalSql;
}

async function getOthersGoalInfo(otherId){
    let getOthersGoalSql = await db.query("SELECT * FROM personal_goal WHERE goalCompleted = 0 and userId=?", [otherId]);
    console.log('otherId is ' + otherId + ' getOthersGoalSql ' + getOthersGoalSql);
    return getOthersGoalSql;
}

async function getCompletedOthersGoal(Id){
    let getCompletedGoalSql = await db.query("SELECT * FROM personal_goal WHERE goalCompleted= 1 AND userId=? ORDER BY updatedTime DESC LIMIT 20;", [Id]);    
    return getCompletedGoalSql;
}

async function updateGoalStatus(goalId){
    const updateGoal = await db.query("UPDATE personal_goal SET goalCompleted=? WHERE goal_id=?", [true, goalId]);
    console.log("Goal is updated")
    console.log(updateGoal);
}

async function profilePicDbQuery(){
    let profileImage = await db.query('SELECT user_img FROM personal_info limit 10')
    return profileImage;    
}

async function postUserDbQuery(userPost){
    let postDbRes = await db.query("INSERT INTO group_posts(group_member_name, info, member_id, posts_group_id) VALUES(?,?,?,?)", [userPost.name, userPost.inputpost, userPost.member_id, userPost.posts_group_id]);
    return postDbRes;
}

async function getPostDbQueryFn(grpId){
    let postRes = await db.query("SELECT group_posts.group_member_name, group_posts.post_id, group_posts.info, group_posts.creation_time, group_posts.thumbs_up, group_posts.user_comments, personal_info.id, personal_info.user_img, new_group.group_id, new_group.group_name FROM group_posts, personal_info, new_group WHERE group_posts.posts_group_id=new_group.group_id AND group_posts.member_id=personal_info.id AND new_group.group_id = ? ;", [grpId]);
    return postRes;
}

async function changeThumbsupNum(id){
    let thumbsupSql = await db.query("UPDATE group_posts SET thumbs_up = thumbs_up + 1 WHERE post_id = ?",[id]);
    let getThumbsUpVal = await db.query("SELECT thumbs_up, group_posts.group_member_name FROM group_posts WHERE post_id = ?", [id]);
    return getThumbsUpVal;
}
async function getCommentNum(id){
    let getCommentNum = await db.query("SELECT COUNT(*) comments FROM post_comments WHERE cmnts_post_id = ?;", [id]);
    return getCommentNum;
}

module.exports = {
    getCommentNum,
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
    getOthersGoalInfo,
    getCompletedOthersGoal,
    getComment,
    getGrpInfo,
    getCompletedGoal,
    postComment,
    changeThumbsupNum,
    getPostDbQueryFn,
    postUserDbQuery,
    profilePicDbQuery   
}