function getDocument(doc1){
  localStorage.setItem('curPost', doc1);
  window.location.replace("post-template.html");
      }

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
                var postNumber = doc.data().postNo;
                var value = '<p>' + postNumber + '<br><button type="button" onclick="getDocument(\'' + postNumber + '\')">View Post</button></p><br>';
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