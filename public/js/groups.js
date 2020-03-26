
$(document).ready( async function(){
    appendGroupList();
    
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
})

//Animations
function showMenu(){
    $( "#navMenu" ).show( "slow" );
};

function hideMenu(){
    $( "#navMenu" ).hide( "slow" );
}

function showAddGroupWin(){
    $( "#addGroupWin" ).slideDown( "slow" );
    $( "#navMenu" ).hide( "slow" );
}

function hideAddGroupWin(){
    $( "#addGroupWin" ).hide( "slow" );
}

function showAddMemberForm(){
    $( "#memberForm" ).show( 1000 );
    $('html, body').animate({
        scrollTop: $("#memberForm").offset().top
    }, 1000);
}

async function addMemberBtn(grpId){
    event.preventDefault();
    const addMemberVal = $("#inputGroupSelect02").val();
    const MemberValArray = addMemberVal.split(" ");
    const memberId = MemberValArray[0];
    const memberFirstName = MemberValArray[1];
    const memberLastName = MemberValArray[2];

    const newMember = {
        memberName: memberFirstName + memberLastName,
        memberId: memberId,
        groupId: grpId
    }

    const apiResult = await $.post(`/api/addNewMember`, newMember );
    appendMemberList(grpId);
    alert( apiResult.message );
    $("#inputGroupSelect02").val("Choose a User to add to your group");
    $( "#memberForm" ).hide();

}

async function createGrp(){
    event.preventDefault();
    const group = {
        groupName: $("#groupName").val(),
        groupGoal: $("#groupGoal").val(),
        groupImageUrl: $("#groupImgUrl").val()
    }
    const apiNewGroup = await $.post( '/api/newGroup', group );
    alert( apiNewGroup.message );
    appendGroupList()
    $( "#addGroupWin" ).hide( "slow" );
}

async function showGroupDetailInfo(idx){
    $( "#groupDetailInfo" ).show( "slow" );
    
    const myGroupName =await $.get(`/api/groupName/${idx}`);
    console.log(`my group name is ` + myGroupName);
    $( "#grpNmRow" ).html('');
    $( "#grpNmRow" ).append(`
        <div class="text-center">
            <h3>${myGroupName.group_name}</h3>
            <img src="assets/add(white).png" alt="" class="addMemberIcon" onClick="showAddMemberForm(${idx})" style="width: 100px;" ><p>Add member</p>
        </div>`
    );
    $( "#addShowGrpBtn" ).html( `<button type="button" class="btn btn-outline-primary" onClick="showGrpDshbrd(${idx})">Show Group Dashboard</button>` )
    $( "#memberForm" ).html('');
    $( "#memberForm" ).append(`
        <div class="input-group mb-3">
            <select class="custom-select" id="inputGroupSelect02">
                <option selected>Choose a User to add to your group</option>
            </select>
            <div class="input-group-append">
                <label class="input-group-text" for="inputGroupSelect02">Options</label>
            </div>
        </div>
        <button type="button" class="btn btn-primary btn-lg" onClick="addMemberBtn(${idx})">Add Member to Group</button>
        `
    )
    appendAllMemberToSelect()

    $('html, body').animate({
        scrollTop: $("#groupDetailInfo").offset().top
    }, 1000);

    appendMemberList(idx);
}

async function deleteMemberBtn(grpMemberId, name, grId){
    console.log('deleting member ' + name + ' of id:' + grpMemberId);
    const apiDeleteMember = await $.ajax({
        url: `/api/deleteMember/${grpMemberId}/${name}`,
        type: 'DELETE'
    })
    appendMemberList(grId);
}

async function deleteGrpBtn(grpId){
    console.log('deleting group ' + ' of id:' + grpId);
    const apiDeleteGroup = await $.ajax({
        url: `/api/deleteGroup/${grpId}`,
        type: 'DELETE'
    })
    alert( apiDeleteGroup.message );
    appendGroupList();
}

async function appendMemberList(grIdx){
    const myMembersList =await $.get(`/api/membersList/${grIdx}`);
    console.log(myMembersList);
    if( myMembersList !== null && myMembersList !== '') {
        $('#membersListDisplay').html('');
        myMembersList.forEach( function( member ){
            $("#membersListDisplay").append(`<div class="col-md-3">
                <div class="mb-2 box-shadow">
                    <div class="card-body row justify-content-center">
                        <img class="memberImg card-img-top" src="${member.user_img}" alt="Card image cap">
                    </div> 
                    <h5 class="text-center">${member.my_name}</h5>
                    <div class="card-body">
                        <div class="d-flex justify-content-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-primary" onClick="showMemberProfile(${member.id})">View Member Profile</button>
                                <button type="button" class="btn btn-sm btn-outline-primary" onClick="deleteMemberBtn(${member.grp_mbr_id}, '${member.my_name}', ${member.group_id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        });

        return ;
    }

    console.log('something!!')
    $("#membersListDisplay").append('<div class="d-flex justify-content-center"><h6>You do not have any members available. Add members</h6></div>')
};

async function appendGroupList(){
    const myGroupList =await $.get("/api/groupList");
    console.log(myGroupList);
    $("#groupsRow").html("");
    
    for (var i=0; i< myGroupList.length; i++){
        console.log(myGroupList[i].group_name)
        $("#groupsRow").append(`
            <div class="col-md-3">
                <div class="mb-2 box-shadow">
                    <img class="groupImg card-img-top" src="${myGroupList[i].group_imageUrl}" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">${myGroupList[i].group_name}</p>
                        <div class="d-flex justify-content-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-primary" onClick="showGroupDetailInfo(${myGroupList[i].group_id})">View</button>
                            <button type="button" class="btn btn-sm btn-outline-primary" onClick="deleteGrpBtn(${myGroupList[i].group_id}, '${myGroupList[i].group_name}')">Delete</button>
                        </div>
                    </div>
                    <br>
                    <small class="text-muted">Created On: 9 mins</small>
                    </div>
                </div>
            </div>`
        )
    }
}

async function appendAllMemberToSelect(){
    const allMembersList =await $.get(`/api/getAllRegisteredMembersList`);
    console.log(allMembersList.my_name);

    allMembersList.forEach( function(member){
        $('#inputGroupSelect02').append(`
            <option value="${member.id} ${member.my_name}">${member.my_name}</option>`
        )
    })
}

async function showMemberProfile(membId){
    console.log('loading profile of ' + membId);
    location.href = '/individual.html#'+ membId;
}

async function showGrpDshbrd(grpId){
    console.log('loading group dashboard of group with id of ' + grpId);
    location.href = '/groupDashboard.html#'+ grpId;
}

function logOutBtn(){
    localStorage.clear();
    location.href = '/login.html';
}