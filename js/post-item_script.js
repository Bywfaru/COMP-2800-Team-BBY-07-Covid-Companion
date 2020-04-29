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
    let postTypeItem = document.getElementById("postType-0");
    let selectCategory = document.getElementById("selectCategory");
    let option;

    selectCategory.innerHTML = "";
    
    if (postTypeItem.checked) {
        for (let i = 0; i < itemCategories.length; i++) {
            option = document.createElement("option");

            if (i == 0) {
                option.value = "";
                option.disabled = true;
                option.selected = true; 
            } else {
                option.value = itemCategories[i];
                option.text = itemCategories[i];
            }

            selectCategory.appendChild(option);
        }
    } else {
        for (let i = 0; i < itemCategories.length; i++) {
            option = document.createElement("option");

            if (i == 0) {
                option.value = "";
                option.disabled = true;
                option.selected = true; 
            } else {
                option.value = serviceCategories[i];
            }

            option.text = serviceCategories[i];

            selectCategory.appendChild(option);
        }
    }
}
