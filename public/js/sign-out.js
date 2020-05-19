$(document).ready(function (){

  document.getElementById("logout").onclick = function (){
    firebase.auth().signOut().then(function() {
        console.log("Signout Successful!");
    }).catch(function(error) {
        console.log("Signout failed");
    });
  }


});