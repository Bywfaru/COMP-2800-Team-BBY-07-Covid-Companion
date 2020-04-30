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
    let post = getValues();

    let itemRef = db.collection("Items").add(post);
}

/**
 * Gets the values from the fieldset.
 */
function getValues() {
    // DOM elements
    let postTypeDOM = document.getElementById("postType-0");
    let donationTypeDOM = document.getElementById("donationType-0");
    let itemNameDOM = document.getElementById("itemName");
    let itemDescDOM = document.getElementById("itemDescription");
    let itemQtyDOM = document.getElementById("selectQty");
    let commentsDOM = document.getElementById("taComments");
    let itemCatDOM = document.getElementById("selectCategory");;
    let itemImgDOM = document.getElementById("postImage");
    // Values
    let postType;
    let donationType;
    let itemName;
    let itemDesc;
    let itemQty;
    let comments;
    let itemCat;
    let itemImg;

    // Post type
    if (postTypeDOM.checked) {
        postType = "donate";
    } else {
        postType = "receive";
    }
    // Donation type
    if (donationTypeDOM.checked) {
        donationType = "item";
    } else {
        donationType = "service";
    }
    // Item name
    itemName = itemNameDOM.value;
    // Item description
    itemDesc = itemDescDOM.value;
    // Item quantity
    if (itemQtyDOM.value != "more") {
        itemQty = itemQtyDOM.value;
    } else {
        itemQtyDOM = document.getElementById("textQty");
        itemQty = itemQtyDOM.value;
    }
    // Comments
    comments = commentsDOM.value;
    // Item category
    itemCat = itemCatDOM.value;
    // Item image
    itemImg = "imageFile";
    //itemImg = itemImgDOM.files;

    return {thisUser, postType, donationType, itemName, itemDesc, itemQty, comments, itemCat, itemImg};
}

/**
 * Retrieves and sets the current user.
 */
function getUser() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            thisUser = user;
        } else {
            alert("Not signed in!");
        }
    });
}

//--------------------------------------//
//                                      //
// Method Calls                         //
//                                      //
//--------------------------------------//

//getUser();