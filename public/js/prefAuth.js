    $(document).ready(function(){
      
/**
 * @desc send the message to firebase
 */
function writeProf() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user){     db.collection("Users").doc(user.uid).onSnapshot(function(c){
      
      var val;
      var val2;
      var val3;
        
        if(document.getElementById("t1").value != ""){
          val = document.getElementById("t1").value;
        } else {
          if(c.data().name != null){
             val = c.data().name;
             } else {
               val = " ";
             }
        }
          
          console.log(val);
      
        if(document.getElementById("t2").value != ""){
          val2 = document.getElementById("t2").value;
        } else {
          if(c.data().addr != null){
             val2 = c.data().addr;
             } else {
               val2 =  " ";
             }
        }
      
        if(document.getElementById("t3").value != ""){
          val3 = document.getElementById("t3").value;
        } else {
          if(c.data().postalCode != null){
          val3 = c.data().postalCode;
             } else {
             val3 = " ";
             }
        }
         db.collection("Users").doc(user.uid).set({
           addr: val2,
           email: c.data().email,
           name: val,
           postalCode: val3,
           userID: user.uid
         }).then(function(){
           
      window.location.replace("UserProf.html");
           
    });
         
        });
        } else {
            alert("You're not logged in!");
        }
    })
}
      
  function setUp(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user){  db.collection("Users").doc(user.uid).onSnapshot(function(c){
        var nameText;
        var addressText;
        var postalCodeText;
        if(c.data().name != null){
        nameText = '<textarea id="t1" placeholder="' + c.data().name + '"></textarea>';
           } else {
        nameText = '<textarea id="t1"></textarea>';
           }
        if(c.data().addr != null){
        addressText = '<textarea id="t2" placeholder="' + c.data().addr + '"></textarea>';
           } else {
        addressText = '<textarea id="t2"></textarea>';
           }
        if(c.data().postalCode != null){
        postalCodeText = '<textarea id="t3" placeholder="' + c.data().postalCode + '"></textarea>';
           } else {
             postalCodeText = '<textarea id="t3"></textarea>';
           }
        $("#nameField").append(nameText);
        $("#addrField").append(addressText);
        $("#postalCodeField").append(postalCodeText);
      });
        } else {
            alert("You're not logged in!");
        }
    })
      }

/**
 * @desc adds onClick to the logout button
 */
function addOnClick() {
    document.getElementById("logoutButton").onclick = logout;
}

/**
 * @desc log out current logged in user.
 */
function logout() {
    firebase.auth().signOut().then(function() {
        window.location.assign("signup.html");
    })
}
      
      setUp();
      
      document.getElementById("profPage").onclick = function(){
        
        writeProf();
      
      }
      
    });