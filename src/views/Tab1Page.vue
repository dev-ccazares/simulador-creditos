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
                  <ion-label position="floating">Financiera</ion-label>
                  <ion-input v-model="model.financiera" type="text" autocomplete="off" />
                </ion-item>
                <ion-text v-if="v$.financiera.$errors[0]" color="danger" class="ion-padding-top ion-padding-start size-error">{{ v$.financiera.$errors[0].$message }}</ion-text>
                <ion-item>
                  <ion-label position="floating">% Interés</ion-label>
                  <ion-input v-model="model.interes" type="number" inputmode="numeric" autocomplete="off" />
                </ion-item>
                <ion-text v-if="v$.interes.$errors[0]" color="danger" class="ion-padding-top ion-padding-start size-error">{{ v$.interes.$errors[0].$message }}</ion-text>
                <ion-item>
                  <ion-label position="floating">$ Monto</ion-label>
                  <ion-input v-model="model.monto" type="number" inputmode="numeric" :disabled="band" autocomplete="off" />
                </ion-item>
                <ion-text v-if="v$.monto.$errors[0]" color="danger" class="ion-padding-top ion-padding-start size-error">{{ v$.monto.$errors[0].$message }}</ion-text>
                <ion-item>
                  <ion-label position="floating">Meses Plazo</ion-label>
                  <ion-select v-model="model.plazo" interface="action-sheet" cancel-text="Cancelar" :disabled="band" autocomplete="off">
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
              <ion-row class="ion-justify-content-center">
                <ion-col v-if="band" size="auto">
                  <ion-button color="tertiary" @click="handleSubmit">
                    <ion-icon :icon="addCircle" class="ion-padding-end" />
                    Añadir
                  </ion-button>
                </ion-col>
                <ion-col v-if="!band" size="auto">
                  <ion-button @click="handleSubmit">
                    <ion-icon :icon="calculator" class="ion-padding-end" />
                    Calcular
                  </ion-button>
                </ion-col>
                <ion-col size="auto">
                  <ion-button color="danger" @click="resetData">
                    <ion-icon :icon="refreshCircle" class="ion-padding-end" />
                    Reiniciar
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </form>
        <ion-row v-if="band">
          <ion-col v-if="calculateFinal.financiera !== '' && arrayCalculate.length > 1" sizeLg="6" offsetLg="3" size="12" class="ion-margin-top">
            <ion-card>
              <ion-card-header class="ion-no-margin">
                <ion-card-title color="success">
                  <ion-icon :icon="alert" />
                  MEJOR OPCIÓN
                </ion-card-title>
              </ion-card-header>
              <ion-list lines="none" class="ion-no-margin">
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="business" class="ion-padding-end" /> Financiera: <ion-text color="dark">{{ calculateFinal.financiera }}</ion-text>
                    </h5>
                  </ion-text>
                </ion-item>
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="receipt" class="ion-padding-end" /> Monto: <ion-text color="dark">$ {{ calculateFinal.monto }}</ion-text>
                    </h5>
                  </ion-text>
                </ion-item>
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="statsChart" class="ion-padding-end" /> Interés: <ion-text color="dark">{{ calculateFinal.interes }} %</ion-text>
                    </h5>
                  </ion-text>
                </ion-item>
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="cashOutline" class="ion-padding-end" /> Total Interés: <ion-text color="dark">$ {{ calculateFinal.montoInteres }}</ion-text>
                    </h5>
                  </ion-text>
                </ion-item>
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="bagHandleOutline" class="ion-padding-end" /> Monto a Financiar: <ion-text color="dark">$ {{ calculateFinal.total }}</ion-text>
                    </h5>
                  </ion-text>
                </ion-item>
              </ion-list>
            </ion-card>
          </ion-col>
          <ion-col v-for="(calculate, index) in arrayCalculate" :key="index" :index="index" sizeLg="6" offsetLg="3" size="12" class="ion-margin-top">
            <ion-card>
              <ion-card-header class="ion-no-margin">
                <ion-card-title>
                  <ion-icon :icon="bulbOutline" color="primary" />
                  {{ calculate.financiera }}
                </ion-card-title>
              </ion-card-header>
              <ion-list lines="none" class="ion-no-margin" fullscreen>
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="receipt" class="ion-padding-end" /> Monto: <ion-text color="dark">$ {{ calculate.monto }}</ion-text>
                    </h5>
                  </ion-text>
                </ion-item>
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="statsChart" class="ion-padding-end" /> Interés: <ion-text color="dark">{{ calculate.interes }} %</ion-text>
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
                <ion-item>
                  <ion-text color="medium">
                    <h5>
                      <ion-icon :icon="bagHandleOutline" class="ion-padding-end" /> Monto a Financiar: <ion-text color="dark">$ {{ calculate.total }}</ion-text>
                    </h5>
                  </ion-text>
                </ion-item>
                <ion-button expand="full" class="ion-margin-horizontal" color="danger" @click="drop(index)">
                  <ion-icon :icon="trash" class="ion-padding-end" />
                  Eliminar
                </ion-button>
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
import { refreshCircle, addCircle, bulbOutline, bagHandleOutline, cashOutline, calculator,
         receipt, statsChart, business, alert, trash } from 'ionicons/icons';
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
    interface calculate{
      financiera: string;
      monto: number;
      interes: number;
      plazo: number;
      montoInteres: string;
      total: string;
    }

    const band = ref(false);
    const model = reactive({
      financiera: ref(),
      monto: ref(),
      interes: ref(),
      plazo: ref(),
    });
    const calculateFinal = reactive<calculate>({
      financiera: '',
      monto: 0,
      interes: 0,
      plazo: 0,
      montoInteres: '',
      total: '',
    });
    const arrayCalculate = reactive<calculate[]>([calculateFinal]);
    const rules = {
      financiera: { required: helpers.withMessage('El campo es requerido', required) },
      monto: { required: helpers.withMessage('El campo es requerido', required), minValue: helpers.withMessage('El campo debe ser mayor a 0', minValue(0.1)) },
      interes: { required: helpers.withMessage('El campo es requerido', required), minValue: helpers.withMessage('El campo debe ser mayor a 0', minValue(0.1)) },
      plazo: { required: helpers.withMessage('El campo es requerido', required) },
    };
    const v$ = useValidate(rules, model);
    const handleSubmit = () => {
      band.value = false;
      v$.value.$touch();
      if (!v$.value.$invalid) {
        if(!arrayCalculate.some(x => x.financiera === model.financiera.toUpperCase())){
          simulate();
        }
        band.value = true;
      }
    }

    const resetData = () => {
      band.value = false;
      model.financiera = null;
      model.monto = null;
      model.interes = null;
      model.plazo = null;
      v$.value.$reset();
    }

    const simulate = () => {
      let calc = model.monto * (model.interes / 100);
      let time = model.plazo / 12;
      calc = calc * time;
      let totalInteres = calc.toFixed(2);
      let dataPush: calculate = {
        financiera: model.financiera.toUpperCase(),
        monto: Number(model.monto),
        interes: Number(model.interes),
        plazo: model.plazo,
        montoInteres: totalInteres,
        total: (Number(model.monto) + Number(totalInteres)).toFixed(2),
      }
      if(arrayCalculate[0].financiera === ''){
        arrayCalculate[0] = dataPush;
      }else{
        arrayCalculate.push(dataPush);
        simulateFinal();
      }
    }

    const simulateFinal = () => {
      arrayCalculate.forEach((item: calculate) => {
        if(calculateFinal.montoInteres === ''){
          asign(item);
        }
        if(Number(calculateFinal.montoInteres) > Number(item.montoInteres)){
          asign(item);
        }
      });
    }

    const asign = (item: calculate)=> {
      calculateFinal.financiera = item.financiera;
      calculateFinal.monto = item.monto;
      calculateFinal.interes = item.interes;
      calculateFinal.plazo = item.plazo;
      calculateFinal.montoInteres = item.montoInteres;
      calculateFinal.total = item.total;
    }

    const drop = (key: number) => {
      if(key === 0){
        band.value = false;
        arrayCalculate[0].financiera = '';
        arrayCalculate[0].monto = 0;
        arrayCalculate[0].interes = 0;
        arrayCalculate[0].plazo = 0;
        arrayCalculate[0].montoInteres = '';
        arrayCalculate[0].total = '';
      }else{
        arrayCalculate.splice(key,1);
      }
    }

    return {
      v$,
      handleSubmit,
      resetData,
      model,
      arrayCalculate,
      calculateFinal,
      drop,
      band,
      simulate,
      version: process.env.VUE_APP_VERSION,
      addCircle,
      refreshCircle,
      bulbOutline,
      bagHandleOutline,
      cashOutline,
      calculator,
      receipt,
      statsChart,
      business,
      alert,
      trash
    }
  }
});
</script>
