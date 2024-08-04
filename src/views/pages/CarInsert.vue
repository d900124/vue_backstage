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

async function callCreate() {
  try {
    const response = await axiosapi.post('/car/create', Datas.value);
    if (response && response.data) {
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '車輛資料已成功創建！'
      });
      // 可以在此处进行其他处理，比如重置表单、关闭对话框等
    }
  } catch (error) {
    console.error('Failed to create car:', error);
    Swal.fire({
      icon: 'error',
      title: '错误',
      text: '車輛資料創建失败：' + error.message
    });
  }
}





</script>
    
<style>
    
</style>