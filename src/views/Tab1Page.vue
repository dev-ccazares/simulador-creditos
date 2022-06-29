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
            <ion-col sizeLg="6" offsetLg="3">
              <ion-list lines="full" class="ion-no-margin">
                <ion-item>
                  <ion-label position="floating">Monto Total</ion-label>
                  <ion-input type="number" inputmode="numeric" v-model="model.monto" />
                </ion-item>
                <ion-text v-if="v$.monto.$errors[0]" color=danger class="ion-padding-top ion-padding-start size-error">{{ v$.monto.$errors[0].$message }}</ion-text>
                <ion-item>
                  <ion-label position="floating">% Interés</ion-label>
                  <ion-input type="number" inputmode="numeric" v-model="model.interes" />
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Meses Plazo</ion-label>
                  <ion-select interface="action-sheet" cancel-text="Cancelar" v-model="model.plazo">
                    <ion-select-option value="6">6 meses</ion-select-option>
                    <ion-select-option value="12">12 meses</ion-select-option>
                    <ion-select-option value="24">24 meses</ion-select-option>
                    <ion-select-option value="36">36 meses</ion-select-option>
                    <ion-select-option value="48">48 meses</ion-select-option>
                    <ion-select-option value="72">72 meses</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-button expand="full" @click="handleSubmit" class="ion-margin-top">Calcular</ion-button>
              </ion-list>
            </ion-col>
          </ion-row>
        </form>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonButton, IonText,
        IonGrid, IonRow, IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput } from '@ionic/vue';
import { required, helpers } from '@vuelidate/validators';
import useValidate from '@vuelidate/core';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage , IonCol, IonButton, IonText,
             IonGrid, IonRow, IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput },
  setup() {
    const band = ref(false);
    const model = reactive({
      monto: ref(),
      interes: ref(),
      plazo: ref(),
    });
    const rules = {
      monto: { required: helpers.withMessage('El campo es requerido', required) },
      interes: { required: helpers.withMessage('El campo es requerido', required) },
      plazo: { required: helpers.withMessage('El campo es requerido', required) },
    };
    const v$ =  useValidate(rules, model);
    const handleSubmit = () => {
      band.value = true;
      v$.value.$touch();
      if(!v$.value.$invalid){
        console.log('correcto');
      }else{
        band.value = false;
        console.log('incorecto');
      }
    }

    return {
      v$,
      handleSubmit,
      model,
      version:process.env.VUE_APP_VERSION 
    }
  }
});
</script>
