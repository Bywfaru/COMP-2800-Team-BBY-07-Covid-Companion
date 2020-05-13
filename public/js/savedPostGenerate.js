    $(document).ready(function(){
      
      document.getElementById("butt").onclick = function () {
        window.location.replace("user-prof.html");
      }
      
/**
 * @desc send the message to firebase
 */
function loadPost() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user){  db.collection('Users').doc(user.uid).collection('SavedPosts').get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
                var value = '<li><a>' + doc.data().postNo + '</a></li>';
                $("#savePosts").append(value);
          });
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
      loadPost();
      
    });