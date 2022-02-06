import router from "../router";
import firebase from "firebase/app";
import "firebase/auth";


class AuthenticationService {
  private firebaseApp: firebase.app.App;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: process.env.VUE_APP_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_DATABASE_URL,
      projectId: process.env.VUE_APP_PROJECT_ID,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MESSAGIN_SENDER_ID,
      appId: process.env.VUE_APP_APP_ID,
      measurementId: process.env.VUE_APP_MEASURMENT_ID,
    };

    this.firebaseApp = firebase.initializeApp(firebaseConfig);
  }

  registerUseWithEmailAndPassword(email: string, password: string) {
    let errorMessage = "";
    this.firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => this.afterLogin(data))
      .catch((err) => (errorMessage = err.message));

    return errorMessage;
  }

  loginUserWithEmailAndPassword(email: string, password: string) {
    let errorMessage = "";
    this.firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => this.afterLogin(data))
      .catch((err) => (errorMessage = err.message));

    return errorMessage;
  }

  loginUserWithGooglePopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then((data) => this.afterLogin(data));
  }

  hasValidIdToken() {
    //TO-DO: Validation and logout after token has expired
    const idToken = localStorage.getItem("token");
    return idToken ? true : false;
  }

  private afterLogin(responseData: firebase.auth.UserCredential) {
    const credentials =
      responseData.credential as firebase.auth.OAuthCredential;
    if (credentials.idToken) {
      localStorage.setItem("token", credentials.idToken);
      router.replace("/");
    }
  }
}

export const authenticationService = new AuthenticationService();
