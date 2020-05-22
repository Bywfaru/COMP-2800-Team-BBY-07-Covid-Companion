$(document).ready(function(){
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
  
  var storage = firebase.storage();
  
  var round = 1;
  
  var hasRes = false;
  
  var storageRef = storage.ref();
  
  var searchRes = [localStorage.getItem('searchVal')];
  
  function loadResults(){
    console.log(searchRes);
    
    firebase.firestore().collection('Posts').get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        firebase.firestore().collection('Users').doc(doc.data().thisUserId).get().then(doc1 => {
                  
      var text = (doc.data().postTitle).toLowerCase();
        
      var text2 = (doc.data().postDesc).toLowerCase();
        
      var text3 = (doc1.data().name).toLowerCase();
     
      if(searchRes.some(keyword => text.includes((keyword).toLowerCase()))
        || searchRes.some(keyword => text2.includes((keyword).toLowerCase()))
        || searchRes.some(keyword => text3.includes((keyword).toLowerCase()))) {
        
        hasRes = true;
        
    var coldiv = document.createElement("div");
    coldiv.setAttribute("class", "col-md-auto");

    var carddiv = document.createElement("div");
    carddiv.setAttribute("class", "card");

    var cardbodydiv = document.createElement("div");
    cardbodydiv.setAttribute("class", "card-body");

    // Post TYPE
    var type = document.createElement("h4");
    type.setAttribute("class", "card-title");
    var text = document.createTextNode(doc.data().postType + ":");
    type.appendChild(text);

    // Post TITLE
    var title = document.createElement("h4");
    title.setAttribute("class", "card-text");
    var text = document.createTextNode(doc.data().postTitle);
    title.appendChild(text);

    // Post IMAGE
    var image = document.createElement("img");
    image.setAttribute("class", "card-img");
    storageRef.child('postImage/' + doc.data().itemImgName).getDownloadURL().then(function (url) {
        image.src = url;
    });

    // Post DESCRIPTION
    var desc = document.createElement("p");
    desc.setAttribute("class", "card-text");
    var text = document.createTextNode(doc.data().postDesc);
    desc.appendChild(text);

    // Posted DATE
    var date = document.createElement("p");
    date.setAttribute("class", "card-text");
    let subDate = doc.data().submissionDate; // STRING

    let d = new Date(subDate);

    let year = d.getFullYear();
    let month = monthNames[d.getMonth()];
    let day = d.getDate();

    var text = document.createTextNode(month + " " + day + ", " + year);
    date.appendChild(text);

    // View Post button
    var a = document.createElement("input");
    a.type = "button"
    a.setAttribute("value", "View Post");
    a.addEventListener('click', function () {
        window.location.href = "post-page.html";
    });
    a.setAttribute("class", "btn btn-outline-secondary");
    var text = document.createTextNode("View Post");
    a.appendChild(text);

    // Stitch it all together 
    cardbodydiv.appendChild(type);
    cardbodydiv.appendChild(title);
    cardbodydiv.appendChild(image);
    cardbodydiv.appendChild(desc);
    cardbodydiv.appendChild(date);
    cardbodydiv.appendChild(a);
    carddiv.appendChild(cardbodydiv);
    coldiv.appendChild(carddiv);
    document.getElementById("postings").appendChild(coldiv); 
        //stick it in the div
        /**
          var addition = '<p>';
          if(doc.data().itemImgName != null){
            addition += '<img src="' + doc.data().itemImgName + '"><br>';
          }
          addition += '<span>' + doc.data().postTitle + '</span><br>';
          addition += '<span>' + doc.data().thisUserName + '</span><br>';
          addition += '<span>' + doc.data().postType + '</span><br>';
          addition += '<span><button>Visit Post</button></span>';
          addition += '</p><br>'
          $('#postings').append(addition);
          */
    } else {
          console.log("not found");
    }
          if(round == querySnapshot.size){
            if(hasRes == false){
            var breaker = document.createElement("br");
            var noResults = document.createElement("h1");
            var text = document.createTextNode("No Posts Found Under '" + searchRes + "' Keyword");
            noResults.appendChild(text);
            document.getElementById("postings").appendChild(breaker);
            document.getElementById("postings").appendChild(noResults);
            } else {
              console.log("Results Found");
            }
          }
          round++;
        });
      });
    });

  // do something
};
  
  document.getElementById("searchButt").onclick = function(){
    var superVal = document.getElementById("search").value;
    console.log(superVal);
    localStorage.setItem('searchVal', superVal);
    window.location.replace("search-res.html");  
  };
  
  loadResults();
  
})