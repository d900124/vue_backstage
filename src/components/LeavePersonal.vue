\<template>
    <!-- 抬頭 -->
    <div style="padding:20px;">
        <h3 class="table-title">請假申請</h3>
    </div>
    <!-- 主容器 -->
    <!-- 左邊的剩餘假別表格 -->
    <div class="left-panel">
        <div class="table-part">
            <table class="table">
                <thead class="table-head">
                    <tr style="color: #a33238; font-size: 25px; font-weight: bold;padding: 20px;">
                        {{ employeeInfo.accountTypeName }} {{ employeeInfo.name }}
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
                        <td class="table-td">7 小時</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 右邊的假單簽核表格 -->
    <!-- 列表主體 -->
    <div class="table-part right-panel">
        <table class="table">
            <thead style="border-bottom: 2px solid #a33238;">
                <tr>
                    <th scope="col" class="table-th">請假時段</th>
                    <th scope="col" class="table-th">假種</th>
                    <th scope="col" class="table-th">時數</th>
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
    </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
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

// 可选：调试数据
watch(employeeInfo, (newValue) => {
    console.log('Employee info updated:', newValue);
});


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
</script>

<style>
.table-title {
    float: right;
    color: #a33238;
    font-weight: 900;
    margin: 10px 0px;
}

.left-panel {
    width: 30%;
    padding: 40px;
    background-color: #fff5eb;
}

.right-panel {
    width: 68%;
}

/* 表头背景颜色 */
.table-head .table-th {
    background-color: #a33238;
    color: white;
    /* 文字颜色 */
}

/* 表格数据背景颜色 */
.table-body .table-td {
    background-color: #fff5eb;
    color: #a33238;
    /* 文字颜色 */
    padding: 12px;
}

/* 表格边框颜色 */
.table {
    border-collapse: collapse;
}



.table-th,
.table-td {
    padding: 8px;
    border-bottom: 1px solid #a33238;
}
</style>
