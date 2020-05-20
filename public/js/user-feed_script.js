//======================//
// Constants            //
//======================//
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
//======================//
// Global Variables     //
//======================//
let userRef = db.collection("Users");
let postRef = db.collection("Posts");
var storage = firebase.storage();
var storageRef = storage.ref();
var userVal;

//==================================//
//                                  //
// Functions                        //
//                                  //
//==================================//

// Get the user's SavedPosts collection from DB
function getSavedPosts() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userVal = user;
            userRef.doc(user.uid).collection("SavedPosts")
                .get()
                .then(function (snap) {
                    getPosts(snap);
                })
        } else {
            alert("Not signed in!");
            window.location.href = "index.html"
        }
    });
}

/**
 * Get the saved posts from db
 * 
 * @param snapshot the collection of the user's saved posts
 */
function getPosts(snapshot) {
    snapshot.forEach(function (doc) {
        postRef.doc(doc.data().postId)
            .get()
            .then(function (snap) {
                createOneCard(snap);
            })
    })
};

/**
 * Displays the post cards.
 * 
 * @param CardObjects the collection of posts
 */
function displayCards(CardObjects) { //takes in collection
    CardObjects.forEach(function (doc) { //cycle thru collection
        createOneCard(doc); //create card for one post
    })
};

/**
 * Creates a post.
 * 
 * @param c the post document
 */
function createOneCard(c) {
    if (typeof c.data() === 'undefined') {
        return;
    }

    let thisPostId = String(c.id);
    var coldiv = document.createElement("div");
    coldiv.setAttribute("class", "col-md-auto");

    var carddiv = document.createElement("div");
    carddiv.setAttribute("class", "card");

    var cardbodydiv = document.createElement("div");
    cardbodydiv.setAttribute("class", "card-body");

    // Post TYPE
    var type = document.createElement("h4");
    type.setAttribute("class", "card-title");
    var text = document.createTextNode(c.data().postType + ":");
    type.appendChild(text);

    // Post TITLE
    var title = document.createElement("h4");
    title.setAttribute("class", "card-text");
    var text = document.createTextNode(c.data().postTitle);
    title.appendChild(text);

    // Post IMAGE
    var image = document.createElement("img");
    image.setAttribute("class", "card-img");
    storageRef.child('postImage/' + c.data().itemImgName).getDownloadURL().then(function (url) {
        image.src = url;
    });

    // Post DESCRIPTION
    var desc = document.createElement("p");
    desc.setAttribute("class", "card-text");
    var text = document.createTextNode(c.data().postDesc);
    desc.appendChild(text);

    // Posted DATE
    var date = document.createElement("p");
    date.setAttribute("class", "card-text");
    let subDate = c.data().submissionDate; // STRING

    let d = new Date(subDate);

    let year = d.getFullYear();
    let month = monthNames[d.getMonth()];
    let day = d.getDate();

    var text = document.createTextNode(month + " " + day + ", " + year);
    date.appendChild(text);

    // View Post button
    var a = document.createElement("input");
    a.type = "button"
    a.setAttribute("value", "View Post");
    a.addEventListener('click', function () {
        let postId = thisPostId;
        window.localStorage.setItem("postId", postId);
        window.location.href = "post-page.html";
    });
    a.setAttribute("class", "btn btn-outline-secondary");
    var text = document.createTextNode("View Post");
    a.appendChild(text);

    // Remove Saved Post button
    var c = document.createElement("input");
    c.type = "button"
    c.setAttribute("value", "Remove");
    c.addEventListener('click', function () {
        removePost(thisPostId);
    });
    c.setAttribute("class", "btn btn-outline-secondary");
    var text = document.createTextNode("Remove");
    c.appendChild(text);

    // Stitch it all together 
    cardbodydiv.appendChild(type);
    cardbodydiv.appendChild(title);
    cardbodydiv.appendChild(image);
    cardbodydiv.appendChild(desc);
    cardbodydiv.appendChild(date);
    cardbodydiv.appendChild(a);
    cardbodydiv.appendChild(c);
    carddiv.appendChild(cardbodydiv);
    coldiv.appendChild(carddiv);
    document.getElementById("cards").appendChild(coldiv); //stick it in the div
}

function removePost(id) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userRef.doc(user.uid).collection("SavedPosts").doc(id)
                .delete()
                .then(function (snap) {
                    alert("Post successfully removed!");
                    location.reload();
                })
        }
    });
}

//==================================//
//                                  //
// Function Calls                   //
//                                  //
//==================================//

getSavedPosts();