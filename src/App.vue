<template>
    <div class="common-layout" >
        <el-container style="height: 100%; ">
        <el-aside style=" width: auto; box-shadow: 10px 0px 15px #ececec; overflow: hidden; position: fixed;"><LeftSideMenu 
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


</script>