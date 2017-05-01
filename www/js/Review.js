$(document).on('pageshow','#pageone', onclickPage);
$(document).on('pageshow','#pagetwo', showCollect);
$(document).on('pageshow','#pageReview', showReviews);
$(document).on('click','.onReview', onReviewPage);
$(document).on('click','#reviewBack', onReviewBack);
$(document).on('click','.Like', Collect);
$(document).on('click','#submit', submitText);
function onReviewBack(){
    //if click this button, go to pageone
    window.location.href="#pageone";

}

function onReviewPage(){
    
    
    if(myUser.email!=""){
        //if there is a email, go to page review
        window.location.href="#pageReview";
    }else{
        //means user did not login, show the message
        alert("You must login, then show review page!");
        createMessage("You must login, then show review page!");
    }
}
   
function Collect(){
    //when click button find data in likes table in database
    var myLike= Backendless.Persistence.of( Likes ).find().data;
    //get restaurant name value
    var likes=new Likes();
   likes.restaurant=$('.restaurantTitle').text();
    likes.email=myUser.email;
    for(var i=0;i<myLike.length;i++){
        if(likes.restaurant==myLike[i].restaurant||likes.restaurant==""){
            //if restaurant already exist in database create a message
            createMessage("You already collected!");
            break;
        }else if(i==myLike.length-1){
            //if this restaurant name was not in database, then add it in database
             createMessage("You collected this restaurant!"); 
            Backendless.Persistence.of( Likes ).save(likes);
//            console.log(myLike.length);
        }
    }
   
}

function showCollect(){
    // clean list
      $('#LikeList').empty();
    //find data about likes table in database
    var myLike= Backendless.Persistence.of( Likes ).find().data;
    
    var n=1;
    if(myUser.email!=""){
        //find data about this user and show restauran name of collections
    for(var i=0;i<myLike.length;i++){
        if(myLike[i].email==myUser.email){
        $('#LikeList').append("<li style='padding:20px;margin:0px;'>NO. "+n+" : " + myLike[i].restaurant +"</li>"); 
        n++;}
    }
    }
}
function showReviews(){
    //clean list
    $('#Reviews').empty();
    //find data about review table in database
    
    var newReview= Backendless.Persistence.of( Review ).find().data;
    //get restaurant name value in title 
    myReview.restaurant=$('.restaurantTitle').text();
    
    for(var i=0;i<newReview.length;i++){
        //show every revirew of this restaurant in the list
        if(newReview[i].restaurant==myReview.restaurant){
        $('#Reviews').append("<li style='padding:10px;margin:0px;'>"+newReview[i].email+" : " + newReview[i].comment +"</li>"); 
       }
    }
}
function submitText(){
    
    var newReview=new Review();
    //get value of restaurant name from title
    newReview.restaurant=$('.restaurantTitle').text();
    //get user name from this login user
    newReview.email=myUser.email;
    // get value of comment from text field
    newReview.comment=$('#say').val();
    //add to database
     Backendless.Persistence.of( Review ).save( newReview );
    showReviews();

}

function onclickPage(){
    //every restaurant name in list have an ID number, when click one of these, set name as the title in review page
    $(document).on('click','#R0',function(){
        $('.restaurantTitle').text($('#R0').text());
    });
   
     $(document).on('click','#R1',function(){
        $('.restaurantTitle').text($('#R1').text());
    });
     $(document).on('click','#R2',function(){
        $('.restaurantTitle').text($('#R2').text());
    });
     $(document).on('click','#R3',function(){
        $('.restaurantTitle').text($('#R3').text());
    });
     $(document).on('click','#R4',function(){
        $('.restaurantTitle').text($('#R4').text());
    });
     $(document).on('click','#R5',function(){
        $('.restaurantTitle').text($('#R5').text());
    });
     $(document).on('click','#R6',function(){
        $('.restaurantTitle').text($('#R6').text());
    });
     $(document).on('click','#R7',function(){
        $('.restaurantTitle').text($('#R7').text());
    });
     $(document).on('click','#R8',function(){
        $('.restaurantTitle').text($('#R8').text());
    });
     $(document).on('click','#R9',function(){
        $('.restaurantTitle').text($('#R9').text());
    });
     $(document).on('click','#R10',function(){
        $('.restaurantTitle').text($('#R10').text());
    });
     $(document).on('click','#R11',function(){
        $('.restaurantTitle').text($('#R11').text());
    });
     $(document).on('click','#R12',function(){
        $('.restaurantTitle').text($('#R12').text());
    });
     $(document).on('click','#R13',function(){
        $('.restaurantTitle').text($('#R13').text());
    });
     $(document).on('click','#R14',function(){
        $('.restaurantTitle').text($('#R14').text());
    });
     $(document).on('click','#R15',function(){
        $('.restaurantTitle').text($('#R15').text());
    });
    
    
}
