const express = require( 'express' );

const PORT = process.env.PORT || 8080;
const app  = express();

app.use( express.static('public') );
app.use( express.urlencoded({ extended: false }) );


app.listen( PORT, function(){
    console.log( `[pictures] RUNNING, http://localhost:${PORT}` );
});

