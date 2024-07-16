<template>
<!-- https://getbootstrap.com/docs/5.2/content/tables/#table-group-dividers 表單部分 --> 
<!-- https://element-plus.org/zh-CN/component/config-provider.html  頁碼 -->

            <div class="col-1"></div>
<!-- 多選下拉選單(簡易搜尋) -->
            <div class="col-5" style="padding: 0px 0px;"></div>

<!-- 抬頭 -->
            <div class="col-5" style="padding: 0px 0px;">
                <h3 class="table-title">車輛調整簽核</h3>
            </div>
            <div class="col-1"></div>

            <div class="col-1"></div>
            <div class="col-10">
<!-- 彈出式複雜搜尋 -->
                <div class="extra-menu"></div>
<!-- 列表主體 -->
                <div class="table-part">
                <table class="table">
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                    <th scope="col" class="table-th" >簽核編號</th>
                    <th scope="col" class="table-th" >品牌 - 型號</th>
                    <th scope="col" class="table-th" >簽核需求</th>
                    <th scope="col" class="table-th" >建立時間</th>
                    <th scope="col" class="table-th" >建立者</th>
                    <th scope="col" class="table-th" >簽核狀態</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="item in items" :key="item.id"  @click="itemClick(item.id)">
                    <th scope="row" class="table-td">{{item.id}}</th>
                    <td class="table-td"></td>
                    <td class="table-td">{{item.approvalTypeName}} {{item.floatingAmount}}</td>
                    <td class="table-td">{{item.createTimeString}}</td>
                    <td class="table-td">{{item.employeeName}}</td>
                    <td class="table-td">{{item.approvalStatusName}}</td>
                    </tr>
                    
                </tbody>
                </table>
                <div>
                </div>
            </div>
            
        </div>
        <div class="col-1"></div>

        <div class="col-1"></div>
        <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
<!-- 新增用按鈕 -->
            <div class="btm-div" style="display: flex;" @click="openModal('insert')">
            <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;"/>
            <el-button type='' link class="text-btm" style="color: #a33238;">新增簽核</el-button>
            </div>
        </div>

        <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
<!-- 分頁區塊 -->
            <el-pagination
                style="margin: 10px 0px;"
                hide-on-single-page=true
                layout="total,prev, pager, next"
                :total="total"
                :page-size="rows"
                v-model:current-page="current"
                @change="callFindByHQL"
            ></el-pagination>
            

            </div>
        <div class="col-1"></div>


<!-- 下方詳細資料區 -->
            <div v-if="openZon" style="height: 50px;"></div>
            <div v-if="openZon" class="col-1"></div>
            <div v-if="openZon" class="col-5" style="padding: 0px 0px;"></div>
            <div v-if="openZon" class="col-5" style="padding: 0px 0px;">
                <h5 class="table-title" >簽核編號 {{singleItem.id}} --單筆詳細資料</h5>
            </div>
            <div class="col-1"></div>
            <div v-if="openZon" class="col-1" ></div>
            <div v-if="openZon" class="col-10" style="height: 300px; background-color:rgb(245, 250, 250)  ;">

                <div class="table-responsive" style="padding:20px ; ">
                <table class="table" style="width: 1000px; ">
                    <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                    <th scope="col" class="table-th" >簽核編號</th> 
                    <th scope="col" class="table-th" >車輛編號</th>
                    <th scope="col" class="table-th" >品牌型號</th>
                    <th scope="col" class="table-th" >品牌型號</th>
                    <th scope="col" class="table-th" >簽核需求</th>
                    <th scope="col" class="table-th" >原始價錢</th>
                    <th scope="col" class="table-th" >改後價錢</th>
                    </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr >
                        <th scope="row" class="table-td">{{singleItem.id}}</th>
                        <td class="table-td">{{singleItem.carId}}</td>
                        <td class="table-td"></td>
                        <td class="table-td"></td>
                        <td class="table-td">{{singleItem.approvalTypeName}}</td>
                        <td class="table-td"></td>
                        <td class="table-td">{{singleItem.floatingAmount}}</td>
                        </tr>
                        
                    </tbody>
                    <div style="height: 20px;"></div>
                    <thead style="border-bottom: 2px solid #a33238;" >
                        <tr>
                        <th scope="col" class="table-th" >建立者編號</th>
                        <th scope="col" class="table-th" >建立者</th>
                        <th scope="col" class="table-th" >主管編號</th>
                        <th scope="col" class="table-th" >主管姓名</th>
                        <th scope="col" class="table-th" >建立時間</th>
                        <th scope="col" class="table-th" >修改時間</th>
                        <th scope="col" class="table-th" >簽核狀態</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr >
                            <th scope="row" class="table-td"></th>
                            <td class="table-td">{{singleItem.employeeName}}</td>
                        <td class="table-td"></td>
                        <td class="table-td">{{singleItem.teamLeaderName}}</td>
                        <td class="table-td">{{singleItem.createTimeString}}</td>
                        <td class="table-td">{{singleItem.updateTimeString}}</td>
                        <td class="table-td">{{singleItem.approvalStatusName}}</td>
                        </tr>
                        
                    </tbody>
                </table>
                </div>

            </div>
            <div v-if="openZon" class="col-1"></div>
            
</template>
    
<script setup >
import { onMounted,ref } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

//用於重新導向 router.push
const router = useRouter()

//分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(4) //分頁資料顯示筆數

//下方詳細資料開啟用
const openZon = ref(false)

//產品顯示products元件用的參數
const items = ref([]);
const singleItem= ref([])

onMounted(function () {
    callFindByHQL();
})

//單筆新增
function openModal(){
console.log("openModal");
}

//單筆查詢
function itemClick(itemId){
    console.log(itemId)
    axiosapi.get("/carAdjust/"+itemId).then(function (responce) {  //(AJAX前端程式)單筆查詢的Post功能()
        console.log("responce",responce.data);
        singleItem.value = responce.data.data;
        console.log("singleItem.value.id",singleItem.value.id);
        openZon.value = true

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}


//多筆查詢
function callFindByHQL(){
    console.log("callFindByHQL - 當前頁碼:",current.value);

    let request ={ 
        "id":null, 
        "viewCarDateStr":null, 
        "viewCarDateEnd":null, 
        "employeeId":null, 
        "teamLeaderId":null, 
        "viewCarId":null, 
        "carId":null,
        "carinfoId":null, 
        "suspensionid":null, 
        "assignedStatus":null,

        "isPage":current.value-1,
        "max":rows.value,
        "dir":true,
        "order":"id"
    }

    axiosapi.post("/carAdjust/findByHQL",request).then(function (responce) {  //(AJAX前端程式)多產品查詢的Post功能()
        items.value = responce.data.data;

        //計算分頁比數資訊
        total.value = responce.data.totalElement;
        pages.value = responce.data.totalPage;

        console.log("items",responce.data.data);
        console.log("total",responce.data.totalElement);
        console.log("responce",responce.data);
        // setTimeout(function () {
        //         Swal.close();  //視窗關閉 
        //     }, 500);

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
.btm-div:hover{
    text-decoration:underline 2px solid #a33238;
}

.text-btm{
    font-size: 1.2em ;
    font-weight: 900;
}

.table-td{
    font-size: 0.8em ;
}

.table-th{
    color: #a33238;
}

div.col-10{
    padding: 0px 0px;
    background-color: #fff5eb;
    justify-content: center; 
    display: flex;
}
th,tr,td{
    background-color: unset;
    width: 100px;
}
.table-part{
    width: 95%;
    padding: 20px;
}
.table{
    width: 95%;
    margin: auto;
    padding: 10px 10px;
}

.extra-menu{
    width: 5%;
    background-color: #a33238;

}

.table-title{
    float: right;
    color: #a33238;
    font-weight: 900;
    margin: 10px 0px;
}
</style>