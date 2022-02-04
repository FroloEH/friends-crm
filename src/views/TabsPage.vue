<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Contacts" href="/tabs/contacts">
          <ion-icon :icon="peopleOutline" />
          <ion-label>Contacts</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="AddContactTab" href="/tabs/add-contact">
          <ion-icon :icon="personAddOutline" />
          <ion-label>Add Contact</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { personAddOutline, square, peopleOutline } from "ionicons/icons";

export default {
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      personAddOutline,
      square,
      peopleOutline,
    };
  },
};
</script>
