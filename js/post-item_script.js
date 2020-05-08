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

// The user currently signed in.
let thisUser = "test";
// Image upload DOM element.
let itemImgDOM = document.getElementById("postImage");

//--------------------------------------//
//                                      //
// Functions                            //
//                                      //
//--------------------------------------//

/**
 * Shows and hides the quantity menu depending on the category type.
 */
function updateQtyDisplay() {
    let radioService = document.getElementById("donationType-1");
    let selectQty = document.getElementById("selectQty-container");

    if (radioService.checked) {
        selectQty.style.display = "none";
    } else {
        selectQty.style.display = "block";
    }
}

/**
 * Shows text input for quantity of "More..." is selected from the quantity select box.
 */
function updateTextQtyDisplay() {
    let selectQty = document.getElementById("selectQty");
    let textQty = document.getElementById("textQty-container");

    if (selectQty.value == "more") {
        textQty.style.display = "block";
    } else {
        textQty.style.display = "none";
    }
}

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
        if (user) {
            thisUser = user;

            let post = getValues();
            console.log(post);
            db.collection("Posts").add(post).then(function() {
                alert();
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
function getValues() {
    // DOM elements
    let postTypeDOM = document.getElementById("postType-0");
    let donationTypeDOM = document.getElementById("donationType-0");
    let postTitleDOM = document.getElementById("postTitle");
    let postDescDOM = document.getElementById("postDesc");

    // Values
    let postType;
    let donationType;
    let postTitle;
    let postDesc;
    let itemImg;

    // Post type
    if (postTypeDOM.checked) {
        postType = "OFFERING";
    } else {
        postType = "REQEUSTING";
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

    // TODO: save image and reference in firebase storage
    // Item image
    itemImgDOM.addEventListener('change', function(e) {
    // get file
    var file = e.target.files[0];
    // create storage ref
    var storageRef = firebase.storage().ref('images'/ + file.name);
    // upload file
    var task = storageRef.put(file);
})
    
    itemImg = storageRef;
    
    return {
        thisUser,
        postType,
        donationType,
        postTitle,
        postDesc,
        submissionDate,
        itemImg
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
});