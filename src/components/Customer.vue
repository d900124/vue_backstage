<template>
    <div class="col-1"></div>
    <!-- 多選下拉選單(簡易搜尋) -->
    <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;">
        <div class="mb-3 custom-input-wrapper">
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
                <option v-for="option in accountTypeOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div class="btm-div" style="display: flex;margin-left: 20px; margin-bottom: 14px;" @click="clearSelection">
            <font-awesome-icon icon="fa-regular fa-circle-xmark" size="" style="color: #a33238; padding: 0;" />
            <el-button type='' link style="color: #a33238; font-weight: 900;">清除查詢</el-button>
        </div>

    </div>

    <!-- 抬頭 -->
    <div class="col-2" style="padding: 0px 0px;">
        <h3 class="table-title">客戶總覽</h3>
    </div>
    <div class="col-1"></div>

    <div class="col-1"></div>
    <div class="col-10">
        <div class="extra-menu"></div>
        <!-- 列表主體 -->
        <div class="table-part">
            <table class="table">
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">姓名</th>
                        <th scope="col" class="table-th">帳號類別</th>
                        <th scope="col" class="table-th">電話</th>
                        <th scope="col" class="table-th">Email</th>
                        <th scope="col" class="table-th">備註</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="customer in customers" :key="customer.id" @click="customerInfo(customer.id)">
                        <th scope="row" class="table-td">{{ customer.name }}</th>
                        <td class="table-td">{{ customer.accountTypeName }} </td>
                        <td class="table-td">{{ customer.phone }} </td>
                        <td class="table-td">{{ customer.email }}</td>
                        <td class="table-td">{{ customer.remarks }}</td>
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
        <!-- 新增用按鈕 ，此功能不須新增-->
        <div class="btm-div" style="display: flex;" @click="openModal('insert')">
        </div>
    </div>

    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
        <!-- 分頁區塊 -->
        <el-pagination style="margin: 10px 0px;" hide-on-single-page=true layout="total,prev, pager, next"
            :total="total" :page-size="rows" v-model:current-page="current" @change="callQuery"></el-pagination>
    </div>
    <div class="col-1"></div>

    <!-- 下方詳細資料區 / 抬頭-->
    <div v-if="openZon" style="height: 50px;"></div>
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="openZon = false">
        <el-divider content-position="center">
            <button type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="table-title">會員編號 {{ singleCustomer.id }} --單筆詳細會員資料</h5>
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
                        <th scope="col" class="table-th">註冊時間</th>
                        <th scope="col" class="table-th">帳號類別</th>
                        <th scope="col" class="table-th">帳號</th>
                        <th scope="col" class="table-th">姓名</th>
                        <th scope="col" class="table-th">手機</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-if="!isModify">
                        <th scope="row" class="table-td" name="id">{{ singleCustomer.createTime }}</th>
                        <td class="table-td">{{ singleCustomer.accountTypeName }}</td>
                        <td class="table-td">{{ singleCustomer.account }}</td>
                        <td class="table-td">{{ singleCustomer.name }} </td>
                        <td class="table-td">{{ singleCustomer.phone }}</td>
                    </tr>
                    <tr v-if="isModify">
                        <th scope="row" class="table-td" name="id" :value="singleCustomer.id">
                            {{ singleCustomer.createTime }}
                        </th>
                        <td class="table-td">{{ singleCustomer.accountTypeName }}</td>
                        <td class="table-td">{{ singleCustomer.account }}</td>
                        <td class="table-td">
                            <el-input v-model="singleCustomer.name" placeholder="姓名"></el-input>
                        </td>
                        <td class="table-td">
                            <el-input v-model="singleCustomer.phone" placeholder="電話"></el-input>
                        </td>
                    </tr>
                </tbody>
                <div style="height: 20px;"></div>
                <!-- 下方詳細資料區 / 第二欄-->
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">性別</th>
                        <th scope="col" class="table-th">縣市</th>
                        <th scope="col" class="table-th">地址</th>
                        <th scope="col" class="table-th">身分證號</th>
                        <th scope="col" class="table-th">備註</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-if="!isModify">
                        <th scope="row" class="table-td" name="id">{{ singleCustomer.sex }}</th>
                        <td class="table-td">{{ singleCustomer.cityName }}</td>
                        <td class="table-td">{{ singleCustomer.address }}</td>
                        <td class="table-td">{{ singleCustomer.idNumber }}</td>
                        <td class="table-td">{{ singleCustomer.remarks }}</td>
                    </tr>
                    <tr v-if="isModify">
                        <td class="table-td">
                            <el-select v-model="singleCustomer.sex" placeholder="請選擇性別">
                                <el-option label="M" value="M"></el-option>
                                <el-option label="F" value="F"></el-option>
                            </el-select>
                        </td>
                        <td class="table-td">{{ singleCustomer.cityName }}</td>
                        <td class="table-td">
                            <el-input v-model="singleCustomer.address" placeholder="地址"></el-input>
                        </td>
                        <td class="table-td">
                            <el-input v-model="singleCustomer.idNumber" placeholder="身分證號"></el-input>
                        </td>
                        <td class="table-td">
                            <el-input v-model="singleCustomer.remarks" placeholder="備註"></el-input>
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
        <el-switch v-if="employeeInfo !== null && employeeInfo.accountType == 4" v-model="isModify" inline-prompt
            class="value5" size="large" active-text="&nbsp;&nbsp;開啟修改&nbsp;&nbsp;"
            inactive-text="&nbsp;&nbsp;資料鎖定&nbsp;&nbsp;"
            style="--el-switch-on-color: #a33238; -webkit-margin-start: 18px ;" @click="openDoModify" />
    </div>
    <div v-if="openZon" class="col-1"></div>

    <!-- 確認修改用彈出視窗 -->
    <el-dialog v-model="dialogVisible" width="300" :show-close="false">
        <h5 class="msg-title">確認修改 客戶編號 {{ singleCustomer.id }} ?</h5>
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


//用於重新導向 router.push
const router = useRouter()

//分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(4) //分頁資料顯示筆數

//下方詳細資料開啟用
const openZon = ref(false)

//產品顯示customer元件用的參數
const customers = ref([]);
const singleCustomer = ref([])

// 是否可以修改
const isModify = ref(false);

//確認修改彈出視窗用
const dialogVisible = ref(false)

//簡易查詢用屬性
const accountType = ref('')
const name = ref('')

const accountTypeOptions = [
    { value: 1, label: '一般會員' },
    { value: 2, label: '賣家' },
]

onMounted(function () {
    callQuery();
})


//單筆查詢
function customerInfo(customerId) {
    console.log(customerId)
    axiosapi.get("/customer/info/" + customerId).then(function (responce) {  //(AJAX前端程式)單筆查詢的Post功能()
        console.log("responce", responce.data);
        singleCustomer.value = responce.data.data;
        // console.log("singleCustomer.value.id", singleCustomer.Customer.id);
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
    accountType.value = ''
    name.value = '';
    callQuery();
}
const callQuery = () => {
    console.log("callQuery - 當前頁碼:", current.value);
    let request = {
        "pageNum": current.value - 1, // 由于Spring Boot分页是从0开始，这里减1
        "pageSize": rows.value,
        "accountType": accountType.value,
        "name": name.value
    };

    axiosapi.post("/customer/query", request).then((response) => {
        customers.value = response.data.data.content; // 获取查询到的数据列表
        // 更新分頁資訊
        total.value = response.data.data.totalElements; // 总条目数
        pages.value = response.data.data.totalPages; // 總頁數

        console.log("customers", response.data.data.content);
        console.log("total", response.data.data.totalElements);
        console.log("pages", response.data.data.totalPages);
    }).catch((error) => {
        console.log("error", error);
        Swal.fire({
            text: "查詢錯誤：" + error.message,
            icon: "error"
        });
    });
};

// 初始加载时调用查询
callQuery();


//開啟確認修改視窗
function openDoModify() {
    if (isModify.value == false) {
        console.log("isModify.value", isModify.value);
        console.log("修改單號 ID", singleCustomer.value.id);
        isModify.value = true;
        dialogVisible.value = true;
    }
}

//修改客戶資料
function doModify() {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    let request = {
        "name": singleCustomer.value.name,
        "phone": singleCustomer.value.phone,
        "sex": singleCustomer.value.sex,
        "address": singleCustomer.value.address,
        "idNumber": singleCustomer.value.idNumber,
        "remarks": singleCustomer.value.remarks
    };

    axiosapi.put(`/customer/modify/${singleCustomer.value.id}`, request).then(function (response) {
        console.log("response", response);
        if (response.data.success) {
            Swal.fire({
                icon: "success",
                text: response.data.message,
                showConfirmButton: false,
            }).then(function (result) {
                callQuery();

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
    /* 字体大小 */
    color: #a33238;
    /* 字体颜色 */
    font-weight: bold;
    /* 字体加粗 */
    border: none;
    /* 去掉默认边框 */
    border-bottom: 2px solid #a33238;
    /* 底部边框颜色和厚度 */
    box-shadow: none;
    /* 去掉阴影 */
    border-radius: 0;
    /* 直角边缘 */
    padding: 0.375rem 0.75rem;
    /* 内边距 */
}

.custom-input::placeholder {
    color: #a33238;
    /* 占位符颜色 */
    font-weight: bold;
    /* 占位符字体加粗 */
}

.custom-select option[disabled] {
    color: #6c757d;
    /* 设置占位符颜色 */
}

custom-select-wrapper {
    width: 120px;
    /* 调整宽度 */
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

.creat-title {
    color: black;
    font-weight: 900;
    margin: 20px 20px;
}
</style>