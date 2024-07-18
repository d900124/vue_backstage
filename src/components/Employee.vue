<template>
    <div class="col-1"></div>

    <!-- 簡易搜尋欄位 -->
    <div class="col-5" style="padding: 0px 0px;"></div>

    <!-- 標題區域 -->
    <div class="col-5" style="padding: 0px 0px;">
        <h3 class="table-title">員工總覽</h3>
    </div>

    <div class="col-1"></div>
    <div class="col-1"></div>
    <div class="col-10">
        <!-- 彈出式複雜搜尋 -->
        <div class="extra-menu"></div>

        <!-- 員工列表 -->
        <div class="table-part">
            <table class="table">
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">員工編號</th>
                        <th scope="col" class="table-th">職等</th>
                        <th scope="col" class="table-th">姓名</th>
                        <th scope="col" class="table-th">電話</th>
                        <th scope="col" class="table-th">Email</th>
                        <th scope="col" class="table-th">直屬主管</th>
                        <th scope="col" class="table-th">分店</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="employee in employees" :key="employee.id" @click="employeeClick(employee.id)">
                        <th scope="row" class="table-td">{{ employee.id }}</th>
                        <td class="table-td">{{ employee.accountTypeName }}</td>
                        <td class="table-td">{{ employee.name }}</td>
                        <td class="table-td">{{ employee.phone }}</td>
                        <td class="table-td">{{ employee.email }}</td>
                        <td class="table-td">{{ employee.teamLeaderName }}</td>
                        <td class="table-td">{{ employee.branchName }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="col-1"></div>
    <div class="col-1"></div>
    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">


        <!-- 左下新增按鈕 -->
        <div class="btm-div" style="display: flex;" @click="openModal('insert')">
            <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;" />
            <el-button type='' link class="text-btm" style="color: #a33238;">新增員工</el-button>
        </div>
    </div>
    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">

        <!-- 右下分頁控制區 -->

        <el-pagination style="margin: 10px 0px;" hide-on-single-page=true layout="total,prev, pager, next"
            :total="total" :page-size="rows" v-model:current-page="current" @change="callQuery"></el-pagination>

    </div>
    <div class="col-1"></div>

    <!-- 下方詳細資料區 -->
    <div v-if="openZon" style="height: 50px;"></div>
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="closeInfo">
        <el-divider content-position="center">
            <button type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="table-title">員工編號 {{ singleEmployee.id }} --單筆詳細資料</h5>
        </el-divider>
    </div>
    <div class="col-1"></div>
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-10" style="height: 300px; background-color:rgb(245, 250, 250)  ;">
        <!-- 下方詳細資料區/ 第一欄 -->
        <div class="table-responsive" style="padding:20px ; ">
            <table class="table" style="width: 1000px; ">
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">職等</th>
                        <th scope="col" class="table-th">姓名</th>
                        <th scope="col" class="table-th">入職日</th>
                        <th scope="col" class="table-th">直屬主管</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-if="!isModify">
                        <input type="hidden" v-model="singleEmployee.account">
                        <td class="table-td">{{ singleEmployee.accountTypeName }}</td>
                        <td class="table-td">{{ singleEmployee.name }}</td>
                        <td class="table-td">{{ singleEmployee.startDate }}</td>
                        <td class="table-td">{{ singleEmployee.teamLeaderName }}</td>
                    </tr>
                    <tr v-if="isModify">
                        <input type="hidden" v-model="singleEmployee.account">
                        <td class="table-td">
                            <el-select v-model="singleEmployee.accountTypeName" placeholder="請選擇職等">
                                <el-option label="銷售業務" value="3"></el-option>
                                <el-option label="主管" value="4"></el-option>
                            </el-select>
                        </td>
                        <td class="table-td">
                            <el-input v-model="singleEmployee.name" placeholder="姓名"></el-input>
                        </td>
                        <td class="table-td">
                            <el-date-picker v-model="singleEmployee.startDate" type="date" placeholder="入職日"
                                style="width: 100%;"></el-date-picker>
                        </td>
                        <!-- <td class="table-td">
                            <el-input v-model="singleEmployee.teamLeader" placeholder="直屬主管"></el-input>
                        </td> -->
                        <td class="table-td">
                            <el-select v-model="singleEmployee.teamLeaderName" placeholder="請選擇直屬主管">
                                <el-option v-for="leader in teamLeaders" :key="leader.id" :label="leader.name"
                                    :value="leader.id"></el-option>
                            </el-select>
                        </td>
                    </tr>
                </tbody>
                <div style="height: 20px;"></div>
                <!-- 下方詳細資料區/ 第二欄 -->
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">性別</th>
                        <th scope="col" class="table-th">電話</th>
                        <th scope="col" class="table-th">Email</th>
                        <th scope="col" class="table-th">分店</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-if="!isModify">
                        <td class="table-td">{{ singleEmployee.sex }}</td>
                        <td class="table-td">{{ singleEmployee.phone }}</td>
                        <td class="table-td">{{ singleEmployee.email }}</td>
                        <td class="table-td">{{ singleEmployee.branchName }}</td>
                    </tr>
                    <tr v-if="isModify">
                        <td class="table-td">
                            <el-select v-model="singleEmployee.sex" placeholder="請選擇性別">
                                <el-option label="M" value="M"></el-option>
                                <el-option label="F" value="F"></el-option>
                            </el-select>
                        </td>
                        <td class="table-td">
                            <el-input v-model="singleEmployee.phone" placeholder="電話"></el-input>
                        </td>
                        <td class="table-td">
                            <el-input v-model="singleEmployee.email" placeholder="Email"></el-input>
                        </td>
                        <td class="table-td">
                            <el-select v-model="singleEmployee.branchName" placeholder="請選擇分店">
                                <el-option label="大吉祥" value="1"></el-option>
                                <el-option label="大滿貫" value="2"></el-option>
                                <el-option label="大巨蛋" value="3"></el-option>
                            </el-select>
                        </td>
                    </tr>
                </tbody>


            </table>
        </div>
    </div>
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-5"
        style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-start;"></div>
    <div v-if="openZon" class="col-5"
        style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
        <el-switch v-model="isModify" inline-prompt class="value5" size="large"
            active-text="&nbsp;&nbsp;開啟修改&nbsp;&nbsp;" inactive-text="&nbsp;&nbsp;資料鎖定&nbsp;&nbsp;"
            style="--el-switch-on-color: #a33238; -webkit-margin-start: 18px ;" @click="openDoModify" />
    </div>
    <div v-if="openZon" class="col-1"></div>
    <!-- 確認修改用彈出視窗 -->
    <el-dialog v-model="dialogVisible" width="300" :show-close="false">
        <h5 class="msg-title">確認修改 員工編號 {{ singleEmployee.id }} ?</h5>
        <template #footer>
            <div class="dialog-footer" style="justify-content: center;">
                <el-button @click="dialogVisible = false; isModify = true">否</el-button>
                <el-button type="primary" @click="doModify" style="background-color: #a33238;border: #a33238;">
                    是
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const total = ref(0);
const current = ref(1);
const pages = ref(0);
const rows = ref(4);

const openZon = ref(false); // 初始值改為false，避免一開始就顯示單筆詳細資料

const employees = ref([]);
const singleEmployee = ref(null); // 初始值改為null，表示單個員工未定義
const teamLeaders = ref([]); // 定义空数组或根据需求初始化
// export { teamLeaders }; // 导出 teamLeaders 变量

//開啟修改用
const isModify = ref(false)

//確認修改彈出視窗用
const dialogVisible = ref(false)

const accountTypes = [
    { label: "銷售業務", value: 3 },
    { label: "主管", value: 4 }
];

const branches = [
    { label: "大吉祥", value: 1 },
    { label: "大滿貫", value: 2 },
    { label: "大巨蛋", value: 3 }
];

onMounted(() => {
    callQuery();
});

function openModal() {
    console.log("openModal");
}

// 获取所有主管ID和名称
function getAllTeamLeaders() {
    axiosapi.get("/employee/teamLeaders")
        .then(function (response) {
            console.log("teamLeaders", response.data);
            teamLeaders.value = response.data.data;
        }).catch(function (error) {
            console.log("error", error);
            Swal.fire({
                text: "获取主管列表错误：" + error.message,
                icon: "error"
            });
        });
}

// 單筆查詢
function employeeClick(employeeId) {
    console.log("employeeId=" + employeeId);
    axiosapi.get("/employee/info/" + employeeId)
        .then(function (response) {
            console.log("response", response.data);
            singleEmployee.value = response.data.data;
            singleEmployee.value.branchName = getBranchName(singleEmployee.value.branch);
            singleEmployee.value.accountTypeName = getAccountTypeName(singleEmployee.value.accountType);
            console.log("branchName=" + singleEmployee.value.branchName);
            openZon.value = true;
            isModify.value = false;
            getAllTeamLeaders();
        }).catch(function (error) {
            console.log("error", error);
            Swal.fire({
                text: "查詢錯誤" + error.message,
                icon: "error"
            });
        });
}

// 查找分店名
function getBranchName(branchValue) {
    console.log("branchValue=" + branchValue);
    const branch = branches.find(b => b.value === branchValue);
    console.log("branch=" + branch);
    return branch ? branch.label : '';
}

// 查找帳號名
function getAccountTypeName(accountTypeValue) {
    console.log("accountTypeValue=" + accountTypeValue);
    const accountType = accountTypes.find(a => a.value === accountTypeValue);
    console.log("accountType=" + accountType);
    return accountType ? accountType.label : '';
}

// // 單筆查詢後將branch轉為對應的branchName
// function setBranch() {
//     const branch = branches.find(b => b.label === singleEmployee.value.branchName);
//     if (branch) {
//         singleEmployee.value.branch = branch.value;
//     }
// }

// 多條件多筆查詢
function callQuery() {
    console.log("callQuery - 當前頁碼:", current.value);

    let request = {
        "pageNum": current.value - 1,  // 由于Spring Boot分页是从0开始，这里减1
        "pageSize": rows.value
    };

    axiosapi.post("/employee/query", request)
        .then(function (response) {
            console.log("API response:", response.data);
            employees.value = response.data.data.content;
            total.value = response.data.data.totalElements;
            pages.value = response.data.data.totalPages;
        }).catch(function (error) {
            console.log("error", error);
            Swal.fire({
                text: "查詢錯誤" + error.message,
                icon: "error"
            });
        });
}

// 開啟確認修改視窗
function openDoModify() {
    if (!isModify.value) {
        console.log("開啟修改");
        isModify.value = true;
        dialogVisible.value = true; // 确保这里设置为 true 显示对话框
    } else {
        console.log("資料鎖定中，無法開啟修改");
    }
}

//關閉詳情
function closeInfo() {
    openZon.value = false
}

//修改簽核
function doModify() {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    let request = {
        "id": singleEmployee.value.id,
        // "account": singleEmployee.value.account,
        "accountType": singleEmployee.value.accountTypeName,
        "name": singleEmployee.value.name,
        "phone": singleEmployee.value.phone,
        "email": singleEmployee.value.email,
        "sex": singleEmployee.value.sex,
        "startDate": singleEmployee.value.startDate,
        "teamLeaderId": singleEmployee.value.teamLeaderName,
        "branch": singleEmployee.value.branchName
    }

    console.log("request========>" + JSON.stringify(request))
    axiosapi.put(`/employee/modify/${singleEmployee.value.id}`, request).then(function (response) {
        console.log("response", response);
        if (response.data.success) {
            Swal.fire({
                icon: "success",
                text: response.data.message,
                showConfirmButton: false,
            }).then(function (result) {
                callQuery();
                employeeClick(singleEmployee.value.id);
                itemClick(singleEmployee.value.id);
                openZon.value = true;

            });
        } else {
            Swal.fire({
                icon: "warning",
                text: response.data.message,
            });
        }
    }).catch(function (error) {
        console.log("error", error);
        Swal.fire({
            icon: "error",
            text: "修改錯誤：" + error.message,
        });
    });
    setTimeout(function () {
        Swal.close();  //視窗關閉 
    }, 1000);
    dialogVisible.value = false;
    isModify.value = false;
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
</style>