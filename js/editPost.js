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

let postId = window.localStorage.getItem('postId');

//--------------------------------------//
//                                      //
// Functions                            //
//                                      //
//--------------------------------------//

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
 * Submits the post.
 */
function submitPost() {
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        if (user) {
            let post = getValues(user);
            //TODO: update post in db
            db.collection("Posts").doc(postId).set(post);
            db.collection("Users").doc(postId).set(post);
        } else {
            alert("Not signed in!");
        }
    });
}

/**
 * Gets the values from the fieldset.
 */
function getValues(thisUser) {
    // DOM elements
    let postTypeDOM = document.getElementById("postType-0");
    let donationTypeDOM = document.getElementById("donationType-0");
    let postTitleDOM = document.getElementById("title");
    let postDescDOM = document.getElementById("postDesc");

    // Values
    let thisUserName;
    let postType;
    let donationType;
    let postTitle;
    let postDesc;

    // Poster's name
    thisUserName = thisUser.displayName;

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

    return {
        thisUserName,
        postType,
        donationType,
        postTitle,
        postDesc,
        submissionDate,
        itemImgName
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