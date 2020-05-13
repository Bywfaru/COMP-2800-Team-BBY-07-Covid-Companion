/**
 
function loadSaves(){

var listOfObjects = [];

var lastincol;

db.collection('SavedPosts').get().then(function(querySnapshot){

});
    db.collection('SavedPosts').get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            if(doc.data().saverID == "1j77JwtPUW4p8aBCQZV1"){
                db.collection('Posts').doc(doc.data().postNo).onSnapshot(
                function (c){
                    var postNum = (c.data().postNo);
                    var date = (c.data().expiryDate);
                    var newObject = {"postNumber": postNum, "expires": date};
                    listOfObjects.push(newObject);
                    listOfObjects.sort((a, b) => (a.expires > b.expires) ? -1 : 1);
                    console.log(listOfObjects);
                    for(let i = 0; i < listOfObjects.length; i++){
                        console.log((listOfObjects[i]).postNumber);
                        $(document).ready(function () {
                        var value = '<li><a>' + (listOfObjects[i]).postNumber + '</a></li>';
                        $("#savePosts").append(value);
                    });
                }
                });
            }
        });
    });
}

loadSaves();

*/