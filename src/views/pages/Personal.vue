<template>
    <div class="container text-center">
        <div class="row">
            <!-- 登出圖釘 -->
            <Logout></Logout>

            <!-- 工作排程 -->
            <AgendaTable></AgendaTable>
            <!-- 請假管理 -->

            <!-- 個人資料 & 考核 -->
            <EmployeeDetail></EmployeeDetail>
        </div>
    </div>
</template>

<script setup>
import AgendaTable from '@/components/AgendaTable.vue'
import EmployeeDetail from '@/components/EmployeeDetail.vue';
import Logout from '@/components/Logout.vue';

</script>

<style></style>