<template>
    <div class="col-12" style="height: 50px;"></div>
    <div class="col-1"></div>

    <!-- 簡易搜尋欄位 -->
    <div class="col-5" style="padding: 0px 0px;"></div>

    <!-- 標題區域 -->
    <div class="col-5" style="padding: 0px 0px;">
        <h3 class="table-title" id="employee">員工總覽</h3>
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

        <!-- 新增用按鈕 -->
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

    <!-- 新增區塊 / 抬頭-->
    <div v-if="openCreat" style="height: 50px;"></div>
    <div v-if="openCreat" class="col-1"></div>
    <div v-if="openCreat" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="openCreat = false">
        <el-divider content-position="center">
            <button type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="table-title">新增員工</h5>
        </el-divider>
    </div>
    <div v-if="openCreat" class="col-1"></div>

    <!-- 新增區塊 / 資料區-->
    <div v-if="openCreat" class="col-1"></div>
    <div v-if="openCreat" class="col-5" style="height: 300px; background-color:rgb(245, 250, 250)  ;">

        <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
            <el-divider border-style="dashed" style="margin: 0;" />
            <el-form-item label="職位 :&nbsp;">
                <el-select v-model="form.accountType" placeholder="職位" size="small">
                    <el-option v-for="status in accountTypes" :key="status.value" :label="status.label"
                        :value="status.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="員工姓名 :&nbsp;">
                <el-input v-model="form.name" placeholder="請輸入員工姓名" size="small" />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />
            <el-form-item label="入職日 :&nbsp;">
                <el-date-picker v-model="form.startDate" type="date" placeholder="選擇入職日" size="small" clearable />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />
            <el-form-item label="直屬主管 :&nbsp;">
                <el-select v-model="form.teamLeaderId" placeholder="請選擇直屬主管" size="small">
                    <el-option v-for="leader in teamLeaders" :key="leader.id" :label="leader.name" :value="leader.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="帳號 :&nbsp;">
                <el-input v-model="form.account" placeholder="請輸入帳號" size="small" />
            </el-form-item>

        </el-form>
    </div>

    <div v-if="openCreat" class="col-5" style="height: 300px; background-color:rgb(245, 250, 250)  ;">

        <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
            <el-form-item label="性別 :&nbsp;">
                <el-select v-model="form.sex" placeholder="請選擇性別" size="small">
                    <el-option label="M" value="M"></el-option>
                    <el-option label="F" value="F"></el-option>
                </el-select>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />
            <el-form-item label="電話 :&nbsp;">
                <el-input v-model="form.phone" placeholder="請輸入電話" size="small" />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="Email :&nbsp;">
                <el-input v-model="form.email" placeholder="請輸入Email" size="small" />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />
            <el-form-item label="分店 :&nbsp;">
                <el-select v-model="form.branch" placeholder="請選擇分店">
                    <el-option v-for="branch in branches" :key="branch.value" :label="branch.label"
                        :value="branch.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="密碼 :&nbsp;">
                <el-input v-model="form.password" placeholder="請輸入密碼" size="small" />
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
        <el-button color="#a33238" :dark="isDark" style="margin: 20 0;"
            @click="creatDdialogVisible = true">&nbsp;確認新增&nbsp;</el-button>
    </div>
    <div v-if="openCreat" class="col-1"></div>



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
                        <td class="table-td">{{ singleEmployee.accountTypeName }}</td>
                        <td class="table-td">{{ singleEmployee.name }}</td>
                        <td class="table-td">{{ singleEmployee.startDate }}</td>
                        <td class="table-td">{{ singleEmployee.teamLeaderName }}</td>
                    </tr>
                    <tr v-if="isModify">
                        <td class="table-td">
                            <el-select v-model="singleEmployee.accountType" placeholder="請選擇職等">
                                <el-option v-for="status in accountTypes" :key="status.value" :label="status.label"
                                    :value="status.value" />
                            </el-select>
                        </td>
                        <td class="table-td">
                            <el-input v-model="singleEmployee.name" placeholder="姓名"></el-input>
                        </td>
                        <td class="table-td">
                            <el-date-picker v-model="singleEmployee.startDate" type="date" placeholder="入職日"
                                style="width: 100%;"></el-date-picker>
                        </td>
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
                            <el-select v-model="singleEmployee.branch" placeholder="請選擇分店">
                                <el-option v-for="status in branches" :key="status.value" :label="status.label"
                                    :value="status.value" />
                            </el-select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-if="openZon" class="col-1"></div>
    <!-- 下方詳細資料區 / 修改按鈕-->
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
    <!-- 確認新增用彈出視窗 -->
    <el-dialog v-model="creatDdialogVisible" width="350" :show-close="false">
        <h5 class="msg-title">確認新增 ?</h5>
        <template #footer>
            <div class="dialog-footer" style="display: flex;justify-content: center;">
                <div>
                    <el-button @click="creatDdialogVisible = false">否</el-button>
                    <el-button type="primary" @click="doCreat" style="background-color: #a33238;border: #a33238;">
                        是
                    </el-button>
                </div>
            </div>
        </template>
    </el-dialog>

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
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

// 串接登入員工
let employeeInfo = ref({});
const store = useStore();

onMounted(() => {
    const username = localStorage.getItem('username');
    if (username) {
        store.dispatch('fetchEmployeeInfo', username);
    }
});
employeeInfo = computed(() => store.state.employeeInfo.data || {});
console.log('===>test Employee info:', employeeInfo);


const router = useRouter();

const total = ref(0);
const current = ref(1);
const pages = ref(0);
const rows = ref(4);

const openZon = ref(false); // 初始值改為false，避免一開始就顯示單筆詳細資料
//下方新增資料開啟用

const openCreat = ref(false)
const creatDdialogVisible = ref(false)  //新增

const employees = ref([]);

const teamLeaders = ref([]); // 定义空数组或根据需求初始化
const singleEmployee = ref({
    accountType: null,
    branch: null,
    teamLeaderId: null,
    teamLeaderName: '', // 添加 teamLeaderName
});

// export { teamLeaders }; // 导出 teamLeaders 变量

// 是否可以修改
const isModify = ref(false);

//確認修改彈出視窗用
const dialogVisible = ref(false)


const accountTypes = ref([
    { label: '銷售業務', value: 3 },
    { label: '主管', value: 4 },
]);

const branches = ref([
    { label: "大吉祥", value: 1 },
    { label: "大滿貫", value: 2 },
    { label: "大巨蛋", value: 3 }
]);

const form = ref({
    accountType: '',
    name: '',
    startDate: '',
    teamLeaderId: '',
    sex: '',
    phone: '',
    email: '',
    branch: '',
    account: '',
    password: '',
});

onMounted(function () {
    callQuery();
})

//單筆新增
function openModal() {
    console.log("openModal");
    openCreat.value = true;
}

//新增員工
function doCreat() {
    creatDdialogVisible.value = false;
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    axiosapi.post("/employee/add", form.value)
        .then(response => {
            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    text: response.data.msg,
                    showConfirmButton: false,
                    timer: 1500 // 设置计时器，1.5秒后自动关闭
                }).then(() => {
                    window.location.reload(); // 刷新页面
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.msg,
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                text: "新增錯誤：" + error.message,
            });
        });
}



// 獲取所有主管ID
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

//單筆查詢
function employeeClick(employeeId) {
    console.log("employeeId=" + employeeId);
    axiosapi.get("/employee/info/" + employeeId)
        .then(function (response) {
            console.log("response", response.data);
            const employeeData = response.data.data;
            singleEmployee.value = {
                ...employeeData,
                teamLeaderName: employeeData.teamLeaderName, // 設置名稱
            };
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

//開啟確認修改視窗
function openDoModify() {
    if (isModify.value == false) {
        console.log("isModify.value", isModify.value);
        console.log("修改員工 ID", singleEmployee.value.id);
        isModify.value = true;
        dialogVisible.value = true;
    }
}

//關閉詳情
function closeInfo() {
    openZon.value = false
}

//修改
function doModify() {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    let request = {
        "accountType": singleEmployee.value.accountType,
        "name": singleEmployee.value.name,
        "startDate": singleEmployee.value.startDate,
        "teamLeaderName": singleEmployee.value.teamLeaderName,
        "sex": singleEmployee.value.sex,
        "phone": singleEmployee.value.phone,
        "email": singleEmployee.value.email,
        "branch": singleEmployee.value.branch
    };

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