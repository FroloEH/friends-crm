<template>
  <default-layout page-title="Contacts">
    <template v-slot:content>
      <ion-grid>
        <ion-row>
          <ion-col size="8" offset="2">
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
    </template>
  </default-layout>
</template>

<script lang="ts">
import {
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
import DefaultLayout from '@/components/DefaultLayout.vue';


export default {
  components: {
    IonGrid,
    IonButton,
    IonLabel,
    IonIcon,
    IonItem,
    IonList,
    IonCol,
    IonRow,
    DefaultLayout,
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
