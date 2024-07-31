<template>
    <div class="col-12" style="height: 50px;"></div>

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
                        <th scope="col" class="table-th">假別</th>
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
    <div class="col-1"></div>

    <div class="col-1"></div>
    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
        <!-- 新增用按鈕 -->
        <div class="btm-div" style="display: flex;" @click="openModal('insert')">
            <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;" />
            <el-button type='' link class="text-btm" style="color: #a33238;">新增給假</el-button>
        </div>
    </div>

    <div class="col-5"
        style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; height: 50px;">
        <!-- 分頁區塊 -->
        <el-pagination style="margin: 10px 0px;" hide-on-single-page=true layout="total,prev, pager, next"
            :total="total" :page-size="rows" v-model:current-page="current" @change="callQuery(false)"></el-pagination>
    </div>
    <div class="col-1"></div>

    <!-- 新增區塊 / 抬頭-->
    <div v-if="openCreate" style="height: 50px;"></div>
    <div v-if="openCreate" class="col-1"></div>
    <div v-if="openCreate" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="openCreate = false">
        <el-divider content-position="center">
            <button type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="table-title">新增給假</h5>
        </el-divider>
    </div>
    <div v-if="openCreate" class="col-1"></div>

    <!-- 新增區塊 / 資料區-->
    <div v-if="openCreate" class="col-1"></div>
    <div v-if="openCreate" class="col-5" style="height: 250px; background-color:rgb(245, 250, 250)  ;">

        <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
            <el-form-item label="員工 :&nbsp;">
                <el-select
            v-if="employeeInfo != null"
            v-model="findEmployeeId"
            placeholder="Select"
            clearable
            size="small"
            style="width: 200px;"
        >
            <el-option
                v-for="option in allEmployees"
                :key="option.value"
                :label="option.label"
                :value="option.value"
            />
        </el-select>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />
            <el-form-item label="假別 :&nbsp;">
                <el-select v-model="leaveType" placeholder="Select" size="small">
                    <el-option v-for="option in leaveTypeOptions" :key="option.value" :label="option.label"
                        :value="option.value" />
                </el-select>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="給假時數 :&nbsp;">
                <el-input v-model="actualLeaveHours" type="text" size="small" />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="&nbsp;">
                <p style="margin: 0;">&nbsp;</p>
            </el-form-item>

        </el-form>
    </div>

    <div v-if="openCreate" class="col-5" style="height: 250px; background-color:rgb(245, 250, 250)  ;">

        <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
            <el-form-item label="開始時間 :&nbsp;">
                <input id="validity-period-start" type="datetime-local" class="form-control"
                    v-model="validityPeriodStart" style="height:25px" />
            </el-form-item>

            <el-form-item label="結束時間 :&nbsp;">
                <input id="validity-period-end" type="datetime-local" class="form-control" v-model="validityPeriodEnd"
                style="height:25px" />
            </el-form-item>

            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="備註 :&nbsp;">
                <el-input v-model="permisionRemarks" type="textarea" placeholder="請輸入備註" size="small" rows="2" />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

        </el-form>
    </div>
    <div v-if="openCreate" class="col-1"></div>


    <!-- 新增區塊 / 確認按鈕-->
    <div v-if="openCreate" class="col-1"></div>
    <div v-if="openCreate" class="col-5"
        style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-start;"></div>
    <div v-if="openCreate" class="col-5"
        style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
        <el-button color="#a33238" :dark="isDark" style="margin: 20 0;" @click="creatDdialogVisible = true"
            round>&nbsp;確認新增&nbsp;</el-button>
    </div>
    <div v-if="openCreate" class="col-1"></div>

    <!-- 確認新增用彈出視窗 -->
    <el-dialog v-model="creatDdialogVisible" width="350" :show-close="false">
        <h5 class="msg-title">確認新增 ?</h5>
        <template #footer>
            <div class="dialog-footer" style="display: flex;justify-content: center;">
                <div>
                    <el-button @click="creatDdialogVisible = false">否</el-button>
                    <el-button type="primary" @click="doCreate" style="background-color: #a33238;border: #a33238;">
                        是
                    </el-button>
                </div>
            </div>
        </template>
    </el-dialog>



</template>

<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const store = useStore();
// 确保 employeeInfo 在页面加载时是一个初始值为空的对象，而不是 null 或 undefined。这样可以确保在模板渲染时不会出错
const employeeInfo = computed(() => store.state.employeeInfo.data || {});
console.log('===>Employee info:', employeeInfo);
console.log('===>Employee info:', employeeInfo.value);
const accountTypeName = computed(() => employeeInfo.value?.accountTypeName || '');
console.log('Account Type Name:', accountTypeName.value);

const creatDdialogVisible = ref(false)  //新增

// 時間
const validityPeriodStart = ref('');
const validityPeriodEnd = ref('');


//用於重新導向 router.push
const router = useRouter()

//分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(4) //分頁資料顯示筆數


//下方新增資料開啟用
const openCreate = ref(false)

//產品顯示leave元件用的參數
const leaves = ref([]);
const singleLeave = ref([])
//新增用
const leaveType = ref('');
const actualLeaveHours = ref('');
const permisionRemarks = ref('');



const leaveTypeOptions = [
    { value: 1, label: "特休" },
    { value: 5, label: "事假" },
    { value: 6, label: "半薪病假" },
    { value: 7, label: "婚假" },
    { value: 8, label: "生理假" },
    { value: 9, label: "公假" },
    { value: 10, label: "喪假" }
];

// 在组件挂载时或 employeeInfo 变化时调用 findAllEmployee
onMounted(() => {
    if (employeeInfo.value) {
        findAllEmployee();
    }
});

watch(employeeInfo, (newValue) => {
    if (newValue) {
        findAllEmployee();
    }
});

// 监控 employeeInfo 的变化，并在其加载完成后执行 callQuery
watch(employeeInfo, (newValue) => {
    if (newValue) {
        callQuery();
    }
});

// 在组件挂载时执行 callQuery（如果 employeeInfo 已经有值）
onMounted(() => {
    if (employeeInfo.value) {
        callQuery();
    }
});

// 假定从某处获取 employeeInfo 的数据，这里用 setTimeout 模拟异步获取数据
setTimeout(() => {
    employeeInfo.value = {
        id: employeeInfo.id, // 示例数据，请根据实际情况调整
        accountType: employeeInfo.accountType
    };
}, 1000);

//查詢全部員工
const allEmployees=ref([]);
const findEmployeeId = ref('');


onMounted(function () {
    callQuery();
})

//員工查詢全部製作下拉選單
function findAllEmployee() {
    axiosapi.get('/employee/all')
        .then(response => {
            console.log('allEmployees', response.data);
            allEmployees.value = response.data.data.map(employee => ({
                value: employee.id,
                label: employee.name
            }));
        })
        .catch(error => {
            console.log('error', error);
            Swal.fire({
                text: '获取员工列表错误：' + error.message,
                icon: 'error'
            });
        });
}

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

//開啟新增區塊
function openModal() {
    console.log("openModal");
    openCreate.value = true;
}

function doCreate() {
    creatDdialogVisible.value = false;

    // 将输入的时间字符串转换为 Date 对象
    const startDate = new Date(validityPeriodStart.value);
    const endDate = new Date(validityPeriodEnd.value);

    // 格式化日期时间为字符串
    const startDateString = formatDateTime(startDate);
    const endDateString = formatDateTime(endDate);

    // 显示 "执行中......" 弹窗
    Swal.fire({
        text: "执行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    let request = {
        "employeeId": findEmployeeId.value,
        "leaveType": leaveType.value,
        "actualLeaveHours": actualLeaveHours.value,
        "validityPeriodStart": startDateString,
        "validityPeriodEnd": endDateString,
        "permisionRemarks": permisionRemarks.value,
        "leaveStatus": 1,
        "teamLeaderId": 1,
        "reason": ""
    };

    axiosapi.post("/leave/add", request)
        .then(function (response) {
            Swal.close();
            if (response.data.success) {
                callQuery(true);
                Swal.fire({
                    icon: "success",
                    text: response.data.msg,
                    showConfirmButton: false,
                }).then(function () {
                    openCreate.value = false;
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.msg,
                });
            }
        })
        .catch(function (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                text: "新增错误：" + (error.response?.data?.msg || '未知错误'),
            });
        });
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