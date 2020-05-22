//======================//
// Constants            //
//======================//

const MONTH = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

//======================//
// Global Variables     //
//======================//

let elements;
let chatId = localStorage.getItem("chatId");

//======================//
// Button Event         //
//======================//

/**
 * @desc send the message to firebase
 */
function sendMessage() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            createMessageDiv();
            setElementAttributes();
            setElementValues(user);
            appendElements();
            updateChats(user);
        } else {
            alert("You're not logged in!");
        }
    })
}

//======================//
// HTML DOM Methods     //
//======================//

/**
 * @desc creates the div bubble for the message.
 */
function createMessageDiv() {
    elements = [
        document.createElement("img"),
        document.createElement("p"),
        document.createElement("p"),
        document.createElement("p"),
        document.createElement("div"),
        document.getElementById("allMessages")
    ]
}
/**
 * @desc sets the element attributes for the div.
 */
function setElementAttributes() {
    elements[0].setAttribute("class", "profilePic");
    elements[1].setAttribute("class", "userName");
    elements[2].setAttribute("class", "userMessage");
    elements[3].setAttribute("class", "sentDate")
    elements[4].setAttribute("class", "messageDiv");
}

/**
 * @desc sets the element attributes for the divs.
 * @param user current logged in user
 */
function setElementValues(user) {
    let userName = user.displayName;
    let userPic = user.photoURL;
    let message = document.getElementById("btn-input").value;
    let today = new Date();

    //----------------------------------------

    elements[0].src = userPic;
    elements[1].innerHTML = userName;
    elements[2].innerHTML = message;
    elements[3].innerHTML =
        // TODO: When possible, replace this with the timestamp provided by Firestore
        MONTH[today.getMonth()] + " " +
        today.getDate() + ", " +
        today.getFullYear() + ", " +
        today.getHours() + ":" +
        today.getMinutes();
}

/**
 * @desc appends the created elements to the the dom.
 */
function appendElements() {
    elements[4].appendChild(elements[0]);
    elements[4].appendChild(elements[1]);
    elements[4].appendChild(elements[2]);
    elements[4].appendChild(elements[3]);
    elements[5].appendChild(elements[4]);
}

//======================//
// Firebase             //
// Cloud Firestore      //
// Functions            //
//======================//

/**
 * @desc updates the users chat to firebase. 
 * @param user current logged in user
 */
function updateChats(user) {
    let chatRef = db.collection("Chats");
    if (chatId == null) {
        let chatIdRef = chatRef.doc();
        chatId = chatIdRef.id;

        chatIdRef.set({
            numMessages: 1
        })
        .then(chatIdRef.collection("Messages").add({
                from: user.uid,
                message: elements[2].innerHTML,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                messageNum: chatIdRef.numMessages
            })
        )
        .then(function() {
            updateUser(user, chatId);
        }); 
    } else {
      
        let chatDocRef = chatRef.doc(chatId);

        chatDocRef.get()
        .then(function(doc) {
            if (doc.data() == undefined) {
                chatDocRef.set({
                    numMessages: 1
                })
                .then(function() {
                    chatDocRef.get()
                    .then(function(doc) {
                        console.log(doc.data() + " " + 1);
                            chatDocRef.collection("Messages").add({
                            from: user.uid,
                            message: elements[2].innerHTML,
                            time: firebase.firestore.FieldValue.serverTimestamp(),
                            messageNum: doc.data().numMessages
                        })
                    });
                });
            } else {
                chatDocRef.update({
                    numMessages: firebase.firestore.FieldValue.increment(1)
                })
                .then(function() {
                    chatDocRef.get()
                    .then(function(doc) {
                        console.log(doc.data() + " " + 1);
                            chatDocRef.collection("Messages").add({
                            from: user.uid,
                            message: elements[2].innerHTML,
                            time: firebase.firestore.FieldValue.serverTimestamp(),
                            messageNum: doc.data().numMessages
                        })
                    });
                });
            }
        })
        .then(function() {
            updateUser(user, chatId);
        }); 
    }
}

/**
 * @desc updates the users chat to firebase. 
 * @param user current logged in user
 * @param chatId the chatId for this message.
 */
function updateUser(user, chatId) {
    let chatIdRef = db.collection("Users").doc(user.uid).collection("Chats").doc("chatId");
    chatIdRef.get().then(function(doc) {
        
        if (doc.exists) {
            chatIdRef.update({
                id: firebase.firestore.FieldValue.arrayUnion(chatId.toString())
            })
        } else {
            chatIdRef.set({
                id: firebase.firestore.FieldValue.arrayUnion(chatId.toString())
            })
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
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

//addOnClick();

function loadMessages() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // If the user is signed in.
            let chatsDocRef = db.collection("Chats").doc(chatId);

            chatsDocRef.collection("Messages").get()
            .then(function(snapshot) {
                //snapshot.orderBy("messageNum", "asc")  
                
                snapshot.forEach(doc => {
                    let messageUser = db.collection("Users").doc(doc.data().from);
                    let userName = messageUser.displayName;
                    let userPic = messageUser.photoURL;
                    let message = doc.data().message;
                    let today = doc.data().time;

                    //----------------------------------------
                    createMessageDiv();
                    setElementAttributes();

                    elements[0].src = userPic;
                    elements[1].innerHTML = userName;
                    elements[2].innerHTML = message;
                    elements[3].innerHTML =
                    // TODO: When possible, replace this with the timestamp provided by Firestore
                    //MONTH[today.getMonth()] + " " +
                    //today.getDate() + ", " +
                    //today.getFullYear() + ", " +
                    //today.getHours() + ":" +
                    //today.getMinutes();
                    "Test date";
                    appendElements();
                });
            });       
        } else {
            // If the user is not signed in.
            alert("You're not logged in!");
        }
    });
}

loadMessages();