
//======================//
// Global Variables     //
//======================//
let dbRef = db.collection("Posts");
var storage = firebase.storage();
var storageRef = storage.ref();


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

    // Sets the DOM element's values/attributes.
    // TODO: Get the post's information and change the values to the db's values.
    //       Replace all "<db-value>" with the db's value. 

    




    postTitleDOM.innerHTML = "<db-value>"; 
    userNameDOM.innerHTML = "<db-value>";
    imageSectionDOM.src = "<db-value>";
    postDescDOM.innerHTML = "<db-value>";
    userAdDOM = "<db-value>";
    userPostDOM = "<db-value>";
}

function isPoster() {
    
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          userVal = user;
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


//==================================//
//                                  //
// Function Calls                   //
//                                  //
//==================================//

// TODO: Uncomment the line of code below once the function has been updated.
// loadPage();