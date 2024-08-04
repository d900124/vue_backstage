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
import axiosapi from '@/plugins/axios';
import Swal from 'sweetalert2';

const Datas=ref({ });
const carAndCarinfoModel=ref(null);

function callCreate() {
  axiosapi.post('/car/create', Datas.value)
}





</script>
    
<style>
    
</style>