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
        // password: "bootcamp2020", //change 
        password: "1234", //change 
        database: "fitness_diaries"
    });
};

module.exports = db;