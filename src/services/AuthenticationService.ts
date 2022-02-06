import router from "../router";
import firebase from "firebase/app";
import 'firebase/auth';

class AuthenticationService {
  private firebaseApp: firebase.app.App;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBqpeozK_iaPBBdlssKYUhcLdhdPYtmtpg",
      authDomain: "friends-crm.firebaseapp.com",
      databaseURL: "https://friends-crm.firebaseio.com",
      projectId: "friends-crm",
      storageBucket: "friends-crm.appspot.com",
      messagingSenderId: "909239775339",
      appId: "1:909239775339:web:0850a062c7b1e56a19812e",
      measurementId: "G-5JR8SQRF35",
    };

    this.firebaseApp = firebase.initializeApp(firebaseConfig);
  }

  registerUseWithEmailAndPassword(email: string, password: string) {
    let errorMessage = "";
    this.firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .finally(() => router.push("/"))
      .catch((err) => (errorMessage = err.message));

    return errorMessage;
  }

  loginUserWithEmailAndPassword(email: string, password: string) {
    let errorMessage = "";
    this.firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .finally(() => router.push("/"))
      .catch((err) => (errorMessage = err.message));

    return errorMessage;
  }

  loginUserWithGooglePopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.firebaseApp
      .auth()
      .signInWithPopup(provider)
      .finally(() => router.push("/"));
  }
}

export const authenticationService = new AuthenticationService();
