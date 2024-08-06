<template>
  <div class="col-12" style="margin-top: 50px;"></div>
  <div class="col-1"></div>
  <div class="col-5" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;">
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
  </div>
  <div class="col-5" style="padding: 0px 0px;display: flex; justify-content: flex-end;align-items: center;">
    <h3 class="table-title" id="cars">車輛總覽</h3>
  </div>
  <div class="col-1"></div>
  
  <div class="col-1"></div>
  <div class="col-10">
  
  
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
                     <tr v-if="carDatas.length === 0">
                     <td colspan="6" class="table-td">沒有這筆資料</td>
                     </tr>
                     <br>
                      <tr v-for="carData in carDatas" :key="carData.id" :carData="carData">
                          <th scope="row" class="table-td">{{ carData.id }}</th>
                          <td class="table-td">{{ carData.cainfoBrand }} - {{ carData.carinfoModelName }} </td>
                          <td class="table-td">{{ carData.price }} </td>
                          <td class="table-td">{{ carData.employeeName }}</td>
                          <td class="table-td">{{ carData.updateTime }}</td>
                          <td class="table-td">{{ carData.stateName }}</td>
                          <el-button type="danger" style="background-color:#a33238; color:white"  @click="changeId(carData.id)" round >修改</el-button>
                      </tr>
                  </tbody>
              </table>
          </div>
  
<!-------------------- 新增車輛按鈕 --------------------------->
  
          <div class="btm-div" style="display: flex;" @click="insertcar('insert')">
              <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;"/>
              <el-button type='' link class="text-btm" style="color: #a33238;">新增車輛</el-button>
              </div>
 <!-------------------- 返回車輛資訊按鈕 --------------------------->

              <div class="btm-div" style="display: flex;" @click="goBack">
              <font-awesome-icon icon="arrow-left" size="xl" style="color: #a33238; padding: 13 5 0 5;" />
              <el-button type='' link class="text-btm" style="color: #a33238;">返回車輛資訊列表</el-button>
          </div>
          <p></p>
<!--------------------- 分頁組件 ----------------------->
          <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="currentPage"
          :page-size="5"
          @current-change="handlePageChange"
        ></el-pagination> 
      </div> 
      <div class="col-1"></div>      
  </template>
      
  <script setup >
  import { computed,onMounted,ref } from 'vue';
  import axiosapi from '@/plugins/axios';
  import { useRouter } from 'vue-router' ;  
  
  
  const router = useRouter()
  const props=defineProps([]);
  const carDatas=ref([]);
  const carId=ref(null);
  const findBrand = ref(null);
  const input = ref('')
  const total = ref(0);
  const currentPage = ref(1);
  

  //轉值 品牌
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
  
  //轉值 狀態
  const stateMapping = {
    '1': '草稿',
    '2': '上架',
    '3': '下架',
    '4': '暫時下架',
  };
  
  
  // 模糊查詢方法
  const performSearch = async () => {
  try {
    const response = await axiosapi.get('/preference/searchMore', {
      params: {
        brand: findBrand.value,
        modelName: input.value,
      }
    });
    console.log('Search results:', response.data);
    
    if (response.data && Array.isArray(response.data.preferenceCarList)) {
      const allResults = response.data.preferenceCarList.map(car => ({
        id: car.id,
        cainfoBrand: car.brand,
        carinfoModelName: car.modelName,
        price: car.price,
        employeeName: car.employeeName,
        updateTime: car.updateTime,
        stateName: stateMapping[car.state]
      }));
      
      total.value = allResults.length;
      updatePagedResults(allResults);//搜尋結果儲存
    } else {
      carDatas.value = [];
      total.value = 0;
    }
    
    console.log('Mapped car data:', carDatas.value);
  } catch (error) {
    console.error('Error performing search:', error);
  }
};

const updatePagedResults = (allResults) => {
  const startIndex = (currentPage.value - 1) * 5; // 假設每頁5項
  const endIndex = startIndex + 5;
  carDatas.value = allResults.slice(startIndex, endIndex);
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
          pageNumber: currentPage.value,//抓出結果到頁面
          sortOrder: "asc",
          max: 5
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

  const goBack = () => {
  // 使用 router.push 來返回原始頁面並重新載入資料
  router.push({ name: 'car-list-link' }).then(() => {
    // 重新調用 callFindAll 以刷新資料
    callFindAll();
  });
};

const handlePageChange = (newPage) => {//查詢跟findAll的分頁
  currentPage.value = newPage;
  if (findBrand.value || input.value) {
    performSearch();
  } else {
    callFindAll();
  }
};

  
  </script>
      
  <style>
       
  .table-title{
    float: right;
    color: #a33238;
    font-weight: 900;
    margin: 10px 0px;
}
  </style>