//--------------------------------------//
//                                      //
// Constants                            //
//                                      //
//--------------------------------------//

// Item categories.
const itemCategories = ["Select a category...", "Toiletries", "Femenine hygeine", "Cleaning supplies"];
// Service categories.
const serviceCategories = ["Select a category...", "Renovation", "Plumbing", "Electrical"];

//--------------------------------------//
//                                      //
// Global Variables                     //
//                                      //
//--------------------------------------//

// Image upload DOM element.
let itemImgDOM = document.getElementById("postImage");
// Item image name.
let itemImgName = "";

let submissionNo = 0;

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
    db.collection("Posts").orderBy("postNum", "desc").limit(1).get().then(function(snap) {
        snap.forEach(function(obj) {
            submissionNo = obj.data().postNum;
            submissionNo++;
        })
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let post = getValues(user);
            db.collection("Posts").add(post)
            .then(function(docRef) {
                db.collection("Users").doc(user.uid).collection("Posts").doc(docRef.id).set(post);
                window.alert("Successfully posted!");
                return true;
            });
            return false;
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
    let thisUserId;
    let postType;
    let donationType;
    let postTitle;
    let postDesc;
    let postNum;

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
    postNum = submissionNo;
    
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
    // Get file.
    let file = e.target.files[0];

    // Create a storage ref.
    let storageRef = firebase.storage().ref("postImage/" + file.name);

    // Upload file.
    storageRef.put(file);
    
    // Set image name variable.
    itemImgName = file.name;
});