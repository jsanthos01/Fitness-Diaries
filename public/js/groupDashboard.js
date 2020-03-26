function mQuotes(){
    $.ajax({
    url: "https://type.fit/api/quotes",
    method: "GET"
    }).then(function(response){
    var motQuotes = JSON.parse(response)
    console.log(motQuotes);
    var quote = Math.floor(Math.random()*motQuotes.length);
    //console.log("Random quote: "+JSON.stringify(motQuotes[quote]));
    $("#quotes").text(motQuotes[quote].text);
    $("#quotes").html(`<i class="fa fa-quote-left" aria-hidden="true"></i>   ${motQuotes[quote].text}   <i class="fa fa-quote-right" aria-hidden="true"></i>`);
    })
} 
$(document).ready( async function(){
    let userData = localStorage.getItem("myUser");
    userData = JSON.parse(userData);
    console.log(userData);
    let myName = userData.my_name;
    const id = userData.userId;

    console.log(myName);
    const myUserInfo = await $.get(`/api/dashboardInfo/${id}`);
    console.log('my user is ' + myUserInfo);
    if (myUserInfo.user_img != null){
        $( ".thumbProfileimg" ).html( `<img src="${myUserInfo.user_img}" alt="" class="profilePicture m-2 " style="width: 50px; height: 50px;">`);
        $( ".appendThumbnailMenu" ).html( `<img src="${myUserInfo.user_img}" alt="" class="profilePicture m-2 " style="width: 75px; height: 75px;">`);
    }
    
    mQuotes();

    const groupId = location.hash.substr(1);
    const getGroupInfo = await $.get(`/api/groupInfo/${groupId}`);
    console.log(' getting group info ' + getGroupInfo[0])
    $('#appendGroupGoal').html(`
        <h3>Group Goal to lose : ${getGroupInfo[0].group_goal}</h3>
    `);
    
    let  currentTime= moment().format('MMMM Do YYYY');;   
    $('#groupName').html(`${getGroupInfo[0].group_name} Dashboard `);
    $('#currentTime').html(`${currentTime}`);
    $('#membersList').html('');
    
    var sumOfGoalLost = 0;
    var groupsGoal =  parseInt(getGroupInfo[0].group_goal);
    
    //PRINT OUT MEMBERS
    getGroupInfo.forEach(function( group ){
        console.log('printing out the goals: ' + group.goal)
        let newNumber = parseInt(group.goal);
        
        sumOfGoalLost = sumOfGoalLost + newNumber;
        console.log('printing out sum of goals: ' + sumOfGoalLost)

        $('#membersList').append(`<div class="userImg col-2">
            <img src="${group.user_img}" alt="" class="profilePictureLink" style="width: 100px;" onClick="showMemberProfile('${group.id}')">
        </div>`)
    })
    // TO PRINT GOAL PROGRESS BAR

    console.log(' sum Of Goal Lost is ' + sumOfGoalLost)
    $('#appendGroupGoal').append(`
        <h4>Total lost : ${sumOfGoalLost}</h4>
        `
    )

    var completedPercentage = Math.round((sumOfGoalLost*100)/groupsGoal);
    console.log(completedPercentage);

    /* ldBar stored in the element */
    var bar1 = new ldBar("#myItem1");
    var bar2 = document.getElementById('myItem1').ldBar;
    bar1.set(completedPercentage);

    // PRINT TOP 3 USERS
    const myTop3List = await $.get(`/api/top3List/${groupId}`);
    console.log(myTop3List);
    $('#top3List').html('');
    myTop3List.forEach( function( top3 ){
        $('#top3List').append(`
        <div class="d-flex justify-content-around card-body">
            <img src="${top3.user_img}" alt="" class="profilePictureLink2">
            <h6 class="mt-4">${top3.my_name}</h6>
            <h6 class="mt-4">Weight: ${top3.my_weight}</h6>
        </div>`)
    })
    showInfo();
})

function showMemberProfile(id){
    console.log('loading profile of ' + id);
    location.href = '/individual.html#'+ id;
}

async function postPosts() {
    let inputPost = $("#postinput").val();
    if (inputPost != ''){
        $("#postinput").val('');
        let userData = localStorage.getItem("myUser");
        userData = JSON.parse(userData);
        const userName = userData.my_name;
        const userId = userData.userId;
        const groupId =location.hash.substr(1)
        console.log(inputPost)

        alert('you have entered ' + inputPost);

        let userPostInfo = {
            inputpost: inputPost,
            name: userName,
            member_id: userId,
            posts_group_id: groupId
        };
        console.log(userPostInfo);
        const userPost = await $.post("/api/postinfo", userPostInfo);
        console.log("Getting the Post Info Stuff!!!!");
        showInfo();

    } else {
        alert('you have not entered anything!!')
    } 
};

async function showInfo(){
    const groupId =location.hash.substr(1)
    const fetchPosts = await $.get(`/api/getposts/${groupId}`);
    console.log("Getting the posts from server!!!!") 
    console.log( 'what is this: ' + fetchPosts[0].thumbs_up);
    $("#userpostid").empty();

    let userData = localStorage.getItem("myUser");
    userData = JSON.parse(userData);
    const commentersName = userData.my_name;
    const commentersId = userData.userId;

    let arrLength = fetchPosts.length-1;

    for ( let i = arrLength; i >= 0; i--){
        const grpPstId = fetchPosts[i].post_id;
        console.log('what is group Post Id? ' + grpPstId)
        const commentNumber = await $.get(`/api/getCommentsNmb/${grpPstId}`);

        const cmntNmb = commentNumber[0].comments;
        console.log('what is the comment number showing? ' + cmntNmb)

        var createdPostTime = fetchPosts[i].creation_time;
        var timePosted = moment(createdPostTime).fromNow();
        
        console.log( ` the thumbnail for the post id: ${fetchPosts[i].post_id} and the no of thumbnail is  ${fetchPosts[i].thumbs_up}`)
        $("#userpostid").append(
            `<section id="${i+1}" class="userPost container mt-4 card">
            <div class="progressSection card-body">
                <div class="input-group mb-3 ">
                    <div class="form-control d-flex align-items-start card-body">
                        <div class="userImg col-lg-2">
                            <img src="${fetchPosts[i].user_img}" alt="" class="profilePictureLink" style="width: 100px;"onclick="showMemberProfile('${fetchPosts[i].id}')">
                        </div>
                        <div class="text-left col-lg-10" id="postIDChek${fetchPosts[i].post_id}">
                            <h3>${fetchPosts[i].group_member_name}</h3>
                            <p class="text-left">${fetchPosts[i].info}</p>
                            <div class="">${timePosted}</div>  
                        </div>
                    </div>
                </div>
                <ul class="nav justify-content-start">
                    <li class="nav-item ">
                        <i onclick="thumbsupFunc(${fetchPosts[i].post_id})" id="thumbsupid${i+1}" class="thumbsUp fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i>
                        <span id="number${fetchPosts[i].post_id}" class="pl-2">${fetchPosts[i].thumbs_up}</span>
                        <i onclick="showCommentForm(${i}, ${fetchPosts[i].post_id})" class=" thumbsUp fa fa-comment fa-lg" aria-hidden="true"></i><span id="comment${fetchPosts[i].post_id}" class="comntNum">${cmntNmb}</span>
                    </li>
                </ul>
                <div id="commentSection${i}" class="hide mb-3 mt-3">
                    <div class="input-group mb-3 " >
                        <input type="text" id="commentInput${i}" class="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" onclick="postcomment(${i},'${commentersName}',${commentersId}, ${fetchPosts[i].post_id})">comment</button>
                        </div>
                    </div>
                </div>
                <div id="postedComment${i}" class="container row mx-auto mb-3 mt-3">
                </div>
            </div>
        </section>`
        )

        $(`#number${i+1}`).html(fetchPosts[i].thumbs_up);
        
    } 
}

async function thumbsupFunc(idx){
    const thumbsUp = await $.get(`/api/thumbsup/${idx}`);   
    console.log(thumbsUp);
    console.log(thumbsUp[0].thumbs_up); 
    $(`#number${idx}`).html(thumbsUp[0].thumbs_up);
}

async function showCommentForm(id, postId ){
    $( `#commentSection${id}` ).show( "slow" );
    showPrintComments(id, postId)
}

async function postcomment(id, commentersName, commentersId, postId){
    let comment = $(`#commentInput${id}`).val();
    let postedComments = {
        commenters_name: commentersName,
        commenters_id: commentersId,
        comments: comment,
        cmnts_post_id: postId
    }

    const postComment = await $.post("/api/postComment", postedComments);
    $(`#commentInput${id}`).val('');
    showPrintComments(id, postId);
}

async function showPrintComments(id, postId){
    const fetchComments = await $.get(`/api/getComment/${postId}`);  
    console.log('THE COMMENTS ARE: ' + fetchComments);
    const commentNumber = await $.get(`/api/getCommentsNmb/${postId}`);
    const cmntNmb = commentNumber[0].comments;
    console.log('what is the comment number showing? ' + cmntNmb)
    $(`#comment${postId}`).html(
        `${cmntNmb}`
    )

    $(`#postedComment${id}`).empty();
    fetchComments.forEach(function( comments){
        var createdPostTime = comments.createdAt;
        var timePosted = moment(createdPostTime).fromNow();

        console.log('printing out the comments: ' + comments + comments.comments)
        $(`#postedComment${id}`).append(
            `
            <div class="col d-flex justify-content-left comntBorder" id="${comments.post_id}">
                <div class="userImg col-lg-2">
                    <img src="${comments.user_img}" alt="" class="profilePictureLink" style="width: 50px;height: 50px;"onclick="showMemberProfile('${comments.id}')">
                </div>
                <div class="text-left col-lg-8">
                    <span class="commentersName">${comments.commenters_name}</span>
                    <p class="commentersComment"> ${comments.comments} </p>
                    <p class="commentedTime">${timePosted}</p>
                </div>
                <div class="col-lg-2">
                    <i onclick="deleteCommentForm(${comments.post_id})" class="thumbsUp fa fa-trash-o fa-lg" aria-hidden="true"></i>  
                </div>
            </div>
        `
        )
    })
};

async function deleteCommentForm(id){
    const apiResult = await $.ajax({
        url: `/api/deleteComments/${id}`,
        type: "DELETE"
    });
    console.log("Delete Worked!!!!!")
    // location.href = 'groupDashboard.html';

}
//ANIMATION EFFECTS
function showMenu(){
    $( "#navMenu" ).show( "slow" );
};
function hideMenu(){
    $( "#navMenu" ).hide( "slow" );
}

function logOutBtn(){
    localStorage.clear();
    location.href = '/login.html';
}
