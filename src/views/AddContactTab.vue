<template>
<default-layout page-title="Add contact">
    <template v-slot:content>
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
    </template>
  </default-layout>
</template>

<script lang="ts">
import {
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
import DefaultLayout from "@/components/DefaultLayout.vue";

export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonInput,
    IonItem,
    IonIcon,
    DefaultLayout,
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
