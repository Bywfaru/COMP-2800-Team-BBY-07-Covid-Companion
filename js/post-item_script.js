const itemCategories = ["Select a category...", "Toiletries", "Femenine hygeine", "Cleaning supplies"];
const serviceCategories = ["Select a category...", "Renovation", "Plumbing", "Electrical"];

function updateQtyDisplay() {
    let radioService = document.getElementById("donationType-1");
    let selectQty = document.getElementById("selectQty-container");

    if (radioService.checked) {
        selectQty.style.display = "none";
    } else {
        selectQty.style.display = "block";
    }
}

function updateTextQtyDisplay() {
    let selectQty = document.getElementById("selectQty");
    let textQty = document.getElementById("textQty-container");
    
    if (selectQty.value == "more") {
        textQty.style.display = "block";
    } else {
        textQty.style.display = "none";
    }
}

function updateCategoryOptions() {
<<<<<<< HEAD
    let postTypeItem = document.getElementById("postType-0");
=======
    let donationType = document.getElementById("donationType-0");
>>>>>>> post-item_branch
    let selectCategory = document.getElementById("selectCategory");
    let option;

    selectCategory.innerHTML = "";
<<<<<<< HEAD
    
    if (postTypeItem.checked) {
=======

    if (donationType.checked) {
>>>>>>> post-item_branch
        for (let i = 0; i < itemCategories.length; i++) {
            option = document.createElement("option");

            if (i == 0) {
                option.value = "";
<<<<<<< HEAD
                option.disabled = true;
                option.selected = true; 
            } else {
                option.value = itemCategories[i];
                option.text = itemCategories[i];
            }

=======
                option.disabled = "";
                option.selected = ""; 
            } else {
                option.value = itemCategories[i];
            }

            option.text = itemCategories[i];

>>>>>>> post-item_branch
            selectCategory.appendChild(option);
        }
    } else {
        for (let i = 0; i < itemCategories.length; i++) {
            option = document.createElement("option");

            if (i == 0) {
                option.value = "";
<<<<<<< HEAD
                option.disabled = true;
                option.selected = true; 
=======
                option.disabled = "";
                option.selected = ""; 
>>>>>>> post-item_branch
            } else {
                option.value = serviceCategories[i];
            }

            option.text = serviceCategories[i];

            selectCategory.appendChild(option);
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> post-item_branch
