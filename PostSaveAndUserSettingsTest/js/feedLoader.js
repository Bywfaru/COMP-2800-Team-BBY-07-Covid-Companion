    $(document).ready(function(){
      
/**
 * @desc send the message to firebase
 */
function loadUser() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user){        db.collection("Users").doc(user.uid).onSnapshot(
      function (c){
        if(c.data().name != null){
        document.getElementById("userName").innerHTML = c.data().name;
        }
        if(c.data().email != null){
        document.getElementById("useremail").innerHTML = c.data().email; 
        }
        if(c.data().addr != null){
        document.getElementById("userAd").innerHTML = c.data().addr;
           }
        if(c.data().postalCode != null){
        document.getElementById("userPost").innerHTML = c.data().postalCode;
           }
        if(c.data().profImage != null){
        $("#imageSection").append('<img id="img1" src='
           + c.data().profImage + '>');
           }
      });
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
      loadUser();
      
   document.getElementById("butt2").onclick = function () {
        window.location.replace("UserFeed.html");
      }
   
     document.getElementById("prefPage").onclick = function () {
        window.location.replace("UserPref.html");
      }
      
    });