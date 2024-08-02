<template>
    <div class="col-12" style="height: 50px;"></div>

    <div class="col-1"></div>
    <!-- 多選下拉選單(簡易搜尋) -->
    <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;">
        <el-select
                    v-model="employeeId"
                    clearable
                    placeholder="申請人"
                    size="small"
                    style="width: 130px;margin-right: 20px;"
                    @change="handleChange"
                    @click="leaveFindAllEmployee();"
                    >
                    <el-option
                        v-for="Option in employeeIdOptions"
                        :key="Option.value"
                        :label="Option.label"
                        :value="Option.value"
                    />
                </el-select>
        <el-select
                    v-model="leaveType"
                    clearable
                    placeholder="假別"
                    size="small"
                    style="width: 130px;margin-right: 20px;"
                    @change="handleChange"
                    >
                    <el-option
                        v-for="Option in leaveTypeOptions"
                        :key="Option.value"
                        :label="Option.label"
                        :value="Option.value"
                    />
                </el-select>

                <el-select
                    v-model="permisionStatus"
                    clearable
                    placeholder="簽核狀態"
                    size="small"
                    style="width: 130px;margin-right: 20px;"
                    @change="handleChange"
                    >
                    <el-option
                        v-for="Option in permisionStatusOptions"
                        :key="Option.value"
                        :label="Option.label"
                        :value="Option.value"
                    />
                </el-select>

<!-- 清除查詢 -->
                <div class="btm-div" style="display: flex;margin-right: 20px;" @click="clearSelection">
                    <font-awesome-icon icon="fa-regular fa-circle-xmark" size="" style="color: #a33238; padding: 0;"/>
                    <el-button type='' link  style="color: #a33238; font-weight: 900;">清除查詢</el-button>
                </div>
        </div>
        
    <!-- 抬頭 -->
    <div class="col-2" style="padding: 0px 0px;">
        <h3 class="table-title" id="leave">假單簽核</h3>
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
                        <td class="table-td">{{ getPermisionStatusText(leave.permisionStatus) }}</td>
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


    <!-- 下方詳細資料區 / 抬頭-->
    <div v-if="openZon" style="height: 50px;"></div>
    <div v-if="openZon" class="col-1"></div>
    <div v-if="openZon" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="openZon = false">
        <el-divider content-position="center">
            <button type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="table-title" id="leaveAgenda">員工編號 {{ singleLeave.employeeId }} --單筆詳細請假資料</h5>
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
                    <tr v-if="!isModify">
                        <th scope="row" class="table-td" name="id">{{ singleLeave.createTime }}</th>
                        <td class="table-td">{{ singleLeave.employeeName }}</td>
                        <td class="table-td">{{ singleLeave.leaveTypeName }} </td>
                        <td class="table-td">{{ singleLeave.startTime }}<br>{{ singleLeave.endTime }}</td>
                        <td class="table-td">{{ singleLeave.actualLeaveHours }}</td>


                    </tr>
                    <tr v-if="isModify">
                        <th scope="row" class="table-td" name="id" :value="singleLeave.id">{{ singleLeave.createTime
                            }}
                        </th>
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
                    <tr v-if="!isModify">
                        <th scope="row" class="table-td" name="id">{{ singleLeave.reason }}</th>
                        <td class="table-td">{{ singleLeave.deputyName }}</td>
                        <td class="table-td">{{ singleLeave.auditTime }}</td>
                        <td class="table-td">{{ singleLeave.permisionRemarks }}</td>
                        <td class="table-td">{{ getPermisionStatusText(singleLeave.permisionStatus) }}</td>
                    </tr>
                    <tr v-if="isModify">
                        <th scope="row" class="table-td" name="id">{{ singleLeave.reason }}</th>
                        <td class="table-td">{{ singleLeave.deputyName }}</td>
                        <td class="table-td">{{ singleLeave.auditTime }}</td>
                        <td class="table-td"> <el-input v-model="singleLeave.permisionRemarks"
                                placeholder="核可備註"></el-input></td>
                        <td class="table-td">
                            <el-select v-model="singleLeave.permisionStatus" placeholder="請選擇核可狀態">
                                <el-option v-for="status in permissionStatuses" :key="status.value"
                                    :label="status.label" :value="status.value" />
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

    <!-- 確認修改用彈出視窗 -->
    <el-dialog v-model="dialogVisible" width="300" :show-close="false">
        <h5 class="msg-title">確認修改 假單編號 {{ singleLeave.id }} ?</h5>
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
import { onMounted, ref , watch, computed} from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

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

// 监控 employeeInfo 的变化，并在其加载完成后执行 callQuery
watch(employeeInfo, (newValue) => {
    if (newValue) {
        callQuery();
    }
});

//用於重新導向 router.push
const router = useRouter()

//分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(5) //分頁資料顯示筆數

//下方詳細資料開啟用
const openZon = ref(false)

//下方新增資料開啟用
const openCreat = ref(false)

//產品顯示leave元件用的參數
const leaves = ref([]);
const singleLeave = ref([])

// 是否可以修改
const isModify = ref(false);

//確認修改彈出視窗用
const dialogVisible = ref(false)

//簡易查詢用
const permisionStatus = ref('');
const leaveType = ref('');
const employeeId = ref('');

//查找所有員工
const employeeIdOptions=ref([])


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
const leaveTypeOptions = [
  { value: 1, label: "特休" },
  { value: 5, label: "事假" },
  { value: 6, label: "半薪病假" },
  { value: 7, label: "婚假" },
  { value: 8, label: "生理假" },
  { value: 9, label: "公假" },
  { value: 10, label: "喪假" }
];


const permisionStatusOptions = [
    { value: 1, label: '簽核中' },
    { value: 2, label: '同意' },
    { value: 3, label: '拒絕' },
]


// 定義審核狀態選項
const permissionStatuses = ref([
    { value: 1, label: '簽核中' },
    { value: 2, label: '同意' },
    { value: 3, label: '拒絕' }
]);

// 在组件挂载时或 employeeInfo 变化时调用 findAllEmployee
onMounted(() => {
    if (employeeInfo.value) {
        leaveFindAllEmployee();
    }
});

watch(employeeInfo, (newValue) => {
    if (newValue) {
        leaveFindAllEmployee();
    }
});

function leaveFindAllEmployee() {
    let empcount = 0;
    axiosapi.get("employee/count").then(function (response){
        empcount=response.data.data;
        console.log("empcount",empcount);
    })

    axiosapi.get("employee/all").then(function (response) {  //(AJAX前端程式)單筆查詢的Post功能()
        console.log("employee/all response",response.data);
        employeeIdOptions.value=[];
        for(let i = 0;i<empcount;i++){
            employeeIdOptions.value.push({
                        value:response.data.data[i].id,
                        label: response.data.data[i].name})
        }
    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "員工查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}

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
    axiosapi.get("/leave/info/" + leaveId).then(function (response) {  //(AJAX前端程式)單筆查詢的Post功能()
        console.log("response", response.data);
        singleLeave.value = response.data.data;
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

const handleChange = () => {
    current.value = 1;
    callQuery(false);
};

// 清空搜尋框
const clearSelection = () => {
    permisionStatus.value = ''
    leaveType.value = ''
    employeeId.value = ''
    callQuery();
}

// 多筆查詢
function callQuery() {
    console.log("callQuery - 當前頁碼:", current.value);

    let request = {
        "leaveStatus": 0, // 0為請假
        "pageNum": current.value - 1,  // 由于Spring Boot分页是从0开始，这里减1
        "pageSize": rows.value,
        "leaveType": leaveType.value,
        "permisionStatus": permisionStatus.value,
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


//開啟確認修改視窗
function openDoModify() {
    if (isModify.value == false) {
        console.log("isModify.value", isModify.value);
        console.log("修改單號 ID", singleLeave.value.id);
        isModify.value = true;
        dialogVisible.value = true;
    }
}

async function doModify() {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    let request = {
        "id": singleLeave.value.id,
        "leaveStatus": singleLeave.value.leaveStatus,
        "startTime": singleLeave.value.startTime,
        "endTime": singleLeave.value.endTime,
        "leaveType": singleLeave.value.leaveType,
        "leaveTypeName": singleLeave.value.leaveTypeName,
        "employeeId": singleLeave.value.employeeId,
        "employeeName": singleLeave.value.employeeName,
        "deputyId": singleLeave.value.deputyId,
        "deputyName": singleLeave.value.deputyName,
        "teamLeaderId": singleLeave.value.teamLeaderId,
        "permisionRemarks": singleLeave.value.permisionRemarks,
        "permisionStatus": singleLeave.value.permisionStatus,
        "auditTime": singleLeave.value.auditTime,
        "reason": singleLeave.value.reason,
        "actualLeaveHours": singleLeave.value.actualLeaveHours,
        "specialLeaveHours": singleLeave.value.specialLeaveHours,
        "createTime": singleLeave.value.createTime,
        "updateTime": singleLeave.value.updateTime,
        "validityPeriodStart": singleLeave.value.validityPeriodStart,
        "validityPeriodEnd": singleLeave.value.validityPeriodEnd
    };

    const startTimeStr = singleLeave.value.startTime;
    const endTimeStr = singleLeave.value.endTime;
    const permisionStatus = singleLeave.value.permisionStatus; // 1為簽核中 2為同意假單 3為拒絕假單

    if (startTimeStr && endTimeStr) {
        const startDate = new Date(`${startTimeStr}:00`);
        const endDate = new Date(`${endTimeStr}:00`);

        startDate.setSeconds(startDate.getSeconds() + 1);
        endDate.setSeconds(endDate.getSeconds() - 1);

        // 加8小时
        startDate.setHours(startDate.getHours() + 8);
        endDate.setHours(endDate.getHours() + 8);

        const adjustedStartTime = startDate.toISOString().slice(0, 19).replace('T', ' ');
        const adjustedEndTime = endDate.toISOString().slice(0, 19).replace('T', ' ');

        let newAgendaRequest = {
            "employeeId": singleLeave.value.employeeId,
            "businessPurpose": `員工:${singleLeave.value.employeeName} , 假別:${singleLeave.value.leaveTypeName} ,
            單號:${singleLeave.value.id}`,
            "unavailableTimeStr": adjustedStartTime,
            "unavailableTimeEnd": adjustedEndTime,
            "unavailableStatus": 1
        };

        try {
            if (permisionStatus == 2) {
                // 只有在权限状态是“同意”时才创建排程
                const agendaResponse = await axiosapi.post("/agenda", newAgendaRequest);

                if (!agendaResponse.data.success) {
                    throw new Error(agendaResponse.data.msg);
                }

                // 如果排程创建成功，再执行请假修改
                const modifyResponse = await axiosapi.put(`/leave/modify/${singleLeave.value.id}`, request);

                if (modifyResponse.data.success) {
                    Swal.fire({
                        icon: "success",
                        text: '審核與員工排程建立成功',
                        showConfirmButton: true
                    });
                } else {
                    throw new Error(modifyResponse.data.message);
                }
            } else if (permisionStatus == 3) {
                // 如果权限状态是“拒绝”，只执行请假修改请求
                const modifyResponse = await axiosapi.put(`/leave/modify/${singleLeave.value.id}`, request);

                if (modifyResponse.data.success) {
                    Swal.fire({
                        icon: "success",
                        text: '修改審核成功',
                        showConfirmButton: true
                    });
                } else {
                    throw new Error(modifyResponse.data.message);
                }
            }
            await callQuery();
            await leaveInfo(singleLeave.value.id);
            openZon.value = true;
        } catch (error) {
            console.log("error", error);
            Swal.fire({
                icon: "error",
                text: "操作錯誤：" + error.message,
                showConfirmButton: true
            });
        }
    } else {
        console.error('startTime or endTime is undefined or null');
        Swal.fire({
            icon: "error",
            text: "時段錯誤",
            showConfirmButton: true
        });
    }
    await leaveInfo(singleLeave.value.id);
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