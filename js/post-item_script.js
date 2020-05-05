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

    firebase.firestore().collection("Posts").add({
            type: postType,
            title: title,
            postDesc: description
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    alert("Your post has been successfuly posted! (Maybe we should have a confirmation check here)");
}