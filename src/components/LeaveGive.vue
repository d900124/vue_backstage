<template>
    <!-- https://getbootstrap.com/docs/5.2/content/tables/#table-group-dividers 表單部分 -->
    <!-- https://element-plus.org/zh-CN/component/config-provider.html  頁碼 -->

    <div class="col-1"></div>
    <!-- 多選下拉選單(簡易搜尋) -->
    <div class="col-5" style="padding: 0px 0px;"></div>

    <!-- 抬頭 -->
    <div class="col-5" style="padding: 0px 0px;">
        <h3 class="table-title" id="leave">給假簽核</h3>
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
                        <th scope="col" class="table-th">新增日期</th>
                        <th scope="col" class="table-th">員工</th>
                        <th scope="col" class="table-th">假種</th>
                        <th scope="col" class="table-th">使用期限</th>
                        <th scope="col" class="table-th">共計時數</th>
                        <th scope="col" class="table-th">備註</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="leave in leaves" :key="leave.id">
                        <th scope="row" class="table-td">{{ leave.createTime }}</th>
                        <td class="table-td">{{ leave.employeeName }} </td>
                        <td class="table-td">{{ leave.leaveTypeName }} </td>
                        <td class="table-td">{{ leave.validityPeriodStart }}<br>{{ leave.validityPeriodEnd }}</td>
                        <td class="table-td">{{ leave.actualLeaveHours }}</td>
                        <td class="table-td">{{ leave.permisionRemarks }}</td>
                    </tr>
                </tbody>

            </table>
            <div>
            </div>
        </div>

    </div>


    <div class="col-11" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
        <!-- 分頁區塊 -->
        <el-pagination style="margin: 10px 0px;" hide-on-single-page=true layout="total,prev, pager, next"
            :total="total" :page-size="rows" v-model:current-page="current" @change="callQuery"></el-pagination>


    </div>
    <div class="col-1"></div>




</template>

<script setup>
import { onMounted, ref } from 'vue';
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



//下方新增資料開啟用
const openCreat = ref(false)

//產品顯示leave元件用的參數
const leaves = ref([]);
const singleLeave = ref([])




onMounted(function () {
    callQuery();
})


//單筆新增
function openModal() {
    console.log("openModal");
    openCreat.value = true;
}


//單筆查詢
function leaveInfo(leaveId) {
    console.log(leaveId)
    axiosapi.get("/leave/info/" + leaveId).then(function (responce) {  //(AJAX前端程式)單筆查詢的Post功能()
        console.log("responce", responce.data);
        singleLeave.value = responce.data.data;
        // console.log("singleLeave.value.id", singleLeave.leave.id);
        openZon.value = true
        isModify.value = false

    }).catch(function (error) {
        console.log("error", error);
        Swal.fire({
            text: "查詢錯誤" + error.message,
            icon: "error"
        });
        // router.push("/")
    })
}


// 多筆查詢
function callQuery() {
    console.log("callQuery - 當前頁碼:", current.value);

    let request = {
        "leaveStatus": 1, // 1為給假
        "pageNum": current.value - 1,  // 由于Spring Boot分页是从0开始，这里减1
        "pageSize": rows.value,
        "createTime": singleLeave.value.createTime,
    };

    axiosapi.post("/leave/query", request).then(function (response) {
        leaves.value = response.data.data.content; // 获取查询到的数据列表
        // 更新分页信息
        total.value = response.data.data.totalElements; // 总条目数
        pages.value = response.data.data.totalPages; // 总页数

        console.log("leaves", response.data.data.content);
        console.log("total", response.data.data.totalElements);
        console.log("pages", response.data.data.totalPages);
    }).catch(function (error) {
        console.log("error", error);
        Swal.fire({
            text: "查詢錯誤：" + error.message,
            icon: "error"
        });
    });
}


</script>

<style scoped>
.btn-close {
    margin: 10px;
}


.btm-div:hover {
    text-decoration: underline 2px solid #a33238;
}

.text-btm {
    font-size: 1.2em;
    font-weight: 900;
}

.table-td {
    font-size: 0.8em;
}

.table-th {
    color: #a33238;
}

div.col-10 {
    padding: 0px 0px;
    background-color: #fff5eb;
    justify-content: center;
    display: flex;
}

th,
tr,
td {
    background-color: unset;
    width: 100px;
}

.table-part {
    width: 95%;
    padding: 20px;
}

.table {
    width: 95%;
    margin: auto;
    padding: 10px 10px;
}

.extra-menu {
    width: 5%;
    background-color: #a33238;

}

.table-title {
    float: right;
    color: #a33238;
    font-weight: 900;
    margin: 10px 0px;
}

.msg-title {
    color: #a33238;
    font-weight: 900;
    margin: 10px 0px;
}

.creat-title {
    color: black;
    font-weight: 900;
    margin: 20px 20px;
}
</style>