<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Simulador</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Simulador</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid fixed>
        <ion-row>
          <ion-col sizeLg="6" offsetLg="3">
            <ion-list lines="full" class="ion-no-margin">
              <ion-item>
                <ion-label position="floating">Monto Total</ion-label>
                <ion-input type="number" inputmode="numeric" />
              </ion-item>
              <ion-item>
                <ion-label position="floating">% Interés</ion-label>
                <ion-input type="number" inputmode="numeric" />
              </ion-item>
              <ion-item>
                <ion-label position="floating">Meses Plazo</ion-label>
                <ion-select interface="action-sheet" cancel-text="Cancelar">
                  <ion-select-option value="6">6 meses</ion-select-option>
                  <ion-select-option value="12">12 meses</ion-select-option>
                  <ion-select-option value="24">24 meses</ion-select-option>
                  <ion-select-option value="36">36 meses</ion-select-option>
                  <ion-select-option value="48">48 meses</ion-select-option>
                  <ion-select-option value="72">72 meses</ion-select-option>
                </ion-select>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow, IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput } from '@ionic/vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage , IonCol, IonGrid, IonRow, IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput }
});
</script>
