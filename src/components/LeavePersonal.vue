<template>
    <div class="col-12" style="height: 50px;"> </div>
    <div class="col-1">&nbsp;</div>
    <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;"></div>
    <!-- 抬頭 -->
    
    <div class="col-2" style="padding: 0px 0px;display: flex; justify-content: flex-end;align-items:flex-end;">
        <h3 class="table-title" id="leavePersonal">請假申請</h3>
    </div>
    <div class="col-1">&nbsp;</div>

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
                        <!-- 彈窗 -->
                    <button type="button" class="btn btn-custom" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="callQueryTwo">
                        可用剩餘假別時數
                    </button></tr>
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
                    <tr v-if="employeeInfo.annualLeaveHours !== null">
                        <th scope="row" class="table-td">特休</th>
                        <td class="table-td">{{ employeeInfo.annualLeaveHours }} 小時</td>
                    </tr>
                    <tr v-if="employeeInfo.menstrualLeaveHours !== null">
                        <th scope="row" class="table-td">生理假</th>
                        <td class="table-td">{{ employeeInfo.menstrualLeaveHours }} 小時</td>
                    </tr>
                    <tr v-if="employeeInfo.officialLeaveHours !== null">
                        <th scope="row" class="table-td">公假</th>
                        <td class="table-td">{{ employeeInfo.officialLeaveHours }} 小時</td>
                    </tr>
                    <tr v-if="employeeInfo.marriageLeaveHours !== null">
                        <th scope="row" class="table-td">婚假</th>
                        <td class="table-td">{{ employeeInfo.marriageLeaveHours }} 小時</td>
                    </tr>
                    <tr v-if="employeeInfo.bereavementLeaveHours !== null">
                        <th scope="row" class="table-td">喪假</th>
                        <td class="table-td">{{ employeeInfo.bereavementLeaveHours }} 小時</td>
                    </tr>
                </tbody>
            </table>
        </div>

<!-- 彈出視窗 -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="employeeInfo">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title " id="exampleModalLabel" style="color:#a33238; font-weight: bold; margin-left:325px;">可用假別時數</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table class="table" style="margin-left:0px;">
          <thead>
            <tr>
              <th style="color: #a33238;">假別</th>
              <th style="color: #a33238;">使用期限</th>
              <th style="color: #a33238;">可用時數</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leaveTwo in leavesTwo" :key="leaveTwo.id" >
              <th scope="row" class="table-td">{{ leaveTwo.leaveTypeName }}</th>
              <td class="table-td">{{ leaveTwo.validityPeriodStart }}  -  {{ leaveTwo.validityPeriodEnd }}</td>
              <td class="table-td">{{ getRemainingHours(leaveTwo.leaveTypeName) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

        <div class="col-5"
            style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
            <!-- 新增用按鈕 -->
            <div class="btm-div" style="display: flex;" @click="openModal('insert')">
                <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;" />
                <el-button type='' link class="text-btm" style="color: #a33238;margin: 12px 0 0 0;">新增假單</el-button>
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
            <tbody class="table-group-divider" v-if="employeeInfo">
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
    <div v-if="openCreate" style="height: 50px;"></div>
    <div v-if="openCreate" class="col-1"></div>
    <div v-if="openCreate" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="openCreate = false">
        <el-divider content-position="center">
            <button type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="table-title">新增假單</h5>
        </el-divider>
    </div>
    <div v-if="openCreate" class="col-1"></div>

    <!-- 新增區塊 / 資料區-->
    <div v-if="openCreate" class="col-1"></div>
    <div v-if="openCreate" class="col-5" style="height: 250px; background-color:rgb(245, 250, 250)  ;">

        <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
            <el-form-item label="申請員工 :&nbsp;">
                <p style="margin: 0;">{{ employeeInfo.name }}</p>
            </el-form-item>

            <el-divider border-style="dashed" style="margin: 0;" />
            <el-form-item label="假別 :&nbsp;">
                <el-select v-model="form.leaveType" placeholder="Select" size="small">
                    <el-option v-for="option in leaveTypeOptions" :key="option.value" :label="option.label"
                        :value="option.value" />
                </el-select>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="開始時間 :&nbsp;">
                <input id="start-date" type="datetime-local" class="form-control" v-model="form.startTime" style="height:25px" />
            </el-form-item>

            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="結束時間 :&nbsp;">
                <input id="end-date" type="datetime-local" class="form-control" v-model="form.endTime" style="height:25px"/>
            </el-form-item>

        </el-form>
    </div>

    <div v-if="openCreate" class="col-5" style="height: 250px; background-color:rgb(245, 250, 250)  ;">

        <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
            <el-form-item label="&nbsp;">
                <p style="margin: 0;">&nbsp;</p>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />

            <el-form-item label="請假時數 :&nbsp;">
                <el-input v-model="form.actualLeaveHours" type="text" size="small" rows="2" readonly />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;" />
            <el-form-item label="工作代理人 :&nbsp;">
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
            <el-form-item label="備註 :&nbsp;">
                <el-input v-model="form.reason" type="textarea" placeholder="請輸入備註" size="small" rows="2" />
            </el-form-item>

        </el-form>
    </div>
    <div v-if="openCreate" class="col-1"></div>

    <!-- 新增區塊 / 確認按鈕-->
    <div v-if="openCreate" class="col-1"></div>
    <div v-if="openCreate" class="col-5"
        style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-start;"></div>
    <div v-if="openCreate" class="col-5"
        style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
        <el-button color="#a33238" :dark="isDark" style="margin: 20 0;"
            @click="creatDdialogVisible = true">&nbsp;確認新增&nbsp;</el-button>
    </div>
    <div v-if="openCreate" class="col-1"></div>


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



// 监控 employeeInfo 的变化，并在其加载完成后执行 callQuery
watch(employeeInfo, (newValue) => {
    if (newValue) {
        callQuery();
        callQueryTwo();
    }
});

// 在组件挂载时执行 callQuery（如果 employeeInfo 已经有值）
onMounted(() => {
    if (employeeInfo.value) {
        callQuery();
        callQueryTwo();
        
    }
});

// 假定从某处获取 employeeInfo 的数据，这里用 setTimeout 模拟异步获取数据
setTimeout(() => {
    employeeInfo.value = {
        id: employeeInfo.id, // 示例数据，请根据实际情况调整
        accountType: employeeInfo.accountType
    };
}, 1000);


//用於重新導向 router.push
const router = useRouter()

//分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(4) //分頁資料顯示筆數

//查詢全部員工
const allEmployees=ref([]);
const findEmployeeId = ref('');


const leaveTypeOptions = [
  { value: 1, label: "特休" },
  { value: 5, label: "事假" },
  { value: 6, label: "半薪病假" },
  { value: 7, label: "婚假" },
  { value: 8, label: "生理假" },
  { value: 9, label: "公假" },
  { value: 10, label: "喪假" }
];



// 根据假别名称获取剩余时数
const getRemainingHours = (leaveTypeName) => {
  switch (leaveTypeName) {
    case "特休":
      return employeeInfo.value.annualLeaveHours;
    case "事假":
      return employeeInfo.value.personalLeaveHours;
    case "半薪病假":
      return employeeInfo.value.sickLeaveHours;
    case "婚假":
      return employeeInfo.value.marriageLeaveHours;
    case "生理假":
      return employeeInfo.value.menstrualLeaveHours;
    case "公假":
      return employeeInfo.value.officialLeaveHours;
    case "喪假":
      return employeeInfo.value.bereavementLeaveHours;
    default:
      return 0;
  }
};

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




const form = ref({
    permisionStatus: 1,
    leaveStatus: 0,
    leaveType: '',
    startTime: '',
    endTime: '',
    actualLeaveHours: 0,
    deputyId: '3',
    reason: '',
});

// 计算请假时数
let leaveHours = computed(() => {
    console.log("開始時間" + form.value.startTime)
    console.log("開始時間type" + typeof form.value.startTime)
    if (form.value.startTime && form.value.endTime) {
        console.log("開始時間" + form.value.startTime)
        const start = new Date(form.value.startTime);
        const end = new Date(form.value.endTime);
        const diff = (end - start) / (1000 * 60 * 60); // difference in hours
        return diff > 0 ? Math.ceil(diff) : 0;
    }
    return 0;
});

watch(leaveHours, (newValue) => {
    form.value.actualLeaveHours = newValue;
    console.log("actualLeaveHours type" + typeof form.value.actualLeaveHours)

}, { immediate: true });
onMounted(() => {
    const username = localStorage.getItem('username');
    if (username) {
        store.dispatch('fetchEmployeeInfo', username);
    }
});




//下方詳細資料開啟用
const openZon = ref(false)

//下方新增資料開啟用
const openCreate = ref(false)

//產品顯示leave元件用的參數
const leaves = ref([]);
const singleLeave = ref([]);
const leavesTwo = ref([]);


const creatDdialogVisible = ref(false)  //新增


onMounted(function () {
    callQuery();
    callQueryTwo();
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

//單筆新增
function openModal() {
    console.log("openModal");
    openCreate.value = true;
}

function doCreate() {
    // 获取实际请假小时数（假设从表单中获取）
    let actualLeaveHours = Number(form.value.actualLeaveHours); // 确保转换为数字

    // 验证实际请假小时数是否合理
    if (actualLeaveHours <= 0) {
        Swal.fire({
            icon: "error",
            text: "請假時數必須大於0",
            showConfirmButton: true
        });
        return; 
    }

    // 创建一个新的请求对象，包含修改后的表单数据
    let request = {
        ...form.value,
        employeeId: employeeInfo.value.id,
        teamLeaderId: employeeInfo.value.teamLeaderId
    };

    // 从 employeeInfo 中获取假别小时数并转换为数字
    let personalLeaveHours = Number(employeeInfo.value.personalLeaveHours);
    let sickLeaveHours = Number(employeeInfo.value.sickLeaveHours);
    let annualLeaveHours = Number(employeeInfo.value.annualLeaveHours);
    let menstrualLeaveHours = Number(employeeInfo.value.menstrualLeaveHours);
    let officialLeaveHours = Number(employeeInfo.value.officialLeaveHours);
    let marriageLeaveHours = Number(employeeInfo.value.marriageLeaveHours);

    let leaveType = String(form.value.leaveType); // 将 leaveType 转换为字符串
    let insufficientLeave = false; // 在使用前定义和初始化
    let errorMessage = ""; // 定义并初始化 errorMessage 变量

    // 打印调试信息
    console.log("实际请假小时数:", actualLeaveHours);
    console.log("员工假别数据:", {
        personalLeaveHours,
        sickLeaveHours,
        annualLeaveHours,
        menstrualLeaveHours,
        officialLeaveHours,
        marriageLeaveHours,
    });
    console.log("選取的假別", leaveType);
    creatDdialogVisible.value = false;
    // 验证假别小时数
    switch (leaveType) {
        case '1': // 年假
            if (actualLeaveHours > annualLeaveHours) {
                insufficientLeave = true;
                errorMessage = "年假剩餘時數不足。";
            }
            break;
        case '5': // 事假
            if (actualLeaveHours > personalLeaveHours) {
                insufficientLeave = true;
                errorMessage = "可用事假剩餘時數不足。";
            }
            break;
        case '6': // 病假
            if (actualLeaveHours > sickLeaveHours) {
                insufficientLeave = true;
                errorMessage = "可用病假剩餘時數不足。";
            }
            break;
        case '7': // 婚假
            if (actualLeaveHours > marriageLeaveHours) {
                insufficientLeave = true;
                errorMessage = "可用婚假剩餘時數不足。";
            }
            break;
        case '8': // 生理假
            if (actualLeaveHours > menstrualLeaveHours) {
                insufficientLeave = true;
                errorMessage = "可用生理假剩餘時數不足。";
            }
            break;
        case '9': // 公假
            if (actualLeaveHours > officialLeaveHours) {
                insufficientLeave = true;
                errorMessage = "可用公假剩餘時數不足";
            }
            break;
        case '10': 
            if (actualLeaveHours > bereavementLeaveHours) {
                insufficientLeave = true;
                errorMessage = "可用喪假剩餘時數不足";
            }
            break;
        default:
            Swal.fire({
                icon: "error",
                text: "無此假別",
                showConfirmButton: true
            });
            return;
    }

    if (insufficientLeave) {
        // 先显示 SweetAlert 消息
        Swal.fire({
            icon: "error",
            text: errorMessage,
            showConfirmButton: true
        }).then(() => {
            // 关闭对话框
            creatDdialogVisible.value = false;
        });
        return; 
    }

    // 关闭对话框和显示 "正在执行" 提示
    creatDdialogVisible.value = false;
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    // 发送请求
    axiosapi.post("/leave/add", request)
        .then(response => {
            Swal.close(); // 关闭正在执行的提示
            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    text: response.data.msg,
                    showConfirmButton: false,
                    timer: 2000 // 消息显示时间为2秒
                }).then(() => {
                    // 刷新页面或更新状态
                    openZon.value = true; // 打开详细数据区域
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.msg,
                });
            }
        })
        .catch(error => {
            Swal.close(); // 关闭正在执行的提示
            Swal.fire({
                icon: "error",
                text: "新增錯誤：" + error.message,
            });
        });
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


function callQueryTwo() {
    console.log("callQuery - 当前页码:", current.value);

    const employeeId = computed(() => employeeInfo.value.id);
    console.log('Employee ID:', employeeId);

    let request = {
        "pageNum": current.value - 1,  // 由于Spring Boot分页是从0开始，这里减1
        "pageSize": rows.value,
        "employeeId": employeeId.value,
        "leaveStatus": 1, // 1 为给假
    };

    axiosapi.post("/leave/query", request)
        .then(function (response) {
            // 获取查询到的数据列表
            leavesTwo.value = response.data.data.content; // 获取查询到的数据列表
        // 更新分页信息
        total.value = response.data.data.totalElements; // 总条目数
        pages.value = response.data.data.totalPages; // 总页数

        console.log("leavesTwo", response.data.data.content);
        console.log("total", response.data.data.totalElements);
        console.log("pages", response.data.data.totalPages);

            console.log("leavesTwo", response.data.data);
        })
        .catch(function (error) {
            console.log("error", error);
            Swal.fire({
                text: "查询错误：" + (error.response?.data?.message || error.message),
                icon: "error"
            });
        });
}


// 多筆查詢
function callQuery() {
    console.log("callQuery - 當前頁碼:", current.value);
    const employeeId = computed(() => employeeInfo.value.id);
    console.log('Employee ID:', employeeId.value);

    let request = {
        "pageNum": current.value - 1,  // 由于Spring Boot分页是从0开始，这里减1
        "pageSize": rows.value,
        "employeeId": employeeId.value,
        "leaveStatus": 0, // 0為請假
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
.btn-custom {
  background-color: #a33238; /* 设置背景颜色 */
  color: #ffffff;            /* 设置字体颜色为白色 */
  border: none;              /* 去掉按钮边框 */
  height: 30px;              /* 设置按钮高度 */
  font-size: 15px;           /* 设置字体大小 */
  display: flex;             /* 使用 flex 布局 */
  align-items: center;       /* 垂直居中对齐 */
  justify-content: center;   /* 水平居中对齐 */
  padding: 0 15px;           /* 添加内边距，使按钮有一定宽度 */
}

/* 调整模态框的垂直位置，使其居中显示 */
.modal-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(90% - 1rem); /* 避免顶部和底部的空白区域 */

}
.right-panel {
    width: 60%;
    padding: 60px;
    margin-left: -20px;
    /* 根据需要调整这个值 */
}

.left-panel {
    width: 30%;
    margin: 15px;
    padding: 35px;
    background-color: #fff5eb;
    position: relative;
    margin-left: 110px;
    /* 根据需要调整这个值 */
}

.btn-close {
    margin: 10px;
}

.btm-div {
    position: absolute;
    right: 20px;
    /* 你可以根据需要调整右侧的距离 */
    bottom: 10px;
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