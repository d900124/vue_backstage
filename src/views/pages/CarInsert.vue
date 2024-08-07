<template>
  <CarAndCarinfoModel ref="carAndCarinfoModel" v-model="Datas" @custom-insert="callCreate"></CarAndCarinfoModel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CarAndCarinfoModel from '@/components/CarAndCarinfoModel.vue';
import axiosapi from '@/plugins/axios';

const Datas = ref({});
const carAndCarinfoModel = ref(null);

function callCreate() {
  axiosapi.post('/car/create', Datas.value).then(function (response) {
    console.log("responseCarCreate", response)
  }).catch()
}





</script>

<style></style>