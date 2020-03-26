$(document).ready( async function(){
    $('#submitUserBtn').click( async function(event){
        event.preventDefault();
        const usersEmail= $('#userEmail').val();
        const usersPassword= $('#userPassword').val();
        //checking validation of email and password
        if( usersEmail == "" ) {
            alert( "Please provide your Email!" );
            $('#userEmail').focus() ;
            return false;
        } 
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usersEmail))) {
            alert( "Please provide valid Email!" );
            $('#userEmail').focus() ;
            return false;
        }
        if( usersPassword == "" ) {
            alert( "Please provide your Password!" );
            $('#userPassword').focus() ;
            return false;
        }
        if(usersPassword.length <8 ) {
            alert( "Please provide a password that is atleast 8 character long" );
            $('#userPassword').focus() ;
            return false;
        }
        const storeInLocalStorage = {
            my_name: $('#myName').val(),
            userName: $('#userEmail').val(),
        };
    
        console.log(storeInLocalStorage);
        localStorage.setItem("myUser", JSON.stringify(storeInLocalStorage));
        
        const storeInDatabase = {
            my_name: $('#myName').val(),
            userName: $('#userEmail').val(),
            user_password: $('#userPassword').val()  
        };
        let apiResult = await $.post( '/api/registration', storeInDatabase );
        alert( apiResult.message );
        if( apiResult.message ){
            location.href = '/login.html';
        }
        
    })
})