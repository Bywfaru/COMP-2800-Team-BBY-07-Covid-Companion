//--------------------------------------//
//                                      //
// Constants                            //
//                                      //
//--------------------------------------//


//--------------------------------------//
//                                      //
// Global Variables                     //
//                                      //
//--------------------------------------//

// Image upload DOM element.
let itemImgDOM = document.getElementById("postImage");
// Item image name.
let itemImgName = "";
let dbRef = db.collection("Posts");
let postId = window.localStorage.getItem('postId');
var storage = firebase.storage();
var storageRef = storage.ref();
//let imgPreviewDOM = document.getElementById("preview");

//--------------------------------------//
//                                      //
// Functions                            //
//                                      //
//--------------------------------------//


/**
 * Fill form with current post data to be edited
 * 
 * @param post 
 */
function setUpPage(post) {
    let postTypeDOM = document.getElementById("postType-0");
    let donationTypeDOM = document.getElementById("donationType-0");
    let postTitleDOM = document.getElementById("title");
    let postDescDOM = document.getElementById("postDesc");

    dbRef.doc(post).get()
        .then(function (snap) {
            userId = snap.data().thisUserId;

            if (snap.data().postType == "OFFERING"){
                postTypeDOM.checked = "checked";
            } else {
                document.getElementById("postType-1").checked = "checked";
            }

            if (snap.data().donationType == "Item"){
                donationTypeDOM.checked = "checked";
            } else {
                document.getElementById("donationType-1").checked = "checked";
            }
            postTitleDOM.value = snap.data().postTitle;
            postDescDOM.value = snap.data().postDesc;
            
            // TODO: make preview window for image?
            //storageRef.child('postImage/' + snap.data().itemImgName).getDownloadURL()
            //    .then(function (url) {
            //        imgPreviewDOM.src = url;
            //   });
        })};


/**
 * Updates the category options depending on the category type.
 */
function updateCategoryOptions() {
    let donationType = document.getElementById("donationType-0");
    let selectCategory = document.getElementById("selectCategory");
    let option;

    selectCategory.innerHTML = "";

    if (donationType.checked) {
        for (let i = 0; i < itemCategories.length; i++) {
            option = document.createElement("option");

            if (i == 0) {
                option.value = "";
                option.disabled = "";
                option.selected = "";
            } else {
                option.value = itemCategories[i];
            }

            option.text = itemCategories[i];

            selectCategory.appendChild(option);
        }
    } else {
        for (let i = 0; i < itemCategories.length; i++) {
            option = document.createElement("option");

            if (i == 0) {
                option.value = "";
                option.disabled = "";
                option.selected = "";
            } else {
                option.value = serviceCategories[i];
            }

            option.text = serviceCategories[i];

            selectCategory.appendChild(option);
        }
    }
}

/**
 * Submits the edited post.
*/
function submitPost() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("Posts").orderBy("postNum", "desc").limit(1).get().then(function (snap) {
                snap.forEach(function (obj) {
                    var submissionNo = obj.data().postNum;
                    submissionNo++;

                    let post = getValues(user, submissionNo);
                    db.collection("Posts").doc(postId).set(post)
                    .then(function(docRef) {
                        // update in user's posts
                        db.collection("Users").doc(user.uid).collection("Posts").doc(postId).set(post)
                        alert("Post successfully edited!");
                        window.location.href = "my-posts.html";
                    });
                })
            });
        } else {
            alert("Not signed in!");
        }
    });
}

/**
 * Gets the values from the fieldset.
 */
function getValues(thisUser, submissionNum) {
    // DOM elements
    let postTypeDOM = document.getElementById("postType-0");
    let donationTypeDOM = document.getElementById("donationType-0");
    let postTitleDOM = document.getElementById("title");
    let postDescDOM = document.getElementById("postDesc");

    // Values
    let thisUserId;
    let postType;
    let donationType;
    let postTitle;
    let postDesc;
    let postNum

    // Poster's name
    thisUserId = thisUser.uid;

    // Post type
    if (postTypeDOM.checked) {
        postType = "OFFERING";
    } else {
        postType = "REQUESTING";
    }
    // Donation type
    if (donationTypeDOM.checked) {
        donationType = "item";
    } else {
        donationType = "service";
    }
    // Post title
    postTitle = postTitleDOM.value;

    // Post description
    postDesc = postDescDOM.value;

    // Date posted
    let today = new Date();
    submissionDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // Submission number for ordering
    postNum = submissionNum;

    return {
        thisUserId,
        postType,
        donationType,
        postTitle,
        postDesc,
        submissionDate,
        itemImgName,
        postNum
    };
}

//--------------------------------------//
//                                      //
// Event Listener                       //
//                                      //
//--------------------------------------//

// Listens for the image upload DOM element for an image upload.
itemImgDOM.addEventListener("change", function(e) {
    console.log(e);
    // Get file.
    let file = e.target.files[0];

    // Create a storage ref.
    let storageRef = firebase.storage().ref("postImage/" + file.name);

    // Upload file.
    storageRef.put(file);
    
    // Set image name variable.
    itemImgName = file.name;
});

//--------------------------------------//
//                                      //
// MAIN                                 //
//                                      //
//--------------------------------------//
setUpPage(postId);