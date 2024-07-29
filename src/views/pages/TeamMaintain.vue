<template>
<section> 
    <div class="container text-center">
        <div class="row">
            <!-- 登出圖釘 -->
            <Logout></Logout>
            
            <!-- 車輛調整簽核 -->
            <CarAdjustTable></CarAdjustTable>

            <!-- 假單簽核 -->
            <Leave></Leave>

            <!-- 員工總覽 -->
            <Employee></Employee>

            <!-- 考核評比 -->
            <KpiTable></KpiTable>
        </div>
    </div>
</section> 
</template>

<script setup>
import CarAdjustTable from '@/components/CarAdjustTable.vue';
import KpiTable from '@/components/KpiTable.vue';
import Leave from '@/components/Leave.vue';
import EmployeeList from '@/components/Employee.vue';
import Logout from '@/components/Logout.vue';


</script>

<style></style>