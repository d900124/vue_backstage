<template class="backgroundColor">
  <!-- ===============================拖曳上傳=============================== -->
  <div class="backgroundColor">
  <br><br><br><br>
  <CarAndCarinfoModify  
    ref="Modify" 
    v-model:carData="Datas" 
    @custom-modify="callModify"
    ></CarAndCarinfoModify>
</div>
</template>
    
<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios'
import CarAndCarinfoModify from '@/components/CarAndCarinfoModify.vue';
import axiosapi from '@/plugins/axios';

const Datas=ref({ });
const Modify=ref(null);

function callModify(data) {
  axiosapi.put('/car/modify/2', data).then(function(response){
    console.log("responseCarCreate",response)
  }).catch()
}





</script>
    
<style>
    
</style>