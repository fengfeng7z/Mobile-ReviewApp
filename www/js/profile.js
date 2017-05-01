$(document).on('pageshow','#pagethree', showProfile);
$(document).on('pageshow','#pageone', showList);
$(document).on('click','#editProfilePage', onEditPage);
$(document).on('click','#changeProfile', changeProfile);
$(document).on("pagecreate","#pageEdit", imgFile);
//$(document).on("pageshow","#pagethree", showDetail);
function showList(){
    // when pageone show, change all panel's title to user name
    $('.panel-username').text(myUser.username);
     
}
function showProfile(){
    // when pagethree show, change all panel and profile page's title to user name
    $('.panel-username').text(myUser.username);
    $('.title').html(myUser.username);
    upDataProfile();
    
}
//function showDetail(){
//    
//}
function upDataProfile(){
    //clean list of profile page
    $('.taskList').empty();
    //show all detail about user in the pagethree
    $('.taskList').append("<li style='padding:10px;margin:10px;'>Username:" + myUser.username +"</li><li style='padding:10px;margin:10px;'>Location:"+myUser.location+"</li><li style='padding:10px;margin:10px;'>Favorite restaurant:"+myUser.restaurant+"</li><li style='padding:10px;margin:10px;'>Favorite food:"+myUser.food+"</li>");
}
function onEditPage(){
    //when click button and enter edit page, set every default data in text field
    $('#get-name').val(myUser.username);
    $('#get-location').val( myUser.location);
    $('#get-restaurant').val( myUser.restaurant);
    $('#get-food').val( myUser.food);
    $('.profileImg').attr('src', myUser.myImg);
    //if there is user email, then enter edit page
    if(myUser.email!=""){
        window.location.href="#pageEdit";
    }else{
        // else it means user did not no login, then button do not work  
        alert("you must login, then show profile page!");
        createMessage("you must login, then show profile page!");
    }
}
function changeProfile(){
    //when click button get all text value from text field
    myUser.username=$('#get-name').val();
    myUser.location=$('#get-location').val();
    myUser.restaurant=$('#get-restaurant').val();
    myUser.food=$('#get-food').val();
    // updata data by ajax function
     uploadUserData(myUser);
    // go to profile page
    window.location.href="#pagethree";
    createMessage("you changed your profile!");
}
//this code about show images from local storage which learned from class
function imgFile(){
    
    var input = document.querySelector('input[type=file]');
    input.onchange = function () {
  		var file = input.files[0];
		displayAsImage(file); 
	};
}
function displayAsImage(file){
    var imgURL = URL.createObjectURL(file);
    	
    myUser.myImg=imgURL;
//    console.log(myUser.myImg,imgURL,"333");
    $('.profileImg').attr('src',myUser.myImg);
}