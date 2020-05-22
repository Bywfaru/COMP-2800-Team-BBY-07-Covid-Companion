    $(document).ready(function(){
      
/**
 * @desc send the message to firebase
 */
function loadMessages() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user){  db.collection('Users').doc("1j77JwtPUW4p8aBCQZV1").collection('Chats').get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
                var value = '<p><a>' + doc.data().chatId + '</a></p>';
                $("#message-list").append(value);
          });
        });
        } else {
            alert("You're not logged in!");
           db.collection('Users').doc("1j77JwtPUW4p8aBCQZV1").collection('Chats').get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
                var value = '<p><a>' + doc.data().chatId + '</a><br><button type="button"> Visit Chat </button></p>';
                $("#message-list").append(value);
          });
        });
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
      loadMessages();
      
    });