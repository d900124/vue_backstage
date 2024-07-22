<template>
    <div class="col-1"></div>
    <!-- 多选下拉菜单(简易搜索) -->
    <div class="col-5" style="padding: 0px 0px;"></div>

    <!-- 抬头 -->
    <div class="col-5" style="padding: 0px 0px;">
        <h3 class="table-title">个人资讯</h3>
    </div>
    <div class="col-1"></div>

    <div class="col-1"></div>
    <div class="col-10">
        <!-- 弹出式复杂搜索 -->
        <div class="extra-menu"></div>
        <!-- 列表主体 -->
        <div class="table-part">
            <table class="table">
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                        <th scope="col" class="table-th">串接{{ employeeInfo.name }}员工名</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <td class="table-th">
                            <span>职等：</span><span>{{ employeeInfo.accountTypeName }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-th">
                            <span>姓名：</span><span>{{ employeeInfo.name }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-th">
                            <span>性别：</span><span>{{ employeeInfo.sex }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-th">
                            <span>帐号：</span><span>{{ employeeInfo.account }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-th">
                            <span>手机：</span><span>{{ employeeInfo.phone }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-th">
                            <span>Email：</span><span>{{ employeeInfo.email }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-th">
                            <span>入职日：</span><span>{{ employeeInfo.startDate }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-th">
                            <span>直属主管：</span><span>{{ employeeInfo.teamLeaderName }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-th">
                            <span>分店：</span><span>{{ employeeInfo.branchName }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const employeeInfo = computed(() => store.state.employeeInfo.data);
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
