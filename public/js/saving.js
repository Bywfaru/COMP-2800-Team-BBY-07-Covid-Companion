//======================//
// Button Event         //
//======================//

/**
 * @desc send the message to firebase
 */
function savePost() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user){ db.collection("Users").doc(user.uid).collection("SavedPosts").add({
          }).then(function(docRef){
         db.collection("Users").doc(user.uid).collection("SavedPosts").doc(docRef.id).set({
           savedPostNo: docRef.id,
           postNo: "Ok2Bb5O8dW4bs9LwENUg"
       })
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

//addOnClick();
