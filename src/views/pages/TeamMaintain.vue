<template>

    <div class="container text-center">
        <div class="row">
            <!-- 車輛調整簽核 -->
            <CarAdjustTable></CarAdjustTable>

            <!-- 假單簽核 -->
            <Leave></Leave>

            <!-- 員工總覽 -->
            <Employee></Employee>


            <!-- 考核評比 -->
            <LoginForm></LoginForm>

        </div>
    </div>
</template>

<script setup>
import CarAdjustTable from '@/components/CarAdjustTable.vue';
import Leave from '@/components/Leave.vue';
import EmployeeList from '@/components/Employee.vue';
import LoginForm from '@/components/LoginForm.vue';



</script>

<style></style>