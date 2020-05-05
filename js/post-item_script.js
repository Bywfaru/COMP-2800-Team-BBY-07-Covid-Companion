let postsRef = db.collection("Posts");

//======================//
// Functions            //
//======================//

// Returns vaule of selected radio button
function getRadioValue() {
    let radios = document.getElementsByName('postType');

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function handleClick() {
    let postType = getRadioValue();
    let title = document.getElementById("title").value;
    let description = document.getElementById("itemDescription").value;
    let imageString = document.getElementById("postImage").value;

    let obj = {};
    obj["type"] = postType;
    obj["title"] = title;
    obj["postDesc"] = description;
    obj["image"] = imageString;
    postsRef.add(obj).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}