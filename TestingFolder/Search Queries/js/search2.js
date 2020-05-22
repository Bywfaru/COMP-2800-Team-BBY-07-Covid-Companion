$(document).ready(function(){
  
  var searchRes = [localStorage.getItem('searchVal')];
  
  function loadResults(){
    console.log(searchRes);
    
    firebase.firestore().collection('Posts').get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        
      var text = (doc.data().postTitle).toLowerCase();
        
      var text2 = (doc.data().postDesc).toLowerCase();
        
      var text3 = (doc.data().thisUserName).toLowerCase();
      
      if(searchRes.some(keyword => text.includes((keyword).toLowerCase()))
        || searchRes.some(keyword => text2.includes((keyword).toLowerCase()))
        || searchRes.some(keyword => text3.includes((keyword).toLowerCase()))) {
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
    } else {
          console.log("not found");
    }
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