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
        [ myPost.my_name, myPost.email_address, myPost.user_password]);

    const storeUsersName = await db.query("INSERT INTO member_name(my_name) VALUES(?)", [myPost.my_name]);
    return postUserLogin;
}


//retrieve fullname of user 
async function getFullName(){
    const myResult = await db.query("SELECT my_name FROM member_name");
    return myResult 
}

async function postUsersInfo(myPost){
    const postMemberInfo = await db.query("INSERT INTO member_info(user_img, weight, height) VALUES(?,?,?)", [myPost.user_img, myPost.inputWeight, myPost.inputHeight ]);
    return postMemberInfo;
}

async function getUsersInfo() {
    const myInfo = await db.query("SELECT weight, height, user_image FROM member_info");
    return myInfo
}

module.exports = {
    registrationSql,
    getFullName,
    postUsersInfo,
    getUsersInfo
}

