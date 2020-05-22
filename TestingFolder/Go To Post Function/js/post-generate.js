     
   $(document).ready(function(){
     
     var sender = Storage.getItem('curPost');
     
     console.log(sender);
    
    if(sender != null &&
      sender != undefined){
      
   db.collection("Posts").doc(sender)
    .onSnapshot(function (c) {
     if(c.data().title != ""){
    document.getElementById("userName").innerHTML = c.data().title;
     } else {
    document.getElementById("userName").innerHTML = "N/A";
     }
     if(c.data().postDesc != ""){
    document.getElementById("userDesc").innerHTML = c.data().postDesc;
     } else {
    document.getElementById("userDesc").innerHTML = "N/A";
     }
     
    sender = c.data().submitterNo;
      
  db.collection("Users").doc(c.data().submitterNo).onSnapshot(function (d){
    if(d.data().addr != ""){
    document.getElementById("userAd").innerHTML = d.data().addr;
    } else {
    document.getElementById("userAd").innerHTML = "N/A";
    }
    if(d.data().postalCode != ""){
     document.getElementById("userPost").innerHTML = d.data().postalCode;
    } else {
     document.getElementById("userPost").innerHTML = "N/A";
    }
    if(c.data().image != ""){
      $("#imageSection").append('<img id="img1" src='
           + c.data().image + '>');
     
       } else {
            $("#imageSection").append('<img id="img1" src='
           + 'download.png' + '>');
       }
    })
   
    })
      
    var box = '<textarea id="box1" placeholder="Your Message Here"></textarea>';
      
    var break1 = '<br></br>'
      
    var button1 = '<button id="but2"> Send Message </button>'
      
    var mes = 1;
      
    $("#box1").css('width', '100%'); 
      
    $("#box1").css('height', '100%'); 
      
    $(".Messenger").css('padding-left','30%');
      
    $(".Messenger").css('padding-right','30%');
      
    $(".Messenger").css('padding-top','5%');
      
    $(".Messenger").append(box);
      
    $(".Messenger").append(break1);
      
    $(".Messenger").append(button1);
      
    $(".Messenger").hide();
      
    document.getElementById("but1").onclick = function () {
      
      if(mes == 1){
        
            $(".Messenger").show();
            mes = 0;
         
         } else{
           
            $(".Messenger").hide();
            mes = 1;
           
         }
    };
     
    document.getElementById("but2").onclick = function(){
      
      var messageCont = document.getElementById("box1").value;
      
      var date = new Date();
      
      /** Will find a way to add senderID through firebaseAuth*/
      
      db.collection("Messages").add({
        recipientID: sender,
        senderID: "hOH2MQ9jZ2TvAuxEgDkN",
        mesDesc: messageCont,
        sentDate: date
      }).then(function (){
              if(mes == 1){
        
            $(".Messenger").show();
            mes = 0;
         
         } else{
           
            $(".Messenger").hide();
            mes = 1;
           
         }
      });
    };
     
    document.getElementById("but3").onclick(savePost());
      
    }
     
 });