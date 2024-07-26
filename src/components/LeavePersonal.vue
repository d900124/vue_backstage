<template>
    <!-- 抬頭 -->
    <div class="col-11" style="padding: 0px 0px;">
        <h3 class="table-title">請假申請</h3>
    </div>
    <!-- 主容器 -->
    <!-- 左邊的剩餘假別表格 -->
    <div class="left-panel" v-if="employeeInfo">
        <div class="table-part">
            <table class="table">
                <thead class="table-head">
                    <tr style="color: #a33238; font-size: 23px; font-weight: bold;">
                        {{ employeeInfo.name }}
                    </tr>
                    <tr>
                        <th class="table-th">可用剩餘假別時數</th>
                    </tr>
                </thead>
                <tbody class="table-body">
                    <tr>
                        <th scope="row" class="table-td">事假</th>
                        <td class="table-td">{{ employeeInfo.personalLeaveHours }} 小時</td>
                    </tr>
                    <tr>
                        <th scope="row" class="table-td">病假</th>
                        <td class="table-td">{{ employeeInfo.sickLeaveHours }} 小時</td>
                    </tr>
                    <tr>
                        <th scope="row" class="table-td">特休</th>
                        <td class="table-td">{{ employeeInfo.annualLeaveHours }} 小時</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-5"
            style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
            <!-- 新增用按鈕 -->
            <div class="btm-div" style="display: flex;" @click="openModal('insert')">
                <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;" />
                <el-button type='' link class="text-btm" style="color: #a33238;margin: 12px 0 0 0;">新增簽核</el-button>
            </div>
        </div>
    </div>
    <!-- 列表主體 -->
    <div class="table-partr right-panel" v-if="employeeInfo">
        <table class="table">
            <thead style="border-bottom: 2px solid #a33238;">
                <tr>
                    <th scope="col" class="table-th">申請時間</th>
                    <th scope="col" class="table-th">假種</th>
                    <th scope="col" class="table-th">請假時段</th>
                    <th scope="col" class="table-th">時數</th>
                    <th scope="col" class="table-th">簽核狀態</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="leave in leaves" :key="leave.id" @click="leaveInfo(leave.id)">
                    <th scope="row" class="table-td">{{ leave.createTime }}</th>
                    <td class="table-td">{{ leave.leaveTypeName }} </td>
                    <td class="table-td">{{ leave.startTime }}<br>{{ leave.endTime }}</td>
                    <td class="table-td">{{ leave.actualLeaveHours }}</td>
                    <td class="table-td">{{ getPermisionStatusText(leave.permisionStatus) }}</td>
                </tr>
            </tbody>

        </table>
        <div>
        </div>
    </div>

    <div class="col-3"></div>


    <div class="col-11" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
        <!-- 分頁區塊 -->
        <el-pagination style="margin: 10px 0px;" hide-on-single-page=true layout="total,prev, pager, next"
            :total="total" :page-size="rows" v-model:current-page="current" @change="callQuery"></el-pagination>


    </div>
    <div class="col-1"></div>

    <!-- 新增區塊 / 抬頭-->
    <div v-if="openCreat" style="height: 50px;"></div>
    <div v-if="openCreat" class="col-1"></div>
    <div v-if="openCreat" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="openCreat = false">
        <el-divider content-position="center">
            <button type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="table-title">新增簽核</h5>
        </el-divider>
    </div>
    <div v-if="openCreat" class="col-1"></div>

    <!-- 新增區塊 / 資料區-->
    <div v-if="openCreat" class="col-1"></div>
    <div v-if="openCreat" class="col-5" style="height: 250px; background-color:rgb(245, 250, 250)  ;">

        <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
            <el-form-item label="申請員工 :&nbsp;">
                <p style="margin: 0;">串接登入員工</p>
            </el-form-item>

            <el-divider border-style="dashed" style="margin: 0;" />
            <el-form-item label="簽核主管 :&nbsp;">
                <el-select v-model="creatTeamleaderIDValue" placeholder="Select" size="small">
                    <el-option v-for="Option in creatTeamleaderIDOptions" :key="Option.value" :label="Option.label"
                        :value="Option.value" />
                </el-select>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="修改車輛 :&nbsp;">
                <el-input-number v-model="creatCarIDValue" :min="1" :max="10" size="small" controls-position="right" />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="改後價格 :&nbsp;">
                <el-input-number v-model="creatFloatingAmountValue" :min="1000" :max="100000000000000000" size="small"
                    controls-position="right" />
            </el-form-item>

        </el-form>
    </div>

    <div v-if="openCreat" class="col-5" style="height: 250px; background-color:rgb(245, 250, 250)  ;">

        <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
            <el-form-item label="&nbsp;">
                <p style="margin: 0;">&nbsp;</p>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="&nbsp;">
                <p style="margin: 0;">&nbsp;</p>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="簽核狀態 :&nbsp;">
                <p style="margin: 0;">尚未簽核</p>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="簽核需求 :&nbsp;">
                <el-select v-model="creatApprovalTypeValue" placeholder="Select" size="small">
                    <el-option v-for="Option in creatApprovalTypeOptions" :key="Option.value" :label="Option.label"
                        :value="Option.value" />
                </el-select>
            </el-form-item>

        </el-form>
    </div>
    <div v-if="openCreat" class="col-1"></div>


    <!-- 新增區塊 / 確認按鈕-->
    <div v-if="openCreat" class="col-1"></div>
    <div v-if="openCreat" class="col-5"
        style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-start;"></div>
    <div v-if="openCreat" class="col-5"
        style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
        <el-button color="#a33238" :dark="isDark" style="margin: 20 0;" @click="openDoModify">&nbsp確認新增&nbsp</el-button>
    </div>
    <div v-if="openCreat" class="col-1"></div>


    <!-- 下方詳細資料區 / 抬頭-->
    <div v-if="openZon" style="height: 50px;"></div>
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="openZon = false">
        <el-divider content-position="center">
            <button type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="table-title"> {{ employeeInfo.name }} --單筆詳細請假資料</h5>
        </el-divider>
    </div>
    <div v-if="openZon" class="col-1"></div>

    <!-- 下方詳細資料區 / 第一欄-->
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-10" style="height: 250px; background-color:rgb(245, 250, 250)  ;">
        <div class="table-responsive" style="padding:20px ;height: 250px; ">
            <table class="table" style="width: 1000px; ">
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">申請時間</th>
                        <th scope="col" class="table-th">申請人</th>
                        <th scope="col" class="table-th">假種</th>
                        <th scope="col" class="table-th">請假時段</th>
                        <th scope="col" class="table-th">總計時數</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <th scope="row" class="table-td" name="id">{{ singleLeave.createTime }}</th>
                        <td class="table-td">{{ singleLeave.employeeName }}</td>
                        <td class="table-td">{{ singleLeave.leaveTypeName }} </td>
                        <td class="table-td">{{ singleLeave.startTime }}<br>{{ singleLeave.endTime }}</td>
                        <td class="table-td">{{ singleLeave.actualLeaveHours }}</td>
                    </tr>
                </tbody>
                <div style="height: 20px;"></div>
                <!-- 下方詳細資料區 / 第二欄-->
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">請假備註</th>
                        <th scope="col" class="table-th">工作代理人</th>
                        <th scope="col" class="table-th">簽核時間</th>
                        <th scope="col" class="table-th">審核意見</th>
                        <th scope="col" class="table-th">簽核狀態</th>

                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <th scope="row" class="table-td" name="id">{{ singleLeave.reason }}</th>
                        <td class="table-td">{{ singleLeave.deputyName }}</td>
                        <td class="table-td">{{ singleLeave.auditTime }}</td>
                        <td class="table-td">{{ singleLeave.permisionRemarks }}</td>
                        <td class="table-td">{{ getPermisionStatusText(singleLeave.permisionStatus) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>



</template>

<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

//用於重新導向 router.push

const store = useStore();
// 确保 employeeInfo 在页面加载时是一个初始值为空的对象，而不是 null 或 undefined。这样可以确保在模板渲染时不会出错
const employeeInfo = computed(() => store.state.employeeInfo.data || {});
console.log('===>Employee info:', employeeInfo);
console.log('===>Employee info:', employeeInfo.value);
const accountTypeName = computed(() => employeeInfo.value?.accountTypeName || '');
console.log('Account Type Name:', accountTypeName.value);

onMounted(() => {
    const username = localStorage.getItem('username');
    if (username) {
        store.dispatch('fetchEmployeeInfo', username);
    }
});

// 可选：调试数据
watch(employeeInfo, (newValue) => {
    console.log('Employee info updated:', newValue);
});



//用於重新導向 router.push
const router = useRouter()

//分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(4) //分頁資料顯示筆數

//下方詳細資料開啟用
const openZon = ref(false)

//下方新增資料開啟用
const openCreat = ref(false)

//產品顯示leave元件用的參數
const leaves = ref([]);
const singleLeave = ref([])

const getPermisionStatusText = (status) => {
    switch (status) {
        case 1:
            return '簽核中';
        case 2:
            return '同意';
        case 3:
            return '拒絕';
        default:
            return '未知狀態';
    }
};


// 定義審核狀態選項
const permissionStatuses = ref([
    { value: 1, label: '簽核中' },
    { value: 2, label: '同意' },
    { value: 3, label: '拒絕' }
]);


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
        openZon.value = true

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
    const employeeId = computed(() => employeeInfo.value.id);
    console.log('Employee ID:', employeeId.value);

    let request = {
        "pageNum": current.value - 1,  // 由于Spring Boot分页是从0开始，这里减1
        "pageSize": rows.value,
        "employeeId": employeeId.value
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
.right-panel {
    width: 60%;
    padding: 60px;
}

.left-panel {
    width: 30%;
    padding: 40px;
    background-color: #fff5eb;
    position: relative;
    /* 确保父容器是相对定位的 */
}

.btn-close {
    margin: 10px;
}

.btm-div {
    position: absolute;
    right: 20px;
    /* 你可以根据需要调整右侧的距离 */
    bottom: 20px;
    /* 你可以根据需要调整底部的距离 */
    text-decoration: underline 2px solid transparent;
    transition: text-decoration 0.3s;
    /* 添加一个过渡效果 */
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

/* 表头背景颜色 */
.table-head .table-th {
    background-color: #a33238;
    color: white;
    /* 文字颜色 */
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
    width: 100%;
    padding: px;
}

.table {
    width: 100%;
    margin: 10px;
    padding: 10px 10px 10px 10px;

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