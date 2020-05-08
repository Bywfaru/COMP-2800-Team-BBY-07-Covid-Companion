$(document).ready(function (){
  
  
  var newPassword;

//======================//
// Button Event         //
//======================//

/**
 * @desc send the message to firebase
 */
function changePass() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user){
            newPassword = document.getElementById("inpt").value;
            console.log(newPassword);
          if(newPassword != null &&
            newPassword != ""){
            
          user.sendEmailVerification();
            
          user.updatePassword(newPassword).then(function(){
            
            console.log("Change Successful");
            
            window.location.assign("UserProf.html");

            }).catch(function(err){
              console.log("Error was found" + err);
            });
            
          } else {
            window.location.assign("UserProf.html");
            console.log("New Password was Null");
          }
          
        } else {
            alert("You're not logged in!");
        }
    })
}

/**
 * @desc adds onClick to the logout button
 */
function addOnClick() {
    document.getElementById("logoutButton").onclick = logout;
}

/**
 * @desc log out current logged in user.
 */
function logout() {
    firebase.auth().signOut().then(function() {
        window.location.assign("signup.html");
    })
}
  
 function changePage(){
        window.location.assign("UserProf.html");
 }
  
  document.getElementById("sub").onclick = changePass;
  
  document.getElementById("return").onclick = changePage;

//addOnClick();

  
});