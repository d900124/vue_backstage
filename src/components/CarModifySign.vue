<template>
<!----------------搜尋欄位跟搜尋鍵並排 ---------------->

    <div style="display: flex; align-items: center;">

<!----------------品牌查詢 --------------------------->
    <el-select
      v-model="findBrand"
      clearable
      placeholder="Brand"
      size="small"
      style="width: 130px; margin-right: 20px;"
    >
      <el-option
        v-for="option in brandOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>

<!-------------- 車輛查詢 ----------------------->
    <el-input
      v-model="input"
      clearable
      placeholder="modelName"
      size="small"
      style="width: 130px; margin-right: 20px;"
    />

<!-------------- 模糊查詢鈕 ---------------------->
    <div
      class="btm-div"
      style="display: flex; align-items: center;"
      @click="performSearch"
    >
      <font-awesome-icon
        icon="magnifying-glass"
        size=""
        style="color: #a33238; padding: 0; margin-right: 5px;"
      />
      <el-button type="" link style="color: #a33238; font-weight: 900;">
        查詢
      </el-button>
    </div>
  </div>

<!---------------------- 車輛列表 --------------------->

            <div class="table-part">
            <table class="table">
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">ID</th>
                        <th scope="col" class="table-th">品牌/型號</th>
                        <th scope="col" class="table-th">價錢</th>
                        <th scope="col" class="table-th">銷售員</th>
                        <th scope="col" class="table-th">最後修改時間</th>
                        <th scope="col" class="table-th">狀態</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="carData in carDatas" :key="carData.id" :carData="carData">
                        <th scope="row" class="table-td">{{ carData.id }}</th>
                        <td class="table-td">{{ carData.cainfoBrand }} - {{ carData.carinfoModelName }} </td>
                        <td class="table-td">{{ carData.price }} </td>
                        <td class="table-td">{{ carData.employeeName }}</td>
                        <td class="table-td">{{ carData.updateTime }}</td>
                        <td class="table-td">{{ carData.stateName }}</td>
                        <br>
                        <el-button type="danger"  @click="changeId(carData.id)" round >修改</el-button>
                    </tr>
                </tbody>
            </table>
        </div>

<!-------------------- 新增車輛按鈕 --------------------------->

        <div class="btm-div" style="display: flex;" @click="insertcar('insert')">
            <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;"/>
            <el-button type='' link class="text-btm" style="color: #a33238;">新增車輛</el-button>
            </div>
        
</template>
    
<script setup >
import { computed,onMounted,ref } from 'vue';
import axiosapi from '@/plugins/axios';
import { useRouter } from 'vue-router' ;  
import axios from 'axios';  


const router = useRouter()
const props=defineProps([]);
const carDatas=ref([]);
const carId=ref(null);
const findBrand = ref(null);
const input = ref('')

//轉值
const brandOptions = ref([
  { value: '1', label: 'HONDA' },
  { value: '2', label: 'TOYOTA' },
  { value: '3', label: 'MAZDA' },
  { value: '4', label: 'BENZ' },
  { value: '5', label: 'PORSCHE' },
  { value: '6', label: 'BMW' },
  { value: '7', label: 'VOLKSWAGEN' },
  { value: '8', label: 'NISSAN' },
  { value: '9', label: 'SUBARU' }
]);

// 模糊查詢方法
const performSearch = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/searchMore', {
      params: {
        brand: findBrand.value,
        modelName: input.value
      }
    });
    console.log('Search resultsｓ:', response.data);
    carDatas.value = response.data.preferenceCarList.map(car => ({//定義前端跟後端接值的名字
      id:car.id,
      cainfoBrand:car.brand,
      carinfoModelName:car.modelName,
      price:car.price,
      employeeName:car.employeeName,
      updateTime:car.updateTime,
      stateName:car.state
    }));

    console.log('Mapped car data:', carDatas.value);
  } catch (error) {
    console.error('Error performing search:', error);
  }
};

onMounted(function(){
    callFindAll();
});

function changeId(id) {
    carId.value=id
    goToModify(id);
}

function callFindAll() {
    let request = {
        pageNumber: 1,
        sortOrder: "asc",
        max: 100
    };

    axiosapi.get(`/car/findAll`, { params: request })
            .then(function (response) {
                if (response && response.data) {
                    console.log("response", response);
                    carDatas.value = response.data.list;
                    total.value = response.data.totalElements;
                    pages.value = response.data.totalPages;
//                     carDatas.value.forEach(cardata=>{
//     console.log("carID=",cardata.id);
// });
                } else {
                    console.error("Invalid response data structure:", response);
                }
    
                // setTimeout(function () {
                //     Swal.close();
                // }, 500);
            })
            .catch(function (error) {
                console.error("Error fetching data:", error);//這邊有刪掉為定義的response
                Swal.fire({
                    text: "查詢失敗：" + error.message,
                    icon: "error"
                });
            });
}

//跳轉修改頁面
const goToModify = (id) => {
  
  router.push({ name: 'carmodify-link',
  query: {
      id: id,
    },
   });

};

// 跳轉新增頁面
const insertcar = () => {
  router.push({ name: 'carinsert-link'});

};

</script>
    
<style>
    
</style>