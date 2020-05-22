$(document).ready(function(){
  
  document.getElementById("searchButt").onclick = function(){
    var superVal = document.getElementById("search").value;
    console.log(superVal);
    localStorage.setItem('searchVal', superVal);
    window.location.replace("search-res.html");  
  };
  
  
})