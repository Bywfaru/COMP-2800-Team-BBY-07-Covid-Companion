//======================//
// Global Variables     //
//======================//
let dbRef = db.collection("Posts");
let userRef = db.collection("Users");
var storage = firebase.storage();
var storageRef = storage.ref();
let postId = window.localStorage.getItem('postId');
var userId;

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
    let savePostDOM = document.getElementById("save");
    // This DOM element is purposely hidden.

    // Sets the DOM element's values/attributes
    dbRef.doc(postId).get()
        .then(function (snap) {
            userId = snap.data().thisUserId;

            // Gets the poster's name by their ID.
            db.collection("Users").doc(userId).get()
                .then(function (snap) {
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
            savePostDOM.onclick = savePost;

            isPosterOwner();
        });
}

/**
 * If user is the post owner, then generate a delete post button and removes the message button.
 */
function isPosterOwner() {
    firebase.auth().onAuthStateChanged(function (user) {
        let postCreatorId = document.getElementById("userId").value;

        if (user.uid == postCreatorId) {
            let deleteButton = document.createElement("button");
            let messageButton = document.getElementById("message");

            deleteButton.innerHTML = "Delete Post";
            deleteButton.onclick = deletePost;
            // generate delete post
            document.getElementById("postDiv").appendChild(deleteButton);
            document.getElementById("postDiv").removeChild(messageButton);
        }
    })
}

/**
 * Saves the postID under the user's "SavedPosts" collection.
 */
function savePost() {
    firebase.auth().onAuthStateChanged(function (user) {
        userRef.doc(user.uid).collection("SavedPosts").doc(postId).set({
                postId: postId
            })
            .then(function () {
                alert("Post successfully saved!");
            })
    })
};

/**
 * Removes the post from the db entirely.
 */
function deletePost() {
    dbRef.doc(postId).delete()
        .then(function () {
            userRef.doc(userId).collection("Posts").doc(postId).delete();
            alert("Post successfully deleted!");
            window.location.href = "main.html";
        });
        
        

    // TODO: if post is deleted, the post must also be deleted from all user's saved posts
    //userRef.get()
    //    .then(function (snapshot) {
    //        snapshot.forEach(function(doc){
    //            if ()
    //        })
    //})
};


/**
 * Message the poster.
 */
function messagePoster() {
    firebase.auth().onAuthStateChanged(function (user) {
        let posterId = document.getElementById("userId").value; // Gets the poster's user ID.
        console.log("Poster's id: " + posterId);
        console.log("Viewer's id: " + user.uid);
        localStorage.setItem("chatId", null); // Sets the local storage's chat ID to null so that a new message is
        // created.
        localStorage.setItem("posterId", posterId); // Sets the local storage's poster ID to the poster's ID.

        window.location.href = "chat-room.html"; // Redirects to "chat-room.html."
    });
}

//==================================//
//                                  //
// Function Calls                   //
//                                  //
//==================================//

loadPage();