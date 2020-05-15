//==================================//
//                                  //
// Global Variables                 //
//                                  //
//==================================//

let thisUser;

//==================================//
//                                  //
// Functions                        //
//                                  //
//==================================//

/**
 * Gets the current user.
 */
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // If the user is signed in.
        thisUser = user;
        console.log(thisUser.uid);
        loadList();
    } else {
        // If the user is not signed in.
        // TODO: Uncomment the code below once ready.
        // window.location.href = "signup.html"; // Redirects the user to "signup.html" to sign-up/log-in.
    }
});

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

                        // Set the attributes and inner HTML.
                        chatListDiv.onclick = function() {
                            loadActiveMessage(chatId);
                        };
                        // TODO: Replace URL with the other user's profile picture.
                        profilePicImg.src = "https://randomuser.me/api/portraits/women/59.jpg";
                        // TODO: Replace the name and date with the name and date stored on the db.
                        nameAndDateH5.innerHTML = "Name <span class='chat_date'>Date</span>";
                        // TODO: Replace the message with the message stored on the db.
                        messageP.innerHTML = "Test message";

                        // Append the DOM elements.
                        chatImgDiv.appendChild(profilePicImg);
                        
                        chatIbDiv.appendChild(nameAndDateH5);
                        chatIbDiv.appendChild(messageP);

                        chatPeopleDiv.appendChild(chatImgDiv);
                        chatPeopleDiv.appendChild(chatIbDiv);
                        
                        chatListDiv.appendChild(chatPeopleDiv);

                        inboxChatDiv.appendChild(chatListDiv);
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
    let msgIdArray;
    let messagesArray = [];
    
    chatListDiv.setAttribute("class", "chat_list active_chat");

    chatMessagesDocRef
        .onSnapshot(function(doc) {
            let msgHistoryDiv = document.getElementById("msg_history");
                msgHistoryDiv.innerHTML = "";

            msgIdArray = doc.data().messageIdArray;

            console.log(msgIdArray);

            msgIdArray
                .forEach(function(msg) {
                    console.log(msg);
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
                                dateSpan.innerHTML = "Today";//messageDoc.data().time;
                            
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
                                dateSpan.innerHTML = "Today";//messageDoc.data().time;
                            
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
        });
}

//==================================//
//                                  //
// Function Calls                   //
//                                  //
//==================================//

/*
if (messageDoc.data().from == thisUser.uid) {
    // If the message is outgoing.
    // Create the DOM elements.
    let outgoingMsgDiv = document.createElement("div");
    let sentMsgDiv = document.createElement("div");
        sentMsgDiv.setAttribute("class", "sent_msg");
    let messageP = document.createElement("p");
    let dateSpan = document.createElement("span")
        dateSpan.setAttribute("class", "time_date");

    // Set the attributes and inner HTML.
    messageP.innerHTML = messageDoc.data().message;
    //dateSpan.innerHTML = messageDoc.data().time;

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
    let profilePicImg = document.createElement("img");
        profilePicImg.setAttribute("alt", "profle-pic");
    let incomingMsgImgDiv = document.createElement("div");
        incomingMsgImgDiv.setAttribute("class", "incoming_msg_img");
    let receivedMsgDiv = document.createElement("div");
        receivedMsgDiv.setAttribute("class", "sent_msg");
    let receivedWithdMsgDiv = document.createElement("div");
        receivedWithdMsgDiv.setAttribute("class", "receivedWithdMsgDiv");
    let messageP = document.createElement("p");
    let dateSpan = document.createElement("span")
        dateSpan.setAttribute("class", "time_date");

    // Set the attributes and inner HTML.
    profilePicImg.src = "https://randomuser.me/api/portraits/women/59.jpg";
    messageP.innerHTML = mesmessageDocage.data().message;
    //dateSpan.innerHTML = messageDoc.data().time;

    // Append the DOM elements.
    incomingMsgImgDiv.appendChild(profilePicImg);

    receivedWithdMsgDiv.appendChild(messageP);
    receivedWithdMsgDiv.appendChild(dateSpan);

    receivedMsgDiv.appendChild(receivedWithdMsgDiv);

    incomingMsgDiv.appendChild(incomingMsgImgDiv);
    incomingMsgDiv.appendChild(receivedMsgDiv);

    msgHistoryDiv.appendChild(incomingMsgDiv);
}
*/