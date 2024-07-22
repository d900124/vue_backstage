<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose" background-color="#fff5eb" active-text-color="#a33238" unique-opened="true" router="true"
        style="border :1px solid #fff5eb;">


        <RouterLink :to="{ name: 'home-link' }" style="all: unset;">
            <el-icon style="width: 30px; margin: 55px 20px;"><img src="/Kajarta_LOGO_02.svg"></el-icon>
            <!-- 想加username 歡迎在這 從vuex拿出來employeeInfo.name-->
            <span style="color: #a33238; margin-left: 10px;"><b>歡迎 {{ employeeInfo.name || '用户' }}</b></span>
        </RouterLink>


        <el-sub-menu index="/pages/personal" style="margin-top: 50px;">
            <template #title>
                <RouterLink :to="{ name: 'personal-link' }" style="all: unset;"><el-icon><font-awesome-icon icon="user"
                            style="color: #a33238;" /></el-icon></RouterLink>
                <span>
                    <RouterLink :to="{ name: 'personal-link' }" style="all: unset;"><b>個人專區</b></RouterLink>
                </span>

            </template>
            <a href="/pages/personal#agenda" style="all: unset;"><el-menu-item> - 工作排程</el-menu-item></a>
            <a href="#" style="all: unset;"><el-menu-item index="1-2"> - 請假管理</el-menu-item></a>
            <a href="#" style="all: unset;"><el-menu-item index="1-3"> - 個人資料 & 考核</el-menu-item></a>

        </el-sub-menu>

        <el-sub-menu index="/pages/carMaintai">
            <template #title>

                <RouterLink :to="{ name: 'car-maintain-link' }" style="all: unset;"><el-icon><font-awesome-icon
                            icon="fa-solid fa-car" style="color: #a33238;" /></el-icon></RouterLink>
                <span>
                    <RouterLink :to="{ name: 'car-maintain-link' }" style="all: unset;"><b>車輛管理專區</b></RouterLink>
                </span>

            </template>
            <a href="#" style="all: unset;"><el-menu-item index="2-1"> - 賞車清單</el-menu-item></a>
            <a href="#" style="all: unset;"><el-menu-item index="2-2"> - 車輛總覽</el-menu-item></a>
        </el-sub-menu>

        <el-menu-item index='/pages/clientMaintain'>
            <RouterLink :to="{ name: 'client-maintain-link' }" style="all: unset;"><el-icon><font-awesome-icon
                        icon="briefcase" style="color: #a33238;" /></el-icon></RouterLink>
            <template #title>
                <RouterLink :to="{ name: 'client-maintain-link' }" style="all: unset;"><b>客戶管理專區</b></RouterLink>
            </template>
        </el-menu-item>

        <el-sub-menu index="/pages/teamMaintain">
            <template #title>

                <RouterLink :to="{ name: 'team-maintain-link' }" style="all: unset;"><el-icon><font-awesome-icon
                            icon="clipboard-check" style="color: #a33238;" /></el-icon></RouterLink>
                <span>
                    <RouterLink :to="{ name: 'team-maintain-link' }" style="all: unset;"><b>員工管理專區</b></RouterLink>
                </span>

            </template>
            <a href="/pages/teamMaintain#carAdjust" style="all: unset;"><el-menu-item> - 車輛調整簽核</el-menu-item></a>
            <a href="#" style="all: unset;"><el-menu-item index="4-2"> - 假單簽核 </el-menu-item></a>
            <a href="#" style="all: unset;"><el-menu-item index="4-3"> - 員工總覽 </el-menu-item></a>
            <a href="/pages/teamMaintain#kpi" style="all: unset;"><el-menu-item> - 考核評比 </el-menu-item></a>
        </el-sub-menu>
        <el-sub-menu>
            <template #title>
                <!-- <button @click="logout">登出</button> -->
                <div class="logout-container">
                    <el-button round @click="logout" plain>登出</el-button>
                </div>
            </template>

        </el-sub-menu>


        <el-switch v-model="isCollapse" class="ml-2" size="small"
            style="--el-switch-on-color: #a33238; -webkit-margin-start: 18px ; margin-top: 100px; position: absolute; bottom: 2%;" />

    </el-menu>
</template>

<script lang="ts" setup>
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

const logout = async () => {
    try {
        const response = await axiosapi.post('/logout', {}, {
            withCredentials: true // 确保带上 Cookie
        });

        if (response.status === 200) {
            // 清除本地存储的用户信息
            localStorage.removeItem('username');

            // 调用 Vuex 的 logout action 清除 Vuex 状态
            store.dispatch('logout');

            // 跳转到登录页面
            router.push('/');
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};


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

const isCollapse = ref(!true)
const value5 = ref(true)

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
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
