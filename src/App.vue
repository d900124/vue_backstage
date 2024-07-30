<template>
    <div class="common-layout" >
        <el-container style="height: 100%; ">
        <el-aside style=" width: auto; box-shadow: 10px 0px 15px #ececec; overflow: hidden; position: fixed;" v-if="employeeInfo!=null"><LeftSideMenu 
            ></LeftSideMenu></el-aside>
        <el-main style=" width: auto; margin-left: 100px;">
            <dev class="container">
                <RouterView v-slot="{Component, route}">
                    <transition name="slide" mode="out-in"> 
                        <component :is="Component" :key="route.path" ></component>
                    </transition>
                </RouterView>
            
            </dev>
        </el-main>
        </el-container>
    </div>
    <!-- <LeftSideMenu></LeftSideMenu>
<el-button type="primary">主要按鈕</el-button>
    <RouterView></RouterView> -->
</template>

<style >
.slide-enter-active,
.slide-leave-active{
    transition: opacity 1s,transform 1s;
}

.slide-enter-from,
.slide-leave-to{
    opacity: 0;
    transform: translateX(-5%);
}
</style>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LeftSideMenu from './views/LeftSideMenu.vue';
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isAuthenticated = computed(() => store.state.isAuthenticated); // 計算是否已認證
const employeeInfo = computed(() => store.state.employeeInfo.data || {}); // 計算員工信息

//登錄資訊用 使用 async 和 await 來等待 Vuex action 完成並更新
const fetchEmployeeData = async () => {
  const username = localStorage.getItem("username");
  if (username) {
    await store.dispatch("fetchEmployeeInfo", username);
  }
};

onMounted(async () => {
    await fetchEmployeeData();
    if (employeeInfo.value.id) {
        console.log("employeeInfo",employeeInfo.value)
        createEmployeeId.value=employeeInfo.value.id;
    }else {
    console.warn('Employee info not loaded yet');
  }

});


</script>