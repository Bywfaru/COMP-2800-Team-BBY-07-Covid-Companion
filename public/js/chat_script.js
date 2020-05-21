//==================================//
//                                  //
// Global Variables                 //
//                                  //
//==================================//

let thisUser; // The current user.

//==================================//
//                                  //
// Functions                        //
//                                  //
//==================================//

/**
 * Loads the inbox chat previews.
 */
function loadList() {
    // User's chat ID document reference.
    let userChatIdDocRef = db.collection("Users").doc(thisUser.uid).collection("Chats").doc("chatId"); 
    let chatIdArray;

    if (userChatIdDocRef) {
        // If the document reference exists.
        
        // Get the document's data.
        userChatIdDocRef
            .onSnapshot(function(doc) {
                let inboxChatDiv = document.getElementById("inbox_chat"); // Div that holds the other preview elements.
                    inboxChatDiv.innerHTML = ""; // Clear the inner HTML on each snapshot so we don't get dupes.

                chatIdArray = doc.data().id;

                // For each chat ID, generate a inbox chat preview.
                chatIdArray
                    .forEach(function(chatId) {
                        let userName;
                        console.log(chatId);
                        // Create the DOM elements.
                        let chatListDiv = document.createElement("div");
                            chatListDiv.setAttribute("class", "chat_list");
                            chatListDiv.setAttribute("id", chatId);
                        let chatPeopleDiv = document.createElement("div");
                            chatPeopleDiv.setAttribute("class", "chat_people");
                        let chatImgDiv = document.createElement("div");
                            chatImgDiv.setAttribute("class", "chat_img");
                        let profilePicImg = document.createElement("img");
                            profilePicImg.setAttribute("alt", "profle-pic");
                        let chatIbDiv = document.createElement("div");
                            chatIbDiv.setAttribute("class", "chat_ib");
                        let nameAndDateH5 = document.createElement("h5");
                        let messageP = document.createElement("p");

                        db.collection("Chats").doc(chatId)
                            .get()
                            .then(function(doc) {
                                db.collection("Users").doc(doc.data().userId[1])
                                    .get()
                                    .then(function(userDoc) {
                                        userName = userDoc.data().name;
                                        console.log(userName);

                                        // Set the attributes and inner HTML.
                                        chatListDiv.onclick = function() {
                                            loadActiveMessage(chatId);
                                        };
                                        // TODO: Replace URL with the other user's profile picture.
                                        profilePicImg.src = "./images/userProfile.png";
                                        // TODO: Replace the name and date with the name and date stored on the db.
                                        nameAndDateH5.innerHTML = userName;
                                        // TODO: Replace the message with the message stored on the db.
                                        messageP.innerHTML = "Test message";

                                        // Append the DOM elements.
                                        chatImgDiv.appendChild(profilePicImg);
                                        
                                        chatIbDiv.appendChild(nameAndDateH5);
                                        //chatIbDiv.appendChild(messageP);

                                        chatPeopleDiv.appendChild(chatImgDiv);
                                        chatPeopleDiv.appendChild(chatIbDiv);
                                        
                                        chatListDiv.appendChild(chatPeopleDiv);

                                        inboxChatDiv.appendChild(chatListDiv);
                                    });
                            });
                    });
            });
    }
}

/**
 * Loads the active chat's (clicked message preview) messages. 
 * @param chatId The chat ID of the clicked message preview. 
 */
function loadActiveMessage(chatId) {
    let chatMessagesDocRef = db.collection("Chats").doc(chatId);
    let chatListDiv = document.getElementById(chatId);
    let type_msg = document.getElementById("type_msg");
    let msgIdArray;

    type_msg.style.visibility = "visible"; // Unhides the text box and send button.
    
    console.log(localStorage.getItem("activeChatId"));
    localStorage.setItem("activeChatId", chatId);
    console.log(localStorage.getItem("activeChatId"));

    chatListDiv.setAttribute("class", "chat_list active_chat"); // Changes the class to show that the chat is "focused".

    // Gets the document reference snapshot.
    chatMessagesDocRef
        .onSnapshot(function(doc) {
            let msgHistoryDiv = document.getElementById("msg_history");
                msgHistoryDiv.innerHTML = ""; // Clears the div so there are no dupes after each snapshot.
            
            if (doc.data().messageIdArray) {
                // If messages exist in the chat.
                msgIdArray = doc.data().messageIdArray; // Array containing the message IDs.

                console.log(msgIdArray);

                msgIdArray
                    .forEach(function(msg) {
                        console.log(msg);
                        // Get the message's document reference snapshot.
                        db.collection("Chats").doc(chatId).collection("Messages").doc(msg)
                            .onSnapshot(function(messageDoc) {
                                if (messageDoc.data().from == thisUser.uid) {
                                    // If the message is outgoing.
                                    // Create the DOM elements.
                                    let outgoingMsgDiv = document.createElement("div");
                                        outgoingMsgDiv.setAttribute("class", "outgoing_msg");
                                    let sentMsgDiv = document.createElement("div");
                                        sentMsgDiv.setAttribute("class", "sent_msg");
                                    let messageP = document.createElement("p");
                                    let dateSpan = document.createElement("span")
                                        dateSpan.setAttribute("class", "time_date");
                                
                                    // Set the attributes and inner HTML.
                                    messageP.innerHTML = messageDoc.data().message;
                                    // TODO: Set the date and time to the date and time in the db.
                                    dateSpan.innerHTML = messageDoc.data().time;
                                
                                    // Append the DOM elements.
                                    sentMsgDiv.appendChild(messageP);
                                    sentMsgDiv.appendChild(dateSpan);
                                
                                    outgoingMsgDiv.appendChild(sentMsgDiv);
                                
                                    msgHistoryDiv.appendChild(outgoingMsgDiv);
                                } else {
                                    // If the message is incoming.
                                    // Create the DOM elements.
                                    let msgHistoryDiv = document.getElementById("msg_history");
                                    
                                    let incomingMsgDiv = document.createElement("div");
                                        incomingMsgDiv.setAttribute("class", "incoming_msg");
                                    let profilePicImg = document.createElement("img");
                                        profilePicImg.setAttribute("alt", "profle-pic");
                                    let incomingMsgImgDiv = document.createElement("div");
                                        incomingMsgImgDiv.setAttribute("class", "incoming_msg_img");
                                    let receivedMsgDiv = document.createElement("div");
                                        receivedMsgDiv.setAttribute("class", "received_msg");
                                    let receivedWithdMsgDiv = document.createElement("div");
                                        receivedWithdMsgDiv.setAttribute("class", "received_withd_msg");
                                    let messageP = document.createElement("p");
                                    let dateSpan = document.createElement("span")
                                        dateSpan.setAttribute("class", "time_date");
                                
                                    // Set the attributes and inner HTML.
                                    profilePicImg.src = "https://randomuser.me/api/portraits/women/59.jpg";
                                    messageP.innerHTML = messageDoc.data().message;
                                    // TODO: Set the date and time to the date and time in the db.
                                    dateSpan.innerHTML = messageDoc.data().time;
                                
                                    // Append the DOM elements.
                                    incomingMsgImgDiv.appendChild(profilePicImg);
                                
                                    receivedWithdMsgDiv.appendChild(messageP);
                                    receivedWithdMsgDiv.appendChild(dateSpan);
                                
                                    receivedMsgDiv.appendChild(receivedWithdMsgDiv);
                                
                                    incomingMsgDiv.appendChild(incomingMsgImgDiv);
                                    incomingMsgDiv.appendChild(receivedMsgDiv);
                                
                                    msgHistoryDiv.appendChild(incomingMsgDiv);
                                }
                            });
                    });
            }
            
        });
}

/** 
 * Sends a message on-click.
 */
function sendMessage() {
    let message = document.getElementById("write_msg");
    let chatId = localStorage.getItem("activeChatId"); // The chat ID to send to.
    let messageDocRef = db.collection("Chats").doc(chatId).collection("Messages").doc();
    let chatDocRef = db.collection("Chats").doc(chatId);
    console.log("test");
    messageDocRef
        .set({
            // Sets the message's properties.
            message: message.value,
            from: thisUser.uid,
            time: firebase.firestore.Timestamp.now()
        })
        .then(function() {
            chatDocRef
                .update({
                    // Adds the new message's ID to the array.
                    messageIdArray: firebase.firestore.FieldValue.arrayUnion(messageDocRef.id)
                })
                .catch(function() {
                    chatDocRef
                        .set({
                            messageIdArray: [messageDocRef.id]
                        });
                });
        });
}

//==================================//
//                                  //
// Function Calls                   //
//                                  //
//==================================//

/**
 * Gets the current user. Runs on window load.
 */
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // If the user is signed in.
        thisUser = user;
        console.log(thisUser.uid);
        loadList();
    } else {
        // If the user is not signed in.
        window.location.href = "signup.html"; // Redirects the user to "signup.html" to sign-up/log-in.
    }
});

localStorage.setItem("activeChatId", null); // Resets the local storage item.