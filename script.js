// initialize
import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

const firebaseConfig = {
  apiKey: "AIzaSyByZxHNkJ9vCJ4BydB42Hv_Ah9e-Gthe5A",
  authDomain: "thecandycentre-1bd85.firebaseapp.com",
  projectId: "thecandycentre-1bd85",
  storageBucket: "thecandycentre-1bd85.appspot.com",
  messagingSenderId: "132364097455",
  appId: "1:132364097455:web:134e0604f3b43146a2415a"
};

const firebaseApp = initializeApp(firebaseConfig);

// Add Firebase products that you want to use
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    setDoc
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    listAll,
    deleteObject
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
//============================================
//============================================
const db = getFirestore();
const auth = getAuth();
let UID;
window.addEventListener('DOMContentLoaded', (event) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            UID = user.uid;
            //Your code...
        }
    });

});
document.getElementById("login-btn").addEventListener('click', function() {
      const loginEmail = document.getElementById("login-email").value;
      const loginPassword = document.getElementById("login-password").value;
    //  const auth = getAuth();
      signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert("Success");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
});








      /*            document.getElementById("register-btn").addEventListener('click', function() {
                    const registerEmail = document.getElementById("register-email").value;
                    const registerPassword = document.getElementById("register-password").value;

                    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
                      .then((userCredential) => {
                          // Signed in
                          const user = userCredential.user;
                          document.getElementById("result-box").style.display = "inline";
                          document.getElementById("register-div").style.display = "none";
                          document.getElementById("result").innerHTML = "Welcome <br>" + registerEmail + "was Registered Successfully";
                          firebase.catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            document.getElementById("result-box").style.display = "inline";
                            document.getElementById("register-div").style.display = "none";
                            document.getElementById("result").innerHTML = "Sorry ! <br>+errorMessage";
                          });
*/
