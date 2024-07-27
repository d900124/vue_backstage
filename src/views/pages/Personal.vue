<template>
    <div class="container text-center">
        <div class="row">
            <!-- 登出圖釘 -->
            <Logout></Logout>

            <!-- 工作排程 -->
            <AgendaTable></AgendaTable>
            <!-- 請假管理 -->
            <LeavePersonal></LeavePersonal>

            <!-- 個人資料 & 考核 -->
            <EmployeeDetail2></EmployeeDetail2>
        </div>
    </div>
</template>

<script setup>
import AgendaTable from '@/components/AgendaTable.vue'
import EmployeeDetail2 from '@/components/EmployeeDetail2.vue';
import LeavePersonal from '@/components/LeavePersonal.vue';
import Logout from '@/components/Logout.vue';

</script>

<style></style>