<template>
    <div v-if="employeeInfo">
        <div class="col-1">&nbsp;</div>
        <div class="col-5" style="padding: 0px 0px;">&nbsp;</div>
        <!-- 抬頭 -->
        <div class="col-5" style="padding: 0px 0px; ">
            <h3 class="table-title" style="justify-content: flex-end;">個人資訊</h3>
        </div>
        <div class="col-1">&nbsp;</div>
        <div class="col-1"></div>
        <div class="container">
            <!-- 列表主體 -->
            <div class="table-part">
                <table class="table">
                    <thead style="border-bottom: 2px solid #a33238;">
                        <tr>
                            <th scope="col" class="table-th">{{ employeeInfo.name }} 員工資料</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr>
                            <td class="table-td">
                                <span>員工編號：</span><span>{{ employeeInfo.id }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-td">
                                <span>職等：</span><span>{{ employeeInfo.accountTypeName }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-td">
                                <span>姓名：</span><span>{{ employeeInfo.name }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-td">
                                <span>性别：</span><span>{{ employeeInfo.sex }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-td">
                                <span>帳號：</span><span>{{ employeeInfo.account }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-td">
                                <span>手機：</span><span>{{ employeeInfo.phone }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-td">
                                <span>Email：</span><span>{{ employeeInfo.email }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-td">
                                <span>入職日：</span><span>{{ employeeInfo.startDate }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-td">
                                <span>直屬主管：</span><span>{{ employeeInfo.teamLeaderName }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-td">
                                <span>分店：</span><span>{{ employeeInfo.branchName }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff5eb;
    padding: 20px;
}

.header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.table-part {
    width: 100%;
    max-width: 800px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table-th {
    color: #a33238;
    font-weight: 900;
    text-align: left;
}

.table-td {
    font-size: 0.9em;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
}

.table-title {
    color: #a33238;
    font-weight: 900;
}

thead tr {
    border-bottom: 2px solid #a33238;
}

tbody tr:last-child td {
    border-bottom: none;
}
</style>