//connect to backendless database
Backendless.initApp( "149387A3-DEA6-674F-FF0B-C96984669200" , "97464C7C-D6D7-F1C5-FFE2-69404473C700", "v1" );
//initialise table title and attribute
function User() {
    this.email = "";
    this.password = "";
    this.username="Default";
    this.location = "";
    this.restaurant ="";
    this.food = "";
    this.myImg="img/img_avatar1.png";
}
function Review(){
    this.reviewid="";
    this.email = "";
    
    this.restaurant ="";
    this.comment = "";
}


function Likes(){
    this.restaurant="";
    this.email="";
}
//public variable, global variable
var markeplace;
var myUser= new User();
var myReview=new Review();
var restaurantNo;
var checkR=1;
var notification_count=0;
$.mobile.buttonMarkup.hoverDelay="false";
$(document).on("pageshow","#login", onPageShow);
$(document).on("pageshow","#LoginSuccess", createNotification);
$(document).on("pageshow","#pageone", checkUser);
$(document).on("pageshow","#pagetwo", checkUser);
$(document).on("pageshow","#pagethree", checkUser);
$(document).on("pageshow","#pagemap", checkUser);
$(document).on("click", "#registerButton", register);
$(document).on("click", "#loginButton", checkPassword);
$(document).on("click", ".Change_account", Change_account);
$(document).on("click", "#Enter", PreparePage);
$(document).on("click", ".ops", ops);
//when login success, show username in every profile title
function PreparePage(){
    $('.profileImg').attr('src', myUser.myImg);
     
}
//input email and password can create a new account
function register() {
    //get value from form in register page
	var emailtext = $('#addemail').val();  
    var passwordtext = $('#addpassword').val();
    //new variable for userdata
    var newUser = new User();
    //get data from database
    var userData = Backendless.Persistence.of( User ).find().data;
    
  if(userData){  
      //if data can be got, then check email and password
      if(emailtext==null||emailtext==""){
          //if email is empty, create a error variable and show message notification
         var emailerror;
        createMessage("Your email is empty!");
    }else if(emailtext.length<6||emailtext.indexOf("@")>emailtext.lastIndexOf(".")-2||emailtext.lastIndexOf(".")>emailtext.length-1){
        //if email is invalid, create a error variable and show message notification
        var emailerror;
        createMessage("Not a valid email!");
        
    }else if(passwordtext==null||passwordtext==""){
        //if password is empty, create a error variable and show message notification
        var emailerror;
        createMessage("Your password is empty!");
    }else if(passwordtext.length<6){
        //if password is too short, create a error variable and show message notification
        var emailerror;
        createMessage("Your password is less than 6 char");
    }else{
        
   //if email and password are OK, find every data in database
        for (var i = 0; i < userData.length; i++) { 
           
            if(userData[i].email==emailtext){
                //if there is an email exist in database,create a error variable and show message notification
                var emailerror;
                createMessage("This email was created!");
                break;
            }else if(i==userData.length-1){
                //until the last data,  no error and create a new account
//                console.log(emailerror,"pass");
                newUser.email = emailtext;
                newUser.password = passwordtext;
                //add email and password to database
                Backendless.Persistence.of( User ).save(newUser);
                //set default text field in login page, user can continue to login
                $('#email').val(newUser.email);
                $('#password').val(newUser.password);
                //change page to register seccess page
                window.location.href="#RegisterSuccess";
            }
        }
    }
              }else{
                  //if there is no backendless data, create a message notification
                    createMessage("No find data");
//                    alert("No find data");
              }
}
function ops(){
    // remind user need to login
   createMessage("You need go to Map page first");
//    alert("You need go to Map page first");
}        
 // login system   
function checkPassword(){  
    //get value from text firld when click button
    var emailtext = $('#email').val();
    var passwordtext = $('#password').val();
    // get data from database
    var userData = Backendless.Persistence.of( User ).find().data;
    
  if(userData){ 
      // check email and password format.
      if(emailtext==null||emailtext==""){
        var emailerror;
        createMessage("Your email is empty!");
    }else if(emailtext.length<6||emailtext.indexOf("@")>emailtext.lastIndexOf(".")-2||emailtext.lastIndexOf(".")>emailtext.length-1){
        var emailerror;
        createMessage("Not a valid email!");
        
    }else  if(passwordtext==null||passwordtext==""){
        var emailerror;
        createMessage("Your password is empty!");
    }else if(passwordtext.length<6){
        var emailerror;
        createMessage("Your password is less than 6 char");
    }else{
        //if email and password are OK, compare every data of database with data of input
    for (var i = 0; i < userData.length; i++) { 
        
      	if(userData[i].email==emailtext){
            if(userData[i].password==passwordtext){ 
                //if email and password are correct, keep email in global variable
                myUser.email=userData[i].email;
                //download every data of this user from database
                downloadUserData();
                //change page to login success page
                window.location.href="#LoginSuccess"; 
                break;
            }else if(i==userData.length-1){
                //untill the last data, there is no password in database, show the message
                var emailerror;
                createMessage("Wrong Password!");
            }
        }else if(i==userData.length-1){
            //untill the last data, there is no email in database, show the message
            var emailerror;
            createMessage("Wrong Email!");
        }
    }
    }
              }else{
                  createMessage("No find data");
//                  alert("No find data");
              }
}
// dialog notification code was getting from lecture
function createDialog() {

	//phonegap supports native dialog boxes.
	//here's a simple example
      if(navigator.notification){
	navigator.notification.confirm(
    	'Do you want to exit?',  // message
        dialogDismissed,         // callback
        'Attention! Exit?',            // title
        ['Yes', 'No']                  // buttons
    );}else{
        createMessage("Don't support Dialog notification!");
//        alert("Don't support Dialog notification!");
        navigator.app.exitApp();
    
}
}
        	 
        	
// notification code was getting from lecture        	
function dialogDismissed(buttonIndex) {
	// first button to exit, second one is cancell
	if(buttonIndex==1){ navigator.app.exitApp();}else{
        createMessage("Cancelled!");
    }
   	

}
// notification code was getting from lecture        	
function createMessage(Nmessage){		
    if(Toast){
        new Toast({content: Nmessage, duration: 3000}); 	
    }else{
        createMessage("No Toast");
//        alert("No Toast");
    }
}
function Change_account(){
    //when click button to change account, clean all user data.
    myUser= new User();
//    console.log(myUser.email,myUser.password,"logout");
}
function exit(){
    //when user click exit button, there is a dialog notification shows 
    createDialog(); 
}
//empty function
function onPageShow() {
    //when login page show, if there is no email exist, then it shows notification message 
    checkUser();
}
function checkUser(){
    if(myUser.email==null||myUser==""){
        window.location.href="#login";
        createMessage("You should login first");
//        alert("You should login first");
    }
}
// notification code was getting from lecture 
function createNotification() {
    var currentTime= new Date().getTime();
    var hours = new Date().getHours();
    var mins= new Date().getMinutes();
    var s=new Date().getSeconds();
    //current time
    var notificationTime = new Date(currentTime + 1000); //delayed 
if(hours==8&&mins==0&&s==0){
    var newTime= new Date().getTime();
    var breakfastTime = new Date(newTime);
}
  if(hours==12&&mins==0&&s==0){
    var newTime= new Date().getTime();
    var lunchTime = new Date(newTime);
}
    if(hours==18&&mins==0&&s==0){
    var newTime= new Date().getTime();
    var dinnerTime = new Date(newTime);
}
//  console.log(currentTime,hours,mins,s,notificationTime,breakfastTime);
    // if device support, there are three notification 
  if(cordova.plugins){  
      //a notification remind user there is a notification when user login success
      cordova.plugins.notification.local.schedule({ 
    	id: 		1,
        title: 		"Hey",
        message: 	"We would remind you the time",
        date: 		notificationTime, 
        badge: 		notification_count++
   	});
      //a notification remind user to have breakfast in 8:00 
      cordova.plugins.notification.local.schedule({ 
    	id: 		2,
        title: 		"Good morning",
        message: 	"Time to have breakfast",
        date: 		breakfastTime, 
        badge: 		notification_count++
   	});
      //a notification remind user to have lunch in 12:00 
      cordova.plugins.notification.local.schedule({ 
    	id: 		3,
        title: 		"Hi",
        message: 	"Time to have lunch",
        date: 		lunchTime, 
        badge: 		notification_count++
   	});
      //a notification remind user to have dinner in 18:00 
      cordova.plugins.notification.local.schedule({ 
    	id: 		4,
        title: 		"Good evening",
        message: 	"Time to have dinner",
        date: 		dinnerTime, 
        badge: 		notification_count++
   	});
}else{
    //if the device do not support notification, there is a message shows 
    createMessage("Do not surppot notification!");
//        alert("Don't support Dialog notification!");
}
}

