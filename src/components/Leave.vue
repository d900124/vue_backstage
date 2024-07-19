<template>
    <!-- https://getbootstrap.com/docs/5.2/content/tables/#table-group-dividers 表單部分 -->
    <!-- https://element-plus.org/zh-CN/component/config-provider.html  頁碼 -->

    <div class="col-1"></div>
    <!-- 多選下拉選單(簡易搜尋) -->
    <div class="col-5" style="padding: 0px 0px;"></div>

    <!-- 抬頭 -->
    <div class="col-5" style="padding: 0px 0px;">
        <h3 class="table-title">假單簽核</h3>
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
                        <th scope="col" class="table-th">申請時間</th>
                        <th scope="col" class="table-th">申請人</th>
                        <th scope="col" class="table-th">假種</th>
                        <th scope="col" class="table-th">請假時段</th>
                        <th scope="col" class="table-th">工作代理人</th>
                        <th scope="col" class="table-th">簽核狀態</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="leave in leaves" :key="leave.id" @click="leaveInfo(leave.id)">
                        <th scope="row" class="table-td">{{ leave.createTime }}</th>
                        <td class="table-td">{{ leave.employeeName }} </td>
                        <td class="table-td">{{ leave.leaveTypeName }} </td>
                        <td class="table-td">{{ leave.startTime }}<br>{{ leave.endTime }}</td>
                        <td class="table-td">{{ leave.deputyName }}</td>
                        <!-- 使用v-if和v-else-if语句来显示簽核狀態 -->
                        <td class="table-td">
                            <template v-if="leave.permisionStatus === 1">
                                簽核中
                            </template>
                            <template v-else-if="leave.permisionStatus === 2">
                                同意
                            </template>
                            <template v-else-if="leave.permisionStatus === 3">
                                拒絕
                            </template>
                            <template v-else>
                                未知狀態
                            </template>
                        </td>
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
            <el-button type='' link class="text-btm" style="color: #a33238;">新增簽核</el-button>
        </div>
    </div>

    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
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
            <h5 class="table-title">員工編號 {{ singleLeave.employeeId }} --單筆詳細請假資料</h5>
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
                        <th scope="col" class="table-th">申請員工</th>
                        <th scope="col" class="table-th">請假時段</th>
                        <th scope="col" class="table-th">總計時數</th>
                        <th scope="col" class="table-th">請假備註</th>
                        <th scope="col" class="table-th">工作代理人</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-if="!isModify">
                        <th scope="row" class="table-td" name="id">{{ singleLeave.createTime }}</th>
                        <td class="table-td">{{ singleLeave.employeeName }}</td>
                        <td class="table-td">{{ singleLeave.startTime }}<br>{{ singleLeave.endTime }}</td>
                        <td class="table-td">{{ singleLeave.actualLeaveHours }}</td>
                        <td class="table-td">{{ singleLeave.reason }}</td>
                        <td class="table-td">{{ singleLeave.deputyName }}</td>
                    </tr>
                    <tr v-if="isModify">
                        <th scope="row" class="table-td" name="id" :value="singleLeave.id">{{ singleLeave.createTime }}</th>
                        <td class="table-td">{{ singleLeave.employeeName }}</td>
                        <td class="table-td">{{ singleLeave.startTime }}<br>{{ singleLeave.endTime }}</td>
                        <td class="table-td">{{ singleLeave.actualLeaveHours }}</td>
                        <td class="table-td">{{ singleLeave.deputyName }}</td>
                    </tr>
                </tbody>
                <div style="height: 20px;"></div>
<!-- 下方詳細資料區 / 第二欄-->
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">簽核時間</th>
                        <th scope="col" class="table-th">審核意見</th>
                        <th scope="col" class="table-th">簽核狀態</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-if="!isModify">
                        <th scope="row" class="table-td" name="id">{{ singleLeave.auditTime }}</th>
                        <td class="table-td">{{ singleLeave.permisionRemarks }}</td>
                        <td class="table-td">{{ singleLeave.permisionStatus }}</td>
                    </tr>
                    <tr v-if="isModify">
                        <th scope="row" class="table-td" name="id">{{ singleLeave.auditTime }}</th>
                        <td class="table-td">{{ singleLeave.permisionRemarks }}</td>
                        <td class="table-td">{{ singleLeave.permisionStatus }}</td>
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

    <!-- 確認修改用彈出視窗 -->
    <el-dialog v-model="dialogVisible" width="300" :show-close="false">
        <h5 class="msg-title">確認修改 簽核編號 {{ singleLeave.id }} ?</h5>
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



//確認修改彈出視窗用
const dialogVisible = ref(false)




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
        // isModify.value = false 修改要開啟

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
        "pageNum": current.value - 1,  // 由于Spring Boot分页是从0开始，这里减1
        "pageSize": rows.value
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


//開啟確認修改視窗
function openDoModify() {
    if (isModify.value == false) {
        console.log("isModify.value", isModify.value);
        console.log("修改單號 ID", singleLeave.value.id);
        console.log("修改單號 ID", approvalTypeValue.value);
        isModify.value = true;
        dialogVisible.value = true;
    }
}

//修改簽核
function doModify() {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    let request = {
        "id": singleLeave.value.id,
        "teamLeaderId": 5,
        "employeeId": 1,
        "carId": singleItem.value.carId,
        "approvalStatus": approvalTypeValue.value,
        "approvalType": 1,
        "floatingAmount": singleItem.value.floatingAmount
    }

    axiosapi.put(`/carAdjust/${singleItem.value.id}`, request).then(function (response) {
        console.log("response", response);
        if (response.data.success) {
            Swal.fire({
                icon: "success",
                text: response.data.message,
                showConfirmButton: false,
            }).then(function (result) {
                callQuery();
                itemClick(singleItem.value.id);
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

.creat-title {
    color: black;
    font-weight: 900;
    margin: 20px 20px;
}
</style>