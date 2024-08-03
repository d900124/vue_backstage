<template>
<section>     
    <div class="container text-center">
        <div class="row">
            <!-- 登出圖釘 -->
            <Logout></Logout>

            <!-- 客戶總覽 -->
            <Customer></Customer>

            <!-- 員工總覽 -->
            <Employee></Employee>

        </div>
    </div>
</section>     
</template>

<script setup>
import Customer from '@/components/Customer.vue';
import Logout from '@/components/Logout.vue';
import Employee from '@/components/Employee.vue';


</script>

<style></style>