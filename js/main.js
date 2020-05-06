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

//======================//
// HTML DOM Elements    //
//======================//


//======================//
// Constructors         //
//======================//


//======================//
// Functions            //
//======================//

// gets OLDEST posts from DB (default)
function getPosts() {
    dbRef.orderBy("submissionDate")
        .get()
        .then(function (snap) {
            displayCards(snap);
        });
}

// get NEWEST posts from DB
function getNew() {
    // TODO
}

// get OFFERING posts from DB
function getOffers() {
    // TODO
}

// get REQUESTING posts from DB
function getRequests() {
    // TODO
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
    var text = document.createTextNode(c.data().type + ":");
    type.appendChild(text);

    // Post TITLE
    var title = document.createElement("h4");
    title.setAttribute("class", "card-text");
    var text = document.createTextNode(c.data().title);
    title.appendChild(text);

    // Post IMAGE
    var image = document.createElement("img");
    image.setAttribute("class", "card-img");
    image.src = c.data().image;

    // Post DESCRIPTION
    var desc = document.createElement("p");
    desc.setAttribute("class", "card-text");
    var text = document.createTextNode(c.data().postDesc);
    desc.appendChild(text);

    // Posted DATE
    var date = document.createElement("p");
    date.setAttribute("class", "card-text");
    let subDate = c.data().submissionDate; // STRING
    // TODO: display date in the form of "April, 20, 2020"

    let d = new Date(subDate);

    let year = d.getFullYear();
    let month = monthNames[d.getMonth()];
    let day = d.getDay();

    var text = document.createTextNode(month + " " + day + ", " + year);
    date.appendChild(text);


    // View Post button
    var a = document.createElement("input");
    a.type = "button"
    a.setAttribute("value", "View");
    a.addEventListener('click', function () {
        window.location.href = "posttemplate.html";
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


function getDate() {

}

//======================//
// Main()               //
//======================//
getPosts();