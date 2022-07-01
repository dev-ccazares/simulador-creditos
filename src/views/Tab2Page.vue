<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Información</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Información</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid fixed>
        <ion-row>
          <ion-col sizeLg="6" offsetLg="3">
            <ion-list>
              <ion-list-header>
                <h2 color="primary">Simulador de Crédito:</h2>
              </ion-list-header>
              <ion-item>
                <ion-label>Versión: {{ version }}</ion-label>
              </ion-item>
            </ion-list>
            <ion-list>
              <ion-list-header>
                <h2 color="primary">Institución:</h2>
              </ion-list-header>
              <ion-item>
                <ion-label>Universidad Politécnica Saleasiana</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Maestria de Software</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Módulo Ingenieria de Software</ion-label>
              </ion-item>
            </ion-list>
            <ion-list>
              <ion-list-header>
                <h2 color="primary">Creado por:</h2>
              </ion-list-header>
              <ion-item>
                <ion-label>Cristian Cazares</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Freddy Tacuri</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Fausto Amaguaña</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Klever Loachamin</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Victor Cofre</ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow, IonItem, IonList, IonLabel, IonListHeader } from '@ionic/vue';

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonGrid, IonRow, IonItem, IonList, IonLabel, IonListHeader  },
  setup() {
    return {
      version:process.env.VUE_APP_VERSION 
    }
  }
});
</script>
