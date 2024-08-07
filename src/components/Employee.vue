<template >

    <div class="col-12" style="height: 50px;" v-if="employeeInfo.accountType == 4"></div>
    <div class="col-1"></div>
 
    <!-- 多選下拉選單(簡易搜尋) -->
    <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;" v-if="employeeInfo.accountType == 4">
        <div class="mb-3 custom-input-wrapper"  >
            <div class="input-group">
                <span class="input-group-text custom-input-icon">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="custom-icon" />
                </span>
                <input type="text" class="form-control custom-input" v-model="name" @input="handleInput"
                    placeholder="搜尋" />
            </div>
        </div>

        <div class="mb-3 custom-select-wrapper">
            <select class="form-select custom-select" v-model="accountType" @change="handleChange"
                style="margin-left: 10px;">
                <option value="" disabled selected hidden>帳號分類</option>
                <option v-for="option in accountTypes" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>

        <div class="mb-3 custom-select-wrapper">
            <select class="form-select custom-select" v-model="branch" @change="handleChange"
                style="margin-left: 20px;">
                <option value="" disabled selected hidden>分店</option>
                <option v-for="option in branches" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>

        <!-- 清除查詢 -->
        <div class="btm-div" style="display: flex;margin-left: 20px; margin-bottom: 14px;" @click="clearSelection">
            <font-awesome-icon icon="fa-regular fa-circle-xmark" size="" style="color: #a33238; padding: 0;" />
            <el-button type='' link style="color: #a33238; font-weight: 900;">清除查詢</el-button>
        </div>
    </div>
    <!-- 標題區域 -->
    <div class="col-2" style="padding: 0px 0px;" v-if="employeeInfo.accountType == 4">
        <h3 class="table-title" id="employee">員工總覽</h3>
    </div>

    <div class="col-1"></div>
    <div class="col-1"></div>
    <div class="col-10" v-if="employeeInfo.accountType == 4">
        <!-- 彈出式複雜搜尋 -->
        <div class="extra-menu"></div>

        <!-- 員工列表 -->
        <div class="table-part" >
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
        <div class="btm-div" style="display: flex;" @click="openModal('insert')" v-if="employeeInfo.accountType == 4">
            <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;" />
            <el-button type='' link class="text-btm" style="color: #a33238;">新增員工</el-button>
        </div>
    </div>

    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">

        <!-- 右下分頁控制區 -->

        <el-pagination style="margin: 10px 0px;" hide-on-single-page=true layout="total,prev, pager, next"
            :total="total" :page-size="rows" v-model:current-page="current" @change="callQuery" v-if="employeeInfo.accountType == 4"></el-pagination>

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
                <el-select v-model="form.branch" placeholder="請選擇分店" size="small">
                    <el-option v-for="branch in branches" :key="branch.value" :label="branch.label"
                        :value="branch.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="密碼 :&nbsp;">
                <el-input v-model="form.password" placeholder="請輸入密碼" size="small" type="password" />
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



    <!-- 下方詳細資料區/ 抬頭 -->
    <div v-if="openZon" style="height: 50px;"></div>
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="closeInfo">
        <el-divider content-position="center">
            <button type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="table-title">員工編號 {{ singleEmployee.id }} --單筆詳細資料</h5>
        </el-divider>
    </div>

    <div v-if="openZon" class="col-1"></div>
    <div class="row" style="margin-top: 3%; height:550px" v-if="openZon">
        <form class="col-md-8 customer-form" style="margin-bottom:20px;" v-if="!isModify" >
            <div class="form-item" style="margin-top: 70px;" > 
                <label for="startDate">入職日&emsp;&emsp;&emsp;&emsp;：</label>
                <span class="infoText">{{ singleEmployee.startDate }}</span>
            </div>
            <div class="form-item" >
                <label for="accountTypeName">帳號類別&emsp;&emsp;&emsp;：</label>
                <span class="infoText">{{ singleEmployee.accountTypeName }}</span>
            </div>
            <div class="form-item">
                <label for="name">姓名&emsp;&emsp;&emsp;&emsp;&emsp;：</label>
                <span class="infoText" >{{ singleEmployee.name }}</span>
            </div>
            
            <div class="form-item" > 
                <label for="sex">性別&emsp;&emsp;&emsp;&emsp;&emsp;：</label>
                <span class="infoText">{{ singleEmployee.sex }}</span>
            </div>
            <div class="form-item">
                <label for="phone">電話&emsp;&emsp;&emsp;&emsp;&emsp;：</label>
                <span class="infoText">{{ singleEmployee.phone }}</span>
            </div>
            <div class="form-item">
                <label for="email">E-mail&emsp;&emsp;&emsp;&emsp;：</label>
                <span class="infoText">{{ singleEmployee.email }}</span>
            </div>
            <div class="form-item">
                <label for="teamLeaderName">直屬主管&emsp;&emsp;&emsp;：</label>
                <span class="infoText">{{ singleEmployee.teamLeaderName }}</span>
            </div>
            <div class="form-item">
                <label for="branchName">分店&emsp;&emsp;&emsp;&emsp;&emsp;：</label>
                <span class="infoText">{{ singleEmployee.branchName }}</span>
            </div>
        </form>
        <div v-if="!isModify" class="col-md-4 d-flex flex-column align-items-center">
            <img src="/personal_photo.jpg" alt="Register" class="card-image mb-3" style="height:550px; width:430px"/>
        </div>
        <form v-if="isModify" class="col-md-8 customer-form" style="height:550px">
            <div class="form-item" style="margin-top: 70px;"> 
                <label for="startDate">入職日&emsp;&emsp;&emsp;&emsp;：</label>
                <span class="infoText">{{ singleEmployee.startDate }}</span>
            </div>
            <div class="form-item">
                <label for="accountTypeName">帳號類別&emsp;&emsp;&emsp;：</label>
                <el-select v-model="singleEmployee.accountType" placeholder="請選擇職等" class="custom-el-input" size="small">
                                <el-option v-for="status in accountTypes" :key="status.value" :label="status.label"
                                    :value="status.value" />
                            </el-select>
            </div>
            <div class="form-item">
                <label for="name" >姓名&emsp;&emsp;&emsp;&emsp;&emsp;：</label>
                <el-input v-model="singleEmployee.name" placeholder="姓名" class="custom-el-input" size="small"></el-input>
            </div>
            <div class="form-item">
                <label for="sex">性別&emsp;&emsp;&emsp;&emsp;&emsp;：</label>
                <el-select v-model="singleEmployee.sex" placeholder="請選擇性別" class="custom-el-input" size="small">
                    <el-option label="M" value="M"></el-option>
                    <el-option label="F" value="F"></el-option>
                </el-select>
            </div>
            <div class="form-item">
                <label for="phone">電話&emsp;&emsp;&emsp;&emsp;&emsp;：</label>
                <el-input v-model="singleEmployee.phone" placeholder="姓名" class="custom-el-input" size="small"></el-input>
            </div>
            <div class="form-item">
                <label for="email">E-mail&emsp;&emsp;&emsp;&emsp;：</label>
                <el-input v-model="singleEmployee.email" placeholder="姓名" class="custom-el-input" size="small"></el-input>
            </div>
            <div class="form-item">
                <label for="address">直屬主管&emsp;&emsp;&emsp;：</label>
                <el-select v-model="singleEmployee.teamLeaderName" placeholder="請選擇直屬主管" class="custom-el-input" size="small">
                                <el-option v-for="leader in teamLeaders" :key="leader.id" :label="leader.name"
                                    :value="leader.id"></el-option>
                            </el-select>
            </div>
            <div class="form-item">
                <label for="address">分店&emsp;&emsp;&emsp;&emsp;&emsp;：</label>
                <el-select v-model="singleEmployee.branch" placeholder="請選擇分店" class="custom-el-input" size="small">
                                <el-option v-for="status in branches" :key="status.value" :label="status.label"
                                    :value="status.value" />
                            </el-select>
            </div>

        </form>
        <div v-if="isModify" class="col-md-4 d-flex flex-column align-items-center">
            <img src="/personal_photo.jpg" alt="Register" class="card-image mb-3" style="height:550px; width:430px"/>
        </div>
    </div>

    
    <div v-if="openZon" class="col-1"></div>
    <!-- 下方詳細資料區 / 修改按鈕-->
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-4"
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

//簡易查詢用
const name = ref('')
const accountType = ref('')
const branch = ref('')



const teamLeaders = ref([]); // 定义空数组或根据需求初始化


const total = ref(0);
const current = ref(1);
const pages = ref(0);
const rows = ref(5);

const openZon = ref(false); // 初始值改為false，避免一開始就顯示單筆詳細資料
//下方新增資料開啟用

const openCreat = ref(false)
const creatDdialogVisible = ref(false)  //新增

const employees = ref([]);


const singleEmployee = ref({
    accountType: null,
    branch: null,
    teamLeaderId: null,
    teamLeaderName: '', // 添加 teamLeaderName
});


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

callQuery();

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
                creat2KPI(response.data.data.id);
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
                    timer: 1500, 
                    showConfirmButton: false,
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                text: "新增錯誤：" + error.message,
                timer: 1500, 
                showConfirmButton: false,
            });
        });
}


// 獲取所有主管ID
function getAllTeamLeaders() {
    axiosapi.get('/employee/teamLeaders')
        .then(function (response) {
            console.log('Complete response:', response);
            console.log('teamLeaders', response.data);
            teamLeaders.value = response.data.data;
        }).catch(function (error) {
            console.log('error', error);
            Swal.fire({
                text: '获取主管列表错误：' + error.message,
                icon: 'error'
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
const handleChange = () => {
    current.value = 1;
    callQuery(false);
};
const handleInput = () => {
    current.value = 1;
    callQuery(false);
};

// 清空搜尋框
const clearSelection = () => {
    name.value = '';
    accountType.value = '';
    branch.value = '';
    callQuery();
}

// 多條件多筆查詢
function callQuery() {
    console.log('callQuery - 當前頁碼:', current.value);

    let request = {
        pageNum: current.value - 1,  // 由于Spring Boot分页是从0开始，这里减1
        pageSize: rows.value,
        name: name.value,
        accountType: accountType.value,
        branch: branch.value,

    };

    axiosapi.post('/employee/query', request)
        .then(function (response) {
            console.log('API response:', response.data);
            employees.value = response.data.data.content;
            total.value = response.data.data.totalElements;
            pages.value = response.data.data.totalPages;
        }).catch(function (error) {
            console.log('error', error);
            Swal.fire({
                text: '查詢錯誤' + error.message,
                icon: 'error'
            });
        });
}
onMounted(() => {
    getAllTeamLeaders();
});


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


//註冊時新增KPI
function creat2KPI(employeeId) {

    let request04 ={ 
    "seasonStrDay":"2024-04-01",
    "employeeId": employeeId
    }

    let request07 ={ 
    "seasonStrDay":"2024-07-01",
    "employeeId": employeeId
    }

    console.log("ceeat KPI 04",request04);
    console.log("ceeat KPI 07",request07);

    axiosapi.post("/kpi",request04).then(function (responce04) {  //新增4月KPI
        console.log("KPI responce04",responce04.data);

        axiosapi.post("/kpi",request07).then(function (responce07) {  //新增7月KPI
        console.log("KPI responce07",responce07.data);
        }).catch(function (error) {
            console.log("error",error);
            Swal.fire({
                    text: "新建KPI錯誤"+error.message,
                    icon: "error"
                });
        }) 

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "新建KPI錯誤"+error.message,
                icon: "error"
            });
    }) 
    
}

</script>


<style scoped>
.custom-el-input {
    width: 300px; 
}
.form-item {
  text-align: left;
  margin-left: 40px;
  margin-top: 20px;
  position: relative; /* 需要相对定位以定位伪元素 */

}

.form-item::after {
    content: "";
    position: absolute;
  bottom: 0; /* 固定在底部 */
  left: 0; /* 固定在左边 */
  width: 90%; /* 自定义宽度，例如 50% */
  border-bottom: #a33238 1px solid; /* 使用相同的颜色和粗细 */
}
.customer-form {
    background-color: #fff5eb;
    width: 675px;
    margin-left: 110px;
    
    color: #a33238;
    font-weight: bold;
    padding-bottom: 45px;
    padding-top: 20px;
}



.custom-input-icon {
    background: transparent;
    /* 背景透明 */
    border: none;
    /* 去掉边框 */
    padding: 0.375rem;
    /* 内边距 */
}

.custom-input-icon {
    background: transparent;
    /* 背景透明 */
    border: none;
    /* 去掉边框 */
    padding: 0.375rem;
    /* 内边距 */
}

.custom-icon {
    color: #a33238;
    /* 图标颜色与输入框一致 */
    font-size: 1rem;
    /* 图标大小 */
}

.custom-input {
    font-size: 0.875rem;
    color: #a33238;
    font-weight: bold;
    border: none;
    border-bottom: 2px solid #a33238;
    box-shadow: none;
    border-radius: 0;
    padding: 0.375rem 0.75rem;
}

.custom-input::placeholder {
    color: #a33238;
    font-weight: bold;
}

custom-select-wrapper {
    width: 120px;
    margin-right: 10px;
}

.custom-select {
    font-size: 0.875rem;
    color: #a33238;
    font-weight: bold;
    border: none;
    border-bottom: 2px solid #a33238;
    box-shadow: none;
    border-radius: 0;
}


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