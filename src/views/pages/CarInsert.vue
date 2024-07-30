<template class="backgroundColor">
  <!-- ===============================拖曳上傳=============================== -->
  <div class="backgroundColor">
  <br><br><br><br>
  <CarAndCarinfoModel  
    ref="carAndCarinfoModel" 
    v-model="Datas" 
    @custom-insert="callCreate"
    ></CarAndCarinfoModel>
</div>
</template>
    
<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios'
import CarAndCarinfoModel from '@/components/CarAndCarinfoModel.vue';

const Datas=ref({ });
const carAndCarinfoModel=ref(null);

function callCreate() {
  axios.post('http://localhost:8080/kajarta/car/create', Datas.value).then(function(response){
    console.log("responseCarCreate",response)
  }).catch()
}





</script>
    
<style>
    
</style>