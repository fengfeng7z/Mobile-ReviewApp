// link to database, and updata this user's data
function uploadUserData(data){
    console.log(data.email,data.password,"uploadData1");
    var userData = Backendless.Persistence.of( User ).find().data;
    for (var i = 0; i < userData.length; i++) { 
        console.log(userData[i].email,userData[i].password,i);
      	if(userData[i].email==data.email){
                console.log(data.email,data.password,"uploadData");
            console.log( userData[i]);
             userData[i].email=data.email;
            userData[i].password=data.password ;
           userData[i].username =data.username;
            userData[i].location=data.location ;
            userData[i].restaurant=data.restaurant;
            userData[i].food=data.food;
            userData[i].myImg=data.myImg;
            console.log( userData[i]);
                Backendless.Persistence.of( User ).save(userData[i]);     
                 downloadUserData();
                break;
            
    
    }
    }
            
    
}
//link to database, and read this user data
function downloadUserData(){
    console.log(myUser.email,myUser.password,"downloadData1");
    var userData = Backendless.Persistence.of( User ).find().data; 
    for (var i = 0; i < userData.length; i++) { 
        console.log(userData[i].email,userData[i].password,i);
      	if(userData[i].email==myUser.email){
                console.log(myUser.email,myUser.password,"downloadData");
             myUser.email=userData[i].email;
            myUser.password=userData[i].password ;
           myUser.username=userData[i].username ;
            myUser.location=userData[i].location ;
            myUser.restaurant=userData[i].restaurant;
            myUser.food=userData[i].food;
            myUser.myImg=userData[i].myImg;
            console.log( userData[i]);   
                 
                break;
            
        }
    
    }
    
}