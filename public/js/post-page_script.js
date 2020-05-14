//======================//
// Global Variables     //
//======================//
let dbRef = db.collection("Posts");
var storage = firebase.storage();
var storageRef = storage.ref();
let postId = window.localStorage.getItem('postId');

//==================================//
//                                  //
// Functions                        //
//                                  //
//==================================//

/**
 * Sets the page values with the db's. Should be called after document loads.
 */
function loadPage() {
    // DOM Elements.
    let postTitleDOM = document.getElementById("postTitle"); // Post's title.
    let userNameDOM = document.getElementById("userName"); // Post creator's name.
    let imageSectionDOM = document.getElementById("imageSection"); // Post's image.
    let postDescDOM = document.getElementById("postDesc"); // Post's description.
    let userAdDOM = document.getElementById("userAd"); // Post creator's address.
    let userPostDOM = document.getElementById("userPost"); // Post creator's postal code.
    let userIdDOM = document.getElementById("userId"); // Post creator's user ID.
                                                       // This DOM element is purposely hidden.

    // Sets the DOM element's values/attributes
    dbRef.doc(postId).get()
    .then(function (snap) {
        let userId = snap.data().thisUserId;

        // Gets the poster's name by their ID.
        db.collection("Users").doc(userId).get()
        .then(function(snap) {
            userNameDOM.innerHTML = snap.data().name;
        });

        postTitleDOM.innerHTML = snap.data().postTitle;
        storageRef.child('postImage/' + snap.data().itemImgName).getDownloadURL()
        .then(function (url) {
            imageSectionDOM.src = url;
        });
        postDescDOM.innerHTML = snap.data().postDesc;
        userAdDOM.innerHTML = "<db-value>";
        userPostDOM.innerHTML = "<db-value>";
        userIdDOM.value = userId;
    });
}

/**
 * If user is the post owner, then generate a delete post button.
 */
function isPosterOwner() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user.id) {
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete Post";
            // generate delete post
        }
    })
}

//==================================//
//                                  //
// Function Calls                   //
//                                  //
//==================================//

// TODO: Uncomment the line of code below once the function has been updated.
loadPage();