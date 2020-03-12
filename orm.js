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
    password: "root1234", //change 
    database: "fitness_diaries"
});

//store registration info 

async function registrationSql(myPost){
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
    const postMemberInfo = await db.query("UPDATE personal_info SET my_weight=?, height=?, goal=? WHERE username=?", [ myPost.inputWeight, myPost.inputHeight, myPost.inputGoal, myPost.userName]);
    // const postMemberInfo = await db.query("INSERT INTO personal_info(my_weight, height, goal) VALUES(?,?,?) WHERE username=?", [ myPost.inputWeight, myPost.inputHeight, myPost.inputGoal, myPost.userName]);
    console.log(postMemberInfo);
    return postMemberInfo;
}

async function getUsersInfo() {
    console.log("This is for the sql get section");

    let myInfo = await db.query("SELECT my_weight, height, goal FROM personal_info");
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
    loginUser
}