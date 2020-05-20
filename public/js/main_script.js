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

//TODO: create dynamic grid with cards
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


//======================//
// Main()               //
//======================//
getPosts();

