<template>
    <div class="container text-center" >
        <div class="row">
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
    
</script>
    
<style>
    
</style>