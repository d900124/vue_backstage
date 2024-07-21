<template>
    <div class="common-layout" >
        <el-container style="height: 100%; ">
        <el-aside style=" width: auto; box-shadow: 10px 0px 15px #ececec; overflow: hidden; position: fixed;"><LeftSideMenu 
            ></LeftSideMenu></el-aside>
        <el-main style=" width: auto; margin-left: 100px;">
            <dev class="container">
                <RouterView></RouterView>
            
            </dev>
        </el-main>
        </el-container>
    </div>
    <!-- <LeftSideMenu></LeftSideMenu>
<el-button type="primary">主要按鈕</el-button>
    <RouterView></RouterView> -->
</template>

<style scoped>
</style>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LeftSideMenu from './views/LeftSideMenu.vue';


</script>