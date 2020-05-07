// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Sign-in methods
ui.start('#firebaseui-auth-container', {
    signInOptions: [
        // Email address and password authentication.
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
});

// FirebaseUI configuration.
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            let user = firebase.auth().currentUser;;
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.

            // Executes if the user is a new user.
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                   firebase.firestore().collection("Users").doc(user.uid).onSnapshot(function(c){
                     if(c.data().addr != null
                       || c.data().postalCode != null){
                      window.location.replace("UserProf.html");
                     } else {
                       firebase.firestore().collection("Users").doc(user.uid).set({
                        name: user.displayName,
                        email: user.email
                    }).then(function() {
                        return window.location.replace("UserProf.html");
                    });
                     }
                   });
                }
            });
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    //signInSuccessUrl: '/main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

// Renders the FirebaseUI Auth interface. The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// Sets the authentication state persistence to the current session.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });