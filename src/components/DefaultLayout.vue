<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> {{pageTitle}} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot name="content"/>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
export default {
  props: ["pageTitle"],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
};
</script>
