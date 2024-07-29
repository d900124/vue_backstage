<template>

    <div class="col-12" style="height: 50px;"></div>
    <div class="col-1">&nbsp;</div>
    <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;"></div>
<!-- 抬頭 -->
    <div class="col-2" style="padding: 0px 0px;display: flex; justify-content: flex-end;align-items:flex-end;">
        <h3 class="table-title" id="personalInfo">個人資訊 & 考績</h3>
    </div>
    <div class="col-1">&nbsp;</div>


    <div class="col-1" style="padding: 0px 0px;"></div>
    <div class="col-10" style="padding: 0px 0px;;display: flex">
        <!-- 列表主體 -->
        <div class="col-4" style="padding: 0px 0px;">
            <div class="infoBox" style="border: unset;width: 85%;margin-left: 8%" >
                <h4 class="infoTitle" >上季度考績評比<br> - 2024 Q2 -</h4>
                <div class="infoTextBox2" style=" bottom: 2%;">
                    <div class="infoText" style="margin: 10% 0;padding:10% 0; border-bottom: 1px solid #a33238;" >
                    顧客評比均分：{{ singleItem.salesScore }} 分<br>
                    主管評分：{{ singleItem.teamLeaderRating }} 分<br></div>
                    <div class="infoText">
                    加權合計：<spun style="color: red; font-weight: 900;">{{ singleItem.totalScore}}</spun> 分</div>

                    <div class="infoText2" style="text-align: right;margin: 18% 0 0 0;" @click="empPageCallKpiFindByHQL();personalKPIVisible=true">
                        <font-awesome-icon icon="magnifying-glass" size="" style="color: #a33238; padding: 0;"/>
                        各季考核總覽</div>
                    

                </div>
            </div>
        </div>
        <div class="col-4" style="padding: 0px 0px;height:100%">
            <div class="infoBox" >
                <h4 class="infoTitle" >個人資料<br> - {{ employeeInfo.name }} -</h4>
                <div class="infoTextBox" style=" bottom: 2%;">
                    <p class="infoText">員工編號：{{ employeeInfo.id }}<br>
                    職等：{{ employeeInfo.accountTypeName }}<br>
                    姓名：{{ employeeInfo.name }}<br>
                    性别：{{ employeeInfo.sex }}<br>
                    帳號：{{ employeeInfo.account }}<br>
                    手機：{{ employeeInfo.phone }}<br>
                    Email：{{ employeeInfo.email }}<br>
                    入職日：{{ employeeInfo.startDate }}<br>
                    直屬主管：{{ employeeInfo.teamLeaderName }}<br>
                    分店：{{ employeeInfo.branchName }}</p>

                </div>
            </div>
        </div>
        <div class="col-4" style="padding: 0px 0px;">
            <img src="../../public/personal_photo.jpg" alt="employeeInfo.name" style="width: 100%;">
        </div>
    </div>
    <div class="col-1" style="padding: 0px 0px;"></div>


<!-- 個人KPI詳情 -->
<el-dialog v-model="personalKPIVisible" title="" width="800" draggable overflow>
    <div class="row">
    <div class="col-4" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;background-color: unset;">
        <h4 class="table-title" style="float: left;margin-left:22px ;" >KPI記錄表</h4>
    </div>
    <div class="col-8" style="padding: 0px 20px;display: flex; justify-content: flex-end;align-items: center;">
        
        <el-input-number
            clearable
            v-model="findKpiYear"
            placeholder="年分"
            size="small"
            controls-position="right"
            style="width: 110px;"
            @change = "current=1;empPageCallKpiFindByHQL(false)"
        />
    </div>
    </div>
    <el-table :data="items">
      <el-table-column property="seasonStrDayString" label="考核起始日" width="150"/>
      <el-table-column property="teamLeaderRating" label="主管評分" width="150"/>
      <el-table-column property="salesScore" label="顧客評比均分" width="150" />
      <el-table-column property="totalScore" label="加權合計" width="150" style="color: #a33238"/>
      <el-table-column property="teamLeaderName" label="所屬主管" />
    </el-table>

    <div class="row">
        <div class="col-1"></div>
            <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
            </div>

            <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; height: 50px;">
<!-- 分頁區塊 -->
                <el-pagination
                    style="margin: 10px 0px;"
                    hide-on-single-page=true
                    layout="total,prev, pager, next"
                    :total="total"
                    :page-size="rows"
                    v-model:current-page="current"
                    @change="empPageCallKpiFindByHQL()"
                ></el-pagination>
                

                </div>
            <div class="col-1"></div>
    </div>
  </el-dialog>
<div class="col-1"></div>

</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';

const store = useStore();
// 确保 employeeInfo 在页面加载时是一个初始值为空的对象，而不是 null 或 undefined。这样可以确保在模板渲染时不会出错
const employeeInfo = computed(() => store.state.employeeInfo.data || {});
const accountTypeName = computed(() => employeeInfo.value?.accountTypeName || '');
console.log('===>Employee info:', employeeInfo);
console.log('===>Employee info:', employeeInfo.value);
console.log('Account Type Name:', accountTypeName.value);

//登錄資訊用 使用 async 和 await 來等待 Vuex action 完成並更新
const fetchEmployeeData = async () => {
  const username = localStorage.getItem("username");
  if (username) {
    await store.dispatch("fetchEmployeeInfo", username);
  }
};

//分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(4) //分頁資料顯示筆數

//KPI顯示用的參數
const items = ref([]);
const singleItem= ref([])

//KPI彈出視窗用
const personalKPIVisible = ref(false)
const findKpiYear =ref(null)

onMounted(async () => {
    await fetchEmployeeData();
    empPageCallLastKpiFindByHQL();

});
//單筆查詢 //上季度資料
function empPageCallLastKpiFindByHQL() {
    
    console.log("callFindByHQL - 當前頁碼:",current.value);

    let request ={ 
        "employeeId":employeeInfo.value.id,

        "isPage":0,
        "max":999,
        "dir":false,
        "order":"seasonStrDay"
    }

    console.log("KPI request",request);

    axiosapi.post("/kpi/findByHQL",request).then(function (responce) {  //(AJAX前端程式)多產品查詢的Post功能()
        singleItem.value = responce.data.data[1];
        console.log("singleItem KPI",singleItem.value);

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}

//多筆查詢 //放大鏡內查全部與分頁
function empPageCallKpiFindByHQL() {
    let selectStrDay =null;
    let selectEndDay =null;

    const kpiYear = findKpiYear.value;
    if (kpiYear !== null){
        selectStrDay = `${kpiYear}-01-01`;
        selectEndDay = `${kpiYear}-12-31`;
    }else{
        selectStrDay = null;
        selectEndDay = null;
    }
    console.log("callFindByHQL - 當前頁碼:",current.value);

    let request ={ 
        "employeeId":employeeInfo.value.id,
        "selectStrDay":selectStrDay, 
        "selectEndDay":selectEndDay, 

        "isPage":current.value-1,
        "max":rows.value,
        "dir":false,
        "order":"seasonStrDay"
    }

    console.log("KPI request",request);

    axiosapi.post("/kpi/findByHQL",request).then(function (responce) {  //(AJAX前端程式)多產品查詢的Post功能()
        items.value = responce.data.data;

        //計算分頁比數資訊
        total.value = responce.data.totalElement;
        pages.value = responce.data.totalPage;

        console.log("items",responce.data.data);
        console.log("total",responce.data.totalElement);
        console.log("responce KPI",items.value);

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}
</script>

<style scoped>
.infoTitle{
    text-align:left;
    color: #a33238;
    font-weight: 900;

}

.infoBox{
    margin: 10% 0%;
    padding: 0% 5%;
    border-left: solid 1px #a33238;
    align-items: flex-start;
    height: 84%;
    position: relative;
}

.infoTextBox{
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0% 5%; /* Adjust based on padding */
    display: flex;
        justify-content: flex-start;
        align-items: flex-end; /* Align items to the bottom */
        width: 90%; /* Adjust width if necessary */
}
.infoTextBox2{
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0% 5%; /* Adjust based on padding */
        justify-content: flex-start;
        align-items: flex-end; /* Align items to the bottom */
        width: 90%; /* Adjust width if necessary */
}

.infoText{
    text-align: left;
    width: 100%; /* Ensure text takes up the full width */
    margin: 0;
    color: #a33238;
    font-weight: 900;
    line-height: 150%;
    letter-spacing:1px
}

.infoText2{
    text-align: left;
    width: 100%; /* Ensure text takes up the full width */
    margin: 0;
    color: #a33238;
    font-weight: 900;
    line-height: 150%;
    letter-spacing:1px
}

.infoText2:hover{
    text-decoration:underline 2px solid #a33238;
}

.col-4{
    background-color: #fff5eb;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff5eb;
    padding: 20px;
}

.header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.table-part {
    width: 100%;
    max-width: 800px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table-th {
    color: #a33238;
    font-weight: 900;
    text-align: left;
}

.table-td {
    font-size: 0.9em;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
}

.table-title {
    color: #a33238;
    font-weight: 900;
}

thead tr {
    border-bottom: 2px solid #a33238;
}

tbody tr:last-child td {
    border-bottom: none;
}


</style>