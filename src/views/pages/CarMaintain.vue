<template>
        <div class="container text-center">
                <div class="row">
        <!-- 登出圖釘 -->
        <Logout></Logout>
        <!-- <h3>車輛管理</h3> -->

        <!-- 賞車清單 -->
        <ViewCarAssignedTable></ViewCarAssignedTable>
        <!-- 車輛總覽 -->
        </div>
        </div>
</template>
    
<script setup >
    import ViewCarAssignedTable from '@/components/ViewCarAssignedTable.vue';
    import Logout from '@/components/Logout.vue';

</script>

<style></style>