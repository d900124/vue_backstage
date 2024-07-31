<template>
     <div class="btm-div" style="display: flex;margin-right: 20px;" @click="openFindMore=true">
                        <font-awesome-icon icon="magnifying-glass" size="" style="color: #a33238; padding: 0;"/>
                        <el-button type='' link  style="color: #a33238; font-weight: 900;">查詢</el-button>
                        
                    </div>
                    <div class="col-1"></div>
<!-- 下拉選單(簡易搜尋)只有外觀先別碰 -->
            <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;">
                
                    <el-select
                        v-model="findCarBrand"
                        clearable
                        placeholder="ID"
                        size="small"
                        style="width: 130px;margin-right: 20px;"
                        @change = "current=1;callFindByHQL(false)"
                        >
                        <el-option
                            v-for="Option in carBrandOptions"
                            :key="Option.value"
                            :label="Option.label"
                            :value="Option.value"
                            
                        />
                    </el-select>

                    <el-select
                        v-model="findEmployeeId"
                        clearable
                        placeholder="Brand"
                        size="small"
                        style="width: 130px;margin-right: 20px;"
                        @change = "current=1;callFindByHQL(false)"
                        @click="cadTableDoEmpFindAll();"
                        >
                        <el-option
                            v-for="Option in employeeIDOptions"
                            :key="Option.value"
                            :label="Option.label"
                            :value="Option.value"
                            
                        />
                    </el-select>

                    <el-select
                        v-model="findApprovalType"
                        clearable
                        placeholder="Model"
                        size="small"
                        style="width: 130px;margin-right: 20px;"
                        @change = "current=1;callFindByHQL(false)"
                        >
                        <el-option
                            v-for="Option in creatApprovalTypeOptions"
                            :key="Option.value"
                            :label="Option.label"
                            :value="Option.value"
                            
                        />
                    </el-select>
            
            <el-select
                        v-model="findApprovalStatus"
                        clearable
                        placeholder="Price"
                        size="small"
                        style="width: 130px;margin-right: 20px;"
                        @change = "current=1;callFindByHQL(false)"
                        >
                        <el-option
                            v-for="Option in approvalStatusOptions"
                            :key="Option.value"
                            :label="Option.label"
                            :value="Option.value"
                            
                        />
                    </el-select>
                    <!-- 車輛列表 -->

     
            </div>


        
</template>
    
<script setup >
import { computed,onMounted,ref } from 'vue';
    
    const openFindMore =ref(false)
</script>
    
<style>
    
</style>