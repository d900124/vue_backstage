<template>
  <!-- ===============================拖曳上傳=============================== -->
<ImageInsert></ImageInsert>
  
  <br><br><br><br>
  <CarAndCarinfoModel ref="carAndCarinfoModel" v-model="Datas" @custom-insert="callCreate"></CarAndCarinfoModel>

</template>
    
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ImageInsert from '@/components/ImageInsert.vue'
import CarAndCarinfoModel from '@/components/CarAndCarinfoModel.vue';

const Datas=ref({ });
const carAndCarinfoModel=ref(null);


function callCreate() {
  axios.post('http://localhost:8080/kajarta/car/create', Datas.value).then(function(response){
    console.log("response",response)
  }).catch()
}



// function callCreate() {
//         Swal.fire({
//             text: "執行中......",
//             allowOutsideClick: false,
//             showConfirmButton: false,
//         });

//         if(product.value.id=="") {
//             product.value.id = null;
//         }
//         if(product.value.name=="") {
//             product.value.name = null;
//         }
//         if(product.value.price=="") {
//             product.value.price = null;
//         }
//         if(product.value.make=="") {
//             product.value.make = null;
//         }
//         if(product.value.expire=="") {
//             product.value.expire = null;
//         }
//         // console.log("request", product.value);

//         axiosapi.post("/ajax/pages/products", product.value).then(function(response) {
//             console.log("response", response);
//             if(response.data.success)  {
//                 Swal.fire({
//                     icon: "success",
//                     text: response.data.message,
//                 }).then(function(result) {
//                     productModal.value.hideModal();
//                     callFind(current.value);
//                 });
//             } else {
//                 Swal.fire({
//                     icon: "warning",
//                     text: response.data.message,
//                 });
//             }
//         }).catch(function(error) {
//             console.log("error", error);
//             Swal.fire({
//                 icon: "error",
//                 text: "新增錯誤："+error.message,
//             });
//         });
//     }
   


</script>
    
<style>
    
</style>