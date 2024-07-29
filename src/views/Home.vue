<template>
<section>     
    <!-- <h3>Home</h3>
    <input type="button" value="測試"> -->
    <!-- <el-pagination
        v-model:current-page="currentPage3"
        v-model:page-size="pageSize3"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper"
        :total="1000"
    ></el-pagination> -->
    <!-- 登入 -->
    <LoginPage></LoginPage>
</section>     
    

</template>
    
<script setup >
import LoginPage from './pages/LoginPage.vue';

    // const currentPage3 = ref(5)
    // const pageSize3 = ref(100)
    // const size = ref<ComponentSize>('default')
    // const background = ref(false)
    // const disabled = ref(false)
</script>
    
<style>
    
</style>