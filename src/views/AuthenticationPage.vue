<template>
  <ion-page>
    <form>
    <ion-grid>
      <ion-row>
        <ion-col size-sm="8" offset-sm="2">
          <ion-list>
            <ion-item>
              <ion-label position="floating">E-Mail</ion-label>
              <ion-input
                type="email"
                v-model="enteredMail"
                required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input
                type="password"
                v-model="enteredPassword"
                required
                :minlength="minPasswordLength"
              >
              </ion-input>
            </ion-item>
          </ion-list>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size-sm="6" offset-sm="3">
          <ion-button
            type="button"
            color="primary"
            fill="clear"
            expand="block"
            @click="switchMode"
          >
            Switch to {{ isLoginMode ? "Signup" : "Login" }}
          </ion-button>
          <ion-button type="submit" color="primary" expand="block">
            {{ isLoginMode ? "Login" : "Signup" }}
          </ion-button>
          <ion-button
            type="button"
            color="secondary"
            expand="block"
            @click="googleSignIn"
          >
            Sign in with Google
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
    </form>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { authenticationService } from "../services/AuthenticationService";
import {
  IonPage,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonList,
  IonCol,
  IonRow,
  IonGrid,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage,
    IonCard,
    IonCardContent,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    IonList,
    IonCol,
    IonRow,
    IonGrid,
  },
  data() {
    return {
      enteredMail: "",
      enteredPassword: "",
      isLoginMode: true,
      minPasswordLength: 6,
    };
  },
  computed: {
    pageHeading() {
      if (this.isLoginMode) {
        return "LOGIN";
      }
      return "SIGN UP";
    },
    switchButtonText() {
      if (this.isLoginMode) {
        return "Switch to login";
      }
      return "Switch to sign up";
    },
  },
  methods: {
    submitForm() {
      if (this.isLoginMode) {
        authenticationService.loginUserWithEmailAndPassword(
          this.enteredMail,
          this.enteredPassword
        );
      }
      else if(this.enteredMail && this.enteredPassword.length >= this.minPasswordLength ){
        authenticationService.registerUseWithEmailAndPassword(
          this.enteredMail,
          this.enteredPassword
        );
      }
    },
    switchMode() {
      if (this.isLoginMode) {
        this.isLoginMode = false;
      } else {
        this.isLoginMode = true;
      }
    },
    googleSignIn() {
      authenticationService.loginUserWithGooglePopup();
    },
  },
});
</script>
