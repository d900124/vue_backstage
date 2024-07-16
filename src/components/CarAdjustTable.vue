<template>
        <!-- https://getbootstrap.com/docs/5.2/content/tables/#table-group-dividers 表單部分 --> 
        <!-- https://element-plus.org/zh-CN/component/config-provider.html  頁碼 -->
    

            <div class="col-1"></div>
            <div class="col-5" style="padding: 0px 0px;"></div>
            <div class="col-5" style="padding: 0px 0px;">
                <h3 class="table-title">車輛調整簽核</h3>
            </div>
            <div class="col-1"></div>

            <div class="col-1"></div>
            <div class="col-10">
                <div class="extra-menu"></div>
                <div class="table-part">
                <table class="table">
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                    <th scope="col" class="table-th" >ID</th>
                    <th scope="col" class="table-th" >Brand - Model</th>
                    <th scope="col" class="table-th" >Request</th>
                    <th scope="col" class="table-th" >Time</th>
                    <th scope="col" class="table-th" >Salse</th>
                    <th scope="col" class="table-th" >State</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    </tr>
                    
                </tbody>
                </table>
                <div>
                </div>
            </div>
            
        </div>
        <div class="col-1"></div>

        <div class="col-1"></div>
        <div class="col-10" style="background-color: unset; justify-content:right">
            
            <el-pagination
                hide-on-single-page="true"
                layout="total,prev, pager, next"
                :total="total"
                style="margin: 10px 0px;"
                :page-size="pageSize"
            ></el-pagination>
            

            </div>
        <div class="col-1"></div>
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
const starts = ref(0) //起始資料位址
const pageSize = ref(7) //每頁數量

//產品顯示products元件用的參數
const items = ref([]);

onMounted(function () {
    callFindByHQL();
})

function callFindByHQL(page){
    console.log("callFindByHQL",page);

    //獲取分頁資訊
    if (page) {
        starts.value=(page-1)*rows.value;
        current.value=page;
    }else{
        starts.value=0;
        current.value=1;
    }

    let request ={ //查詢的request將 "分頁-起始資料位址" 和 "分頁-顯示筆數" 填入
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

        "isPage":0,
        "max":3,
        "dir":true,
        "order":"id"
    }

    axiosapi.post("/viewCarAssigned/findByHQL",request).then(function (responce) {  //(AJAX前端程式)多產品查詢的Post功能()
        items.value = responce.data.data;

        //計算分頁比數資訊
        total.value = responce.data.totalElement;
        pages.value = responce.data.totalPage;
        pageSize.value = responce.data.numberOfElementsOnPage

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
    background-color: #fff5eb;
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