<template class="backgroundColor">
  <div class="backgroundColor">
    <!-- ===============================拖曳上傳=============================== -->
  <br><br><br><br>
  <CarAndCarinfoModify  
    ref="Modify" 
    v-model:carData="Datas" 
    :value="query.id"
    @custom-modify="callModify"
    ></CarAndCarinfoModify>
</div>
</template>
    
<script setup>
import { ref,onMounted } from 'vue'
import { useRoute,useRouter  } from 'vue-router';
import CarAndCarinfoModify from '@/components/CarAndCarinfoModify.vue';
import axiosapi from '@/plugins/axios';

const route=useRoute();
const query=route.query;
const Datas=ref({ });
const Modify=ref(null);
const carId=ref(null);

function callModify(data) {//要carId
  axiosapi.put(`/car/modify/${query.id}`, data).then(function(response){
    console.log("responseCarCreate",response)
  }).catch()
}





</script>
    
<style>
    
</style>