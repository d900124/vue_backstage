<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose" background-color="#fff5eb" active-text-color="#a33238" unique-opened="true" router="true"
        style="border :1px solid #fff5eb;" v-if="employeeInfo!=null && employeeInfo.accountType!=null">


        <RouterLink :to="{ name: 'home-link' }" style="all: unset;">
            <el-icon style="width: 30px; margin: 55px 20px;"><img src="/Kajarta_LOGO_02.svg"></el-icon>
        </RouterLink>


        <el-sub-menu index="/pages/personal" style="margin-top: 50px;" >
            <template #title>
                <RouterLink :to="{ name: 'personal-link' }" style="all: unset;"><el-icon><font-awesome-icon icon="user"
                            style="color: #a33238;" /></el-icon></RouterLink>
                <span>
                    <RouterLink :to="{ name: 'personal-link' }" style="all: unset;"><b>個人專區</b></RouterLink>
                </span>

            </template>
            <a href="/pages/personal#agenda" style="all: unset;"><el-menu-item> - 工作排程</el-menu-item></a>
            <a href="/pages/personal#leavePersonal" style="all: unset;"><el-menu-item> - 請假管理</el-menu-item></a>
            <a href="/pages/personal#personalInfo" style="all: unset;"><el-menu-item> - 個人資料 & 考核</el-menu-item></a>

        </el-sub-menu>

        <el-sub-menu index="/pages/carMaintain">
            <template #title>

                <RouterLink :to="{ name: 'car-maintain-link' }" style="all: unset;"><el-icon><font-awesome-icon
                            icon="fa-solid fa-car" style="color: #a33238;" /></el-icon></RouterLink>
                <span>
                    <RouterLink :to="{ name: 'car-maintain-link' }" style="all: unset;"><b>車輛管理專區</b></RouterLink>
                </span>

            </template>
            <a href="/pages/carMaintain#viewCarAssigned" style="all: unset;"><el-menu-item > - 賞車清單</el-menu-item></a>
            <a href="#" style="all: unset;"><el-menu-item index="2-2"> - 車輛總覽</el-menu-item></a>
        </el-sub-menu>

        <el-sub-menu index="/pages/clientMaintain">
            <template #title>

                <RouterLink :to="{ name: 'client-maintain-link' }" style="all: unset;"><el-icon><font-awesome-icon
                            icon="clipboard-check" style="color: #a33238;" /></el-icon></RouterLink>
                <span>
                    <RouterLink :to="{ name: 'client-maintain-link' }" style="all: unset;"><b>帳號管理專區</b></RouterLink>
                </span>
            </template>
            <a href="/pages/clientMaintain#customer" style="all: unset;"><el-menu-item > - 客戶總覽 </el-menu-item></a>
            <a href="/pages/clientMaintain#employee" style="all: unset;" v-if="employeeInfo!==null &&employeeInfo.accountType==4"><el-menu-item > - 員工總覽 </el-menu-item></a>
        </el-sub-menu>

        <el-sub-menu index="/pages/teamMaintain" v-if="employeeInfo!==null &&employeeInfo.accountType==4">
            <template #title>

                <RouterLink :to="{ name: 'team-maintain-link' }" style="all: unset;"><el-icon><font-awesome-icon
                            icon="clipboard-check" style="color: #a33238;" /></el-icon></RouterLink>
                <span>
                    <RouterLink :to="{ name: 'team-maintain-link' }" style="all: unset;"><b>員工管理專區</b></RouterLink>
                </span>

            </template>
            <a href="/pages/teamMaintain#carAdjust" style="all: unset;"><el-menu-item> - 車輛調整簽核</el-menu-item></a>
            <a href="/pages/teamMaintain#leave" style="all: unset;"><el-menu-item > - 假單簽核 </el-menu-item></a>
            <a href="/pages/teamMaintain#giveLeave" style="all: unset;"><el-menu-item > - 給假簽核 </el-menu-item></a>
            <a href="/pages/teamMaintain#kpi" style="all: unset;"><el-menu-item> - 考核評比 </el-menu-item></a>
        </el-sub-menu>


        <el-switch v-model="isCollapse" class="ml-2" size="small"
            style="--el-switch-on-color: #a33238; -webkit-margin-start: 18px ; margin-top: 100px; position: absolute; bottom: 2%;" />

    </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axiosapi from '@/plugins/axios';
import { ElButton } from 'element-plus';
import 'element-plus/dist/index.css';

const router = useRouter();
const isCollapse =ref(false);

const store = useStore();
// 确保 employeeInfo 在页面加载时是一个初始值为空的对象，而不是 null 或 undefined。这样可以确保在模板渲染时不会出错
const employeeInfo = computed(() => store.state.employeeInfo.data || {});
console.log('===>Employee info:', employeeInfo);
console.log('===>Employee info:', employeeInfo.value);
const accountTypeName = computed(() => employeeInfo.value?.accountTypeName || '');
console.log('Account Type Name:', accountTypeName.value);

// 可选：调试数据
watch(employeeInfo, (newValue) => {
    console.log('Employee info updated:', newValue);
});

</script>

<style>
.el-menu-vertical-demo {
    height: 100vh;
    display: flex;
    flex-direction: column;

}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}

.logout-container {
    display: flex;
    justify-content: center;
    padding: 10px 0;

}
</style>
