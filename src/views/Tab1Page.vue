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
        <form>
          <ion-row>
            <ion-col sizeLg="6" offsetLg="3" size="12">
              <ion-list lines="full" class="ion-no-margin">
                <ion-item>
                  <ion-label position="floating">$ Monto</ion-label>
                  <ion-input v-model="model.monto" type="number" inputmode="numeric" />
                </ion-item>
                <ion-text v-if="v$.monto.$errors[0]" color="danger" class="ion-padding-top ion-padding-start size-error">{{ v$.monto.$errors[0].$message }}</ion-text>
                <ion-item>
                  <ion-label position="floating">% Interés</ion-label>
                  <ion-input v-model="model.interes" type="number" inputmode="numeric" />
                </ion-item>
                <ion-text v-if="v$.interes.$errors[0]" color="danger" class="ion-padding-top ion-padding-start size-error">{{ v$.interes.$errors[0].$message }}</ion-text>
                <ion-item>
                  <ion-label position="floating">Meses Plazo</ion-label>
                  <ion-select v-model="model.plazo" interface="action-sheet" cancel-text="Cancelar">
                    <ion-select-option value="6">6 meses</ion-select-option>
                    <ion-select-option value="12">12 meses</ion-select-option>
                    <ion-select-option value="24">24 meses</ion-select-option>
                    <ion-select-option value="36">36 meses</ion-select-option>
                    <ion-select-option value="48">48 meses</ion-select-option>
                    <ion-select-option value="72">72 meses</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-text v-if="v$.plazo.$errors[0]" color="danger" class="ion-padding-top ion-padding-start size-error">{{ v$.plazo.$errors[0].$message }}</ion-text>
              </ion-list>
            </ion-col>
            <ion-col sizeLg="6" offsetLg="3" size="12" class="ion-margin-top">
              <ion-row>
                <ion-col size="6">
                  <ion-button expand="full" @click="handleSubmit">
                    <ion-icon :icon="checkmarkCircle" class="ion-padding-end" />
                    Calcular
                  </ion-button>
                </ion-col>
                <ion-col size="6">
                  <ion-button expand="full" color="danger" @click="resetData">
                    <ion-icon :icon="closeCircle" class="ion-padding-end" />
                    Borrar
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </form>
        <ion-row v-if="band">
          <ion-col sizeLg="6" offsetLg="3" size="12" class="ion-margin-top">
            <ion-card>
              <ion-card-header class="ion-no-margin">
                <ion-card-title>
                  <ion-icon :icon="bulbOutline" color="primary" />
                  Resultado
                </ion-card-title>
              </ion-card-header>
              <ion-list lines="none" class="ion-no-margin">
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="bagHandleOutline" class="ion-padding-end" /> Monto Total: <ion-text color="dark">$ {{ calculate.total }}</ion-text>
                    </h5>
                  </ion-text>
                </ion-item>
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="cashOutline" class="ion-padding-end" /> Total Interés: <ion-text color="dark">$ {{ calculate.montoInteres }}</ion-text>
                    </h5>
                  </ion-text>
                </ion-item>
              </ion-list>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonButton, IonText, IonIcon,
  IonGrid, IonRow, IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput, IonCard,
  IonCardHeader, IonCardTitle
} from '@ionic/vue';
import { checkmarkCircle, closeCircle, bulbOutline, bagHandleOutline, cashOutline } from 'ionicons/icons';
import { required, helpers, minValue } from '@vuelidate/validators';
import useValidate from '@vuelidate/core';

export default defineComponent({
  name: 'Tab1Page',
  components: {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonButton, IonText, IonIcon,
    IonGrid, IonRow, IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput, IonCard,
    IonCardHeader, IonCardTitle
  },
  setup() {
    const band = ref(false);
    const model = reactive({
      monto: ref(),
      interes: ref(),
      plazo: ref(),
    });
    const calculate = reactive({
      total: ref(),
      montoInteres: ref(),
    });
    const rules = {
      monto: { required: helpers.withMessage('El campo es requerido', required), minValue: helpers.withMessage('El campo debe ser mayor a 0', minValue(0.1)) },
      interes: { required: helpers.withMessage('El campo es requerido', required), minValue: helpers.withMessage('El campo debe ser mayor a 0', minValue(0.1)) },
      plazo: { required: helpers.withMessage('El campo es requerido', required) },
    };
    const v$ = useValidate(rules, model);
    const handleSubmit = () => {
      band.value = false;
      v$.value.$touch();
      if (!v$.value.$invalid) {
        simulate();
        band.value = true;
      }
    }

    const resetData = () => {
      band.value = false;
      model.monto = null;
      model.interes = null;
      model.plazo = null;
      v$.value.$reset();
    }

    const simulate = () => {
      let calc = model.monto * (model.interes / 100);
      let time = model.plazo / 12;
      calc = calc * time;
      calculate.montoInteres = calc.toFixed(2);
      calculate.total = (Number(model.monto) + Number(calculate.montoInteres)).toFixed(2);
    }

    return {
      v$,
      handleSubmit,
      resetData,
      model,
      calculate,
      band,
      simulate,
      version: process.env.VUE_APP_VERSION,
      closeCircle,
      checkmarkCircle,
      bulbOutline,
      bagHandleOutline,
      cashOutline
    }
  }
});
</script>
