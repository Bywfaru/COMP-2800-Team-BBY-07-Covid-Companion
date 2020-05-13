//======================//
// Constants            //
//======================//
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

//======================//
// Global Variables     //
//======================//
let dbRef = db.collection("Users");

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

//======================//
// HTML DOM Elements    //
//======================//


//======================//
// Constructors         //
//======================//


//======================//
// Functions            //
//======================//

// get newest posts from DB
function getPosts() {
    document.getElementById("cards").innerHTML = '';

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            dbRef.doc(user.uid).collection("Posts")
                .get()
                .then(function (snap) {
                    displayCards(snap);
                    console.log(snap);
                })
        } else {
            alert("Not signed in!");
            window.location.href = "index.html"
        }
    });
}

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
        window.location.href = "PostTemplate.html";
    });
    a.setAttribute("class", "btn btn-outline-secondary");
    var text = document.createTextNode("View Post");
    a.appendChild(text);

    // View Post button
    var b = document.createElement("input");
    b.type = "button"
    b.setAttribute("value", "Edit Post");
    b.addEventListener('click', function () {
        editPost(c.id);
    });
    b.setAttribute("class", "btn btn-outline-secondary");
    var text = document.createTextNode("Edit Post");
    b.appendChild(text);

    // Stitch it all together 
    cardbodydiv.appendChild(type);
    cardbodydiv.appendChild(title);
    cardbodydiv.appendChild(image);
    cardbodydiv.appendChild(desc);
    cardbodydiv.appendChild(date);
    cardbodydiv.appendChild(a);
    cardbodydiv.appendChild(b);
    carddiv.appendChild(cardbodydiv);
    coldiv.appendChild(carddiv);
    document.getElementById("cards").appendChild(coldiv); //stick it in the div
}


function editPost(postId) {
    window.localStorage.setItem('postId', postId);
    window.location.href = "editPost.html"
}

//======================//
// Main()               //
//======================//
getPosts();