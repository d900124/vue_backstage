\<template>
    <!-- 主容器 -->
    <!-- 左邊的剩餘假別表格 -->
    <div class="left-panel">
        <div class="table-part">
            <table class="table">
                <thead class="table-head">
                    <tr>
                        <th class="table-th">{{ employeeInfo.name }} {{ employeeInfo.accountTypeName }} 剩餘假別</th>
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
</script>

<style>
.left-panel {
    width: 30%;
    padding: 10px;
    background-color: #fff5eb;
}

.right-panel {
    width: 68%;
}

/* 表头背景颜色 */
.table-head .table-th {
    background-color: #fff5eb;
    color: #a33238;
    /* 文字颜色 */
}

/* 表格数据背景颜色 */
.table-body .table-td {
    background-color: #fff5eb;
    color: #a33238;
    /* 文字颜色 */
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
