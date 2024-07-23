<template>
    <div class="col-1">&nbsp;</div>
    <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;"></div>
<!-- 抬頭 -->
    <div class="col-2" style="padding: 0px 0px;">
        <h3 class="table-title" id="ViewCarAssigned">賞車詳請</h3>
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
            <th scope="col" class="table-th" >單號</th>
            <th scope="col" class="table-th" >狀態</th>
            <th scope="col" class="table-th" >品牌 - 車型</th>
            <th scope="col" class="table-th" >日期</th>
            <th scope="col" class="table-th" >時段</th>
            <th scope="col" class="table-th" >客戶名稱</th>
            <th scope="col" class="table-th" >銷售</th>
            <th scope="col" class="table-th" >是否排單</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr v-for="item in items" :key="item.id"  @click="">
            <th scope="row" class="table-td">{{item.id}}</th>
            <td class="table-td">{{item.viewCarStatusName}}</td>
            <td class="table-td">{{item.branch}} - {{item.modelName}}</td>
            <td class="table-td">{{item.viewCarDate}}</td>
            <td class="table-td">{{item.viewTimeSection}}</td>
            <td class="table-td">{{item.customerName}}</td>
            <td v-if="!isVKAModify" class="table-td">{{item.employeeName}}</td>
            <td v-if="isVKAModify" class="table-td">
            </td>
            <td class="table-td">{{item.assignedStatusName}}</td>
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
<!-- 賞車排單修改按鈕-->
        <div class="col-5" style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-start; ">
        <el-switch
            v-model="isVKAModify"
            inline-prompt
            class="value5"
            size="large"
            active-text="&nbsp;&nbsp;開啟修改&nbsp;&nbsp;"
            inactive-text="&nbsp;&nbsp;資料鎖定&nbsp;&nbsp;"   
            style="--el-switch-on-color: #a33238; ;"
            @click = "openDoKpiModify"
            />
        </div>
    </div>

    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; height: 50px;">
<!-- 分頁區塊 -->
        <el-pagination
            style="margin: 10px 0px;"
            hide-on-single-page=true
            layout="total,prev, pager, next"
            :total="total"
            :page-size=rows
            v-model:current-page="current"
            @change="callViewCarSelect(false)"
        ></el-pagination>
        

    </div>
<div class="col-1"></div>
</template>
    
<script setup>
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
const rows = ref(1) //分頁資料顯示筆數 (ViewCarService 目前鎖定為1)

//產品顯示products元件用的參數
const items = ref([]);
const singleItem= ref([])

//修改賞車排業務用
const isVKAModify = ref(false)

onMounted(function () {
    callViewCarSelect(false);
})

//賞車查詢
function callViewCarSelect(doCreat) {

    if (doCreat) {
        current.value=1
        cleanViewCarFind();
    }
    console.log("getViewCar",`/front/viewCar/selectAll?pageNumber=${current.value}`)
    axiosapi.get(`/front/viewCar/selectAll?pageNumber=${current.value}`).then(function (responce) {  
        items.value = responce.data.list;
        // items.value[0].dddd = "測試"

        //計算分頁比數資訊
        total.value = responce.data.totalElements;
        pages.value = responce.data.totalPage;

        console.log("items",responce.data.list);
        console.log("total",responce.data.totalElements);
        console.log("responce",responce.data);
        console.log("length",responce.data.list.length);//本頁數量
        for (const vcInfo of items.value){
            switch (vcInfo.viewCarStatus) {
                case 0:
                vcInfo.viewCarStatusName="預約中"
                    break;
                case 1:
                vcInfo.viewCarStatusName="時間確定"
                    break;
                case 2:
                vcInfo.viewCarStatusName="完成賞車"
                    break;
                case 3:
                vcInfo.viewCarStatusName="註銷"
                    break;
                default:
                    vcInfo.viewCarStatusName="??"     
                    break; 
            }

            let request ={
                "viewCarId":vcInfo.id,
                "isPage":0,
                "max":999,
                "dir":false,
                "order":"updateTime"  
            }
            axiosapi.post("/viewCarAssigned/findByHQL",request).then(function (responce) {
                console.log("no單1");
                console.log(responce.data.data);
                if (responce.data.data.length==0) {
                    console.log("no單");
                    vcInfo.viewCarAssignedId=-10
                    vcInfo.employeeId=-10
                    vcInfo.employeeName="--"
                    vcInfo.assignedStatus=-1
                    vcInfo.assignedStatusName="未指派"
                }else{
                    vcInfo.viewCarAssignedId=responce.data.data[0].id
                    vcInfo.employeeId=responce.data.data[0].employeeId
                    vcInfo.employeeName=responce.data.data[0].employeeName
                    vcInfo.assignedStatus=responce.data.data[0].assignedStatus
                    vcInfo.assignedStatusName=responce.data.data[0].assignedStatusName
                }
            }).catch(function (error) {
                console.log("error",error);
                Swal.fire({
                        text: "查詢錯誤"+error.message,
                        icon: "error"
                    });
            }) 
        }

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢賞車錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}
    
</script>
    
<style scoped>
    .btn-close{
    margin: 10px;
}


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

.msg-title{
    color: #a33238;
    font-weight: 900;
    margin: 10px 0px;
}

.creat-title{
    color: black;
    font-weight: 900;
    margin: 20px 20px;
}
</style>