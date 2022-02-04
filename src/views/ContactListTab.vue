<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Contacts </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="8" offset="2">
            <ion-header collapse="condense">
              <ion-toolbar>
                <ion-title size="large">Contacts</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-list>
              <ion-item v-for="contact in contacts" :key="contact.name">
                <ion-icon :icon="personCircleOutline" />
                <ion-label> {{ contact.name }}</ion-label>

                <ion-button :href="'mailto:' + contact.email">
                  <ion-icon :icon="mailOutline"/>
                </ion-button>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonGrid,
  IonButton,
  IonLabel,
  IonIcon,
  IonItem,
  IonList,
  IonCol,
  IonRow,
} from "@ionic/vue";
import { contactService } from '../services/ContactService';

import { personCircleOutline, mailOutline } from "ionicons/icons";


export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonGrid,
    IonButton,
    IonLabel,
    IonIcon,
    IonItem,
    IonList,
    IonCol,
    IonRow,
  },
  setup() {
    const contacts = contactService.getAllContacts();
    return {
      mailOutline,
      personCircleOutline,
      contacts,
    };
  },
};
</script>
