//======================//
// Constants            //
//======================//
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

//======================//
// Global Variables     //
//======================//
let dbRef = db.collection("Posts");

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
    dbRef.orderBy("postNum", "desc")
        .get()
        .then(function (snap) {
            displayCards(snap);
        });
}

// get oldest posts from DB
function getOldestPosts() {
    document.getElementById("cards").innerHTML = '';
    dbRef.orderBy("postNum")
        .get()
        .then(function (snap) {
            displayCards(snap);
        });
}

// get offer posts from DB
function getOffers() {
    document.getElementById("cards").innerHTML = '';
    dbRef.where("postType", "==", "OFFERING")
        .get()
        .then(function (snap) {
            displayCards(snap);
        });
}

// get request posts from DB
function getRequests() {
    document.getElementById("cards").innerHTML = '';
    dbRef.where("postType", "==", "REQUESTING")
        .get()
        .then(function (snap) {
            displayCards(snap);
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
    a.setAttribute("value", "View");
    a.addEventListener('click', function () {
        window.location.href = "post-page.html";
        let postId = c.id;
        window.localStorage.setItem("postId", postId);
    });
    a.setAttribute("class", "btn btn-outline-secondary");
    var text = document.createTextNode("View Gym");
    a.appendChild(text);

    // Stitch it all together 
    cardbodydiv.appendChild(type);
    cardbodydiv.appendChild(title);
    cardbodydiv.appendChild(image);
    cardbodydiv.appendChild(desc);
    cardbodydiv.appendChild(date);
    cardbodydiv.appendChild(a);
    carddiv.appendChild(cardbodydiv);
    coldiv.appendChild(carddiv);
    document.getElementById("cards").appendChild(coldiv); //stick it in the div
}

//======================//
// Main()               //
//======================//
getPosts();

// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;

// List View
function listView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "100%";
  }
}

// Grid View
function gridView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "75%";
  }
}