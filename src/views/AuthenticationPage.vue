<template>
  <ion-page>
    <ion-card>
      <ion-card-header>
        <ion-card-title> {{pageHeading}} </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <form @submit.prevent="submitForm">
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" v-model.trim="enteredMail" required />
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="text" v-model.trim="enteredPassword" required />
          </ion-item>
          <div class="ion-padding-horizontal ion-padding-top">
            <ion-button type="submit">
              <ion-label>Sign In</ion-label>
            </ion-button>
            <ion-button type="button" @click="switchMode">
              <ion-label>{{switchButtonText}}</ion-label>
            </ion-button>
          </div>
        </form>
      </ion-card-content>
    </ion-card>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {authenticationService} from "../services/AuthenticationService";
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonCardHeader,
  IonCardTitle,
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
    IonCardHeader,
    IonCardTitle,
  },
  data() {
    return {
      enteredMail: "",
      enteredPassword: "",
      isLoginMode: true,
    };
  },
  computed: {
    pageHeading(){
      if(this.isLoginMode){
        return "LOGIN"
      }
      return "SIGN UP";
    },
    switchButtonText(){
      if(this.isLoginMode){
        return "Go to login"
      }
      return "Go to sign up";
    },
  },
  methods: {
    submitForm() {
      authenticationService.loginUserWithEmailAndPassword(this.enteredMail, this.enteredPassword);
    },
    switchMode() {
      if (this.isLoginMode) {
        this.isLoginMode = false;
      } else {
        this.isLoginMode = true;
      }
    },
  },
});
</script>
