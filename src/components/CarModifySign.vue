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
            <!-- =====================資料列表===================== -->
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
                        <th scope="col" class="table-th">ID</th>
                        <th scope="col" class="table-th">品牌/型號</th>
                        <th scope="col" class="table-th">價錢</th>
                        <th scope="col" class="table-th">銷售員</th>
                        <th scope="col" class="table-th">最後修改時間</th>
                        <th scope="col" class="table-th">狀態</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="carData in carDatas" :key="carDatas.id" :carData="carData">
                        <th scope="row" class="table-td">{{ carData.id }}</th>
                        <td class="table-td">{{ carData.cainfoBrand }} - {{ carData.carinfoModelName }} </td>
                        <td class="table-td">{{ carData.price }} </td>
                        <td class="table-td">{{ carData.employeeName }}</td>
                        <td class="table-td">{{ carData.updateTime }}</td>
                        <td class="table-td">{{ carData.stateName }}</td>
                        <el-button type="danger" style="color: #a33238;" round>修改r</el-button>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
    
<script setup >
import { computed,onMounted,ref } from 'vue';
import axiosapi from '@/plugins/axios';
    

const openFindMore =ref(false);
const props=defineProps([]);
const carDatas=ref([]);
onMounted(function(){
    callFindAll();
});

function callFindAll() {
    let request = {
        pageNumber: 1,
        sortOrder: "asc",
        max: 10
    };

    axiosapi.get(`/car/findAll`, { params: request })
            .then(function (response) {
                if (response && response.data) {
                    console.log("response", response);
                    carDatas.value = response.data.list;
                    total.value = response.data.totalElements;
                    pages.value = response.data.totalPages;
                } else {
                    console.error("Invalid response data structure:", response);
                }
    
                // setTimeout(function () {
                //     Swal.close();
                // }, 500);
            })
            .catch(function (error) {
                console.error("Error fetching data:", error, response);
                Swal.fire({
                    text: "查詢失敗：" + error.message,
                    icon: "error"
                });
            });
}
</script>
    
<style>
    
</style>