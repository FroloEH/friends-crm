<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Add contact </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Add contact</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <ion-card-header>
          <ion-card-title> NEW CONTACT </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <form @submit.prevent="submitForm">
            <ion-item>
              <ion-label position="floating">Name</ion-label>
              <ion-input type="text" v-model="newName" required />
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input type="email" v-model="newMail" required />
            </ion-item>
            <div class="ion-padding-horizontal ion-padding-top">
              <ion-button type="submit" id="btn-confirm">
                <ion-icon slot="start" :icon="personAddOutline" />
                <ion-label slot="end">Add contact</ion-label>
              </ion-button>
            </div>
          </form>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonInput,
  IonItem,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { personAddOutline } from "ionicons/icons";
import { contactService } from "../services/ContactService";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonInput,
    IonItem,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      newName: "",
      newMail: "",
    };
  },
  setup() {
    return {
      personAddOutline,
    };
  },
  methods: {
    submitForm() {
      contactService.addContact(this.newName, this.newMail);
      this.newName = "";
      this.newMail = "";
    },
  },
});
</script>
