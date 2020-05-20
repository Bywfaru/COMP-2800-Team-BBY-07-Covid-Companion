    $(document).ready(function(){
      
   
      
      document.getElementById("butt").onclick = function () {
        window.location.replace("user-prof.html");
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
      
      
      
    });