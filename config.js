import firebase from "firebase/compat/app"
import "firebase/compat/auth"
// import "firebase/compact/firestore"

export const firebaseConfig = {
    apiKey: "AIzaSyC6huywnjxHVxBr2y60GbGV-Dpkj_QeXuM",
  authDomain: "authentication09032000.firebaseapp.com",
  projectId: "authentication09032000",
  storageBucket: "authentication09032000.appspot.com",
  messagingSenderId: "886383792467",
  appId: "1:886383792467:web:5b49502b9e7f2152fa11a6",
  measurementId: "G-5FTWBK96EW"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}