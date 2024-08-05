<template >
  <CarImage 
    :imageByCarIdDatas=imageByCarIdDatas 
    :mainImageUrl="mainImageUrl" 
    :listImageUrl="listImageUrl"
    :carId="carId"
    style="height: 50%; overflow: hidden;"
    ></CarImage>
  <!-- =======================圖片上傳區塊======================= -->


        <div class="d-flex flex-row" >
    <div class="p-2">
      <div class="d-flex flex-column" v-for="carData in carDatas" :key="carData.id" :carData="carData">
 
<input style="display: none;" id="carId1" type="text" name="carId1" v-model="carData.id" @input="doInput('id',$event)" required />
 
        <!-- =======================車型======================= -->
    <label>車型</label>
    <select 
        name="carinfoId" 
        v-model="carData.carinfoId"
        @change="doInput('carinfoId',$event)" 
        required
        >
      <option
      v-for="carinfoData in carinfoDatas"
        :key="carinfoData.id"
        :carinfoData="carinfoData"
        :value="`${carinfoData.id}`" 
      >{{ carinfoData.modelName }}</option>
    </select> 
  
  <!-- =======================顏色======================= -->
    <label>顏色</label>
    <input type="text" name="color" v-model="carData.color" @input="doInput('color',$event)" required />
  
  <!-- =======================里程數======================= -->
        <label>里程數</label>
        <input type="text" name="milage" v-model="carData.milage" @input="doInput('milage',$event)" required />
  
  <!-- =======================出廠年份======================= -->
        <label>年分</label>
        <input type="text" name="productionrYear" v-model="carData.productionYear" @input="doInput('productionYear',$event)" required />
  </div>
</div>


  <div class="p-2">
    <div class="d-flex flex-column" v-for="carData in carDatas" :key="carData.id" :carData="carData">
  <!-- =======================賣家======================= -->
    <label for="customerId">賣家</label>
    <select 
        name="customerId" 
        v-model="carData.customerId"
        @change="doInput('customerId',$event)" 
        required
        >
      <option
       v-for="customer in customers"
       :key="customer.id"
       :customer="customer"
        :value="`${customer.id}`" 
      >{{ customer.name }}</option>
    </select> 
    <!-- <input type="text" name="customerId" v-model="carData.customerId" @input="doInput('customerId',$event)" required /> -->
  
  <!-- =======================管理銷售員======================= -->
    <label for="employee">管理銷售員</label>
    <input type="text" name="employeeId" v-model="carData.employeeId" @input="doInput('employeeId',$event)" required />
  
  <!-- =======================議價空間======================= -->
    <label for="negotiable">議價空間</label>
    <select name="negotiable" v-model="carData.negotiable"  @change="doInput('negotiable',$event)" required>
      <option value="" disabled>選擇能容納的乘客數</option>
      <option value="1">5%</option>
      <option value="2">10%</option>
      <option value="3">15%</option>
      <option value="4">20%</option>
    </select> 
  
  <!-- =======================車況評分======================= -->
    <label for="conditionScore">車況評分</label>
    <input type="text" name="conditionScore" v-model="carData.conditionScore" @input="doInput('conditionScore',$event)" required />
  
  <!-- =======================停放分店======================= -->
    <label for="branch">停放分店</label>
    <select name="branch" v-model="carData.branch"  @change="doInput('branch',$event)" required>
      <option value="" disabled>選擇停放的分店</option>
      <option value="1">台北市</option>
      <option value="2">台中市</option>
      <option value="3">高雄市</option>
    </select> 
  
  <!-- =======================狀態======================= -->
    <label for="state">狀態</label>
    <select name="state" v-model="carData.state"  @change="doInput('state',$event)" required>
      <option value="" disabled>選擇停放的分店</option>
      <option value="1">草稿</option>
      <option value="2">上架</option>
      <option value="3">下架</option>
      <option value="4">暫時下架</option>
    </select> 
  
  
  <!-- =======================售價======================= -->
        <label>價格</label>
        <input type="text" name="price" v-model="carData.price" @input="doInput('price',$event)" required />
  
  
  <!-- =======================是否改裝======================= -->
    <label >是否改裝</label>
    <select name="remark" v-model="carData.remark"  @change="doInput('remark',$event)" required>
      <option value="" disabled>是否有改裝</option>
      <option value="1">有</option>
      <option value="2">無</option>
    </select> 

    <label >上架日期</label>
    <input type="date"  name="launchDate" v-model="carData.launchDate" @input="doInput('launchDate',$event)" required />

    
  </div>
  </div>
</div>

<button @click="handleClick()">完成修改</button> 
<!-- <button @click="$emit('custom-modify',carData.value)">完成修改</button>  -->

</template>
    
<script setup >
import { ref,onMounted } from 'vue'
import axios from 'axios'
import axiosapi from '@/plugins/axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute(); 
const props = defineProps(["carData","carinfoData","imageData"]);
const emits = defineEmits(["customModify","updata:carData","updata:imageData"]);
const kajartaUrl = import.meta.env.VITE_API_URL;
const path = import.meta.env.VITE_PHOTO;
const carinfoDatas=ref([]);
const carDatas=ref([]);
const imageDatas=ref([]);
const query =route.query
const carData=ref({});
const carId=query.id;
const customers=ref([])
function doInput(key,event) {
  emits('updata:imageData',{
...props.imageData,
[key]:event.target.value
  });

if(key in carData.value){
  carData.value[key] = event.target.value;
}

}

onMounted(function () {
    callCarinfoFind();
    callCarFind();
    callImageFind();
    callImageFindByCarId();
    showMainImage();
    showListImage();
    callFindCustomer();
});

function callFindCustomer() {
  axiosapi.get(`${kajartaUrl}/customer/all`)
        .then(function (response) {
            if (response && response.data) {
                console.log("CustomerResponse", response);
                customers.value=response.data.data
              // carData.value={...carDatas.value[0]};
              console.log("====================",customers.value);
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}

function callCarFind() {
  axiosapi.get(`${kajartaUrl}/car/find/${query.id}`)
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                carDatas.value = response.data.list;
              carData.value={...carDatas.value[0]};
              console.log(carData.value);
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}


    function callCarinfoFind() {
  //搜尋單筆carinfo資訊
  axiosapi.get(`/carinfo/list`)
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                carinfoDatas.value = response.data.list;
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}

function callImageFind() {//id===================================================
  axiosapi.get(`/image/find/2`)
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                imageDatas.value = response.data.list;
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}

// ===============顯示圖片===============
    import CarImage from './CarImage.vue';
    const imageByCarIdDatas=ref([]);


function callImageFindByCarId() {
  axiosapi.get(`/image/getCarIdImage/${query.id}`)
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                imageByCarIdDatas.value = response.data.CarIdImageList;
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}
    
//以carId搜主圖
const mainImageUrl=ref('');
function showMainImage() {
    axiosapi.get(`/image/isMainPic/${query.id}`)
        .then(function (response) {
            if (response && response.data) {
                console.log("MainPicresponse", response);
                mainImageUrl.value = response.data.isMainPic;
            } else {
                console.error("Invalid response data structure:", response);
                throw new Error("Invalid car data response");
            }
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}

//以carId搜清單圖
const listImageUrl=ref([]);
function showListImage() {
    axiosapi.get(`/image/isListPic/${query.id}`)
        .then(function (response) {
            if (response && response.data) {
                console.log("MainPicresponse", response);
                listImageUrl.value = response.data.isListPic;
                console.log("listurl===========",listImageUrl.value);
                
            } else {
                console.error("Invalid response data structure:", response);
                throw new Error("Invalid car data response");
            }
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}

    function handleClick() {
      console.log("carDatas before submit:", carData.value);
      emits('customModify',carData.value);
      router.push({ name: 'car-list-link' });//完成修改跳轉
    }

</script>
    
<style>

</style>