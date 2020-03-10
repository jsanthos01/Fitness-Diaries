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
    password: "bootcamp2020", //change 
    database: "fitness_diaries"
});

async function getUsersInfo() {
    
}

async function postUsersInfo(){

}

async function storeRegistrationInfo(myPost){
    const myResult = await db.query( 
        "INSERT INTO users(first_name,last_name,email_address,user_password) VALUES(?,?,?,?)",
        [ myPost.first_name, myPost.last_name, myPost.email_address, myPost.user_password ] );
    return myResult
    
}
module.exports = {
    storeRegistrationInfo,
    getUsersInfo,
    postUsersInfo
}

