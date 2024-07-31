<template>
     <div class="btm-div" style="display: flex;margin-right: 20px;" @click="openFindMore=true">
                        <font-awesome-icon icon="magnifying-glass" size="" style="color: #a33238; padding: 0;"/>
                        <el-button type='' link  style="color: #a33238; font-weight: 900;">查詢</el-button>
                        
                    </div>
                    <div class="col-1"></div>
<!-- 下拉選單(簡易搜尋)只有外觀先別碰 -->
            
                
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

                <div class="table-part">
                <table class="table">
                <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                    <th scope="col" class="table-th" >ID</th>
                    <th scope="col" class="table-th" >品牌 - 型號</th>
                    <th scope="col" class="table-th" >價格</th>
                    <th scope="col" class="table-th" >銷售員</th>
                    <th scope="col" class="table-th" >更新時間</th>
                    <th scope="col" class="table-th" >狀態</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="item in items" :key="item.id"  @click="itemClick(item.id)">
                    <th scope="row" class="table-td">{{item.id}}</th>
                    <td class="table-td">{{item.carBrand}}&nbsp;-&nbsp;{{item.carModelName}}</td>
                    <td v-if="item.approvalType==1||item.approvalType==2" class="table-td">{{item.approvalTypeName}} 至 ${{item.floatingAmount}}</td>
                    <td v-if="item.approvalType==3" class="table-td">{{item.approvalTypeName}} </td>
                    <td class="table-td">{{item.createTimeString}}</td>
                    <td class="table-td">{{item.employeeName}}</td>
                    <td class="table-td">{{item.approvalStatusName}}</td>
                    </tr>
                    
                </tbody>
                </table>
                <div>
                </div>
            </div>
            
        

     
            


        
</template>
    
<script setup >
import { computed,onMounted,ref } from 'vue';
    
    const openFindMore =ref(false)
</script>
    
<style>
    
</style>