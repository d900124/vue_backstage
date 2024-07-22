<template >
    <div class="col-12" style="height: 50px;"></div>
    <div class="col-1">&nbsp;</div>
<!-- 多選下拉選單(簡易搜尋) -->
    <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;">
        <el-date-picker
            v-model="findKpiYear"
            type="year"
            placeholder="年份"
            size="small"
            style="width: 130px;margin-right: 20px;"
            @change = "current=1;findKpiSeasonStrDayDuring=[null,null];callKpiFindByHQL(false)"
            />

        <el-select
            v-model="findKpiSeasonStrDay"
            clearable
            placeholder="季度"
            size="small"
            style="width: 130px;margin-right: 20px;"
            @change = "current=1;findKpiSeasonStrDayDuring=[null,null];callKpiFindByHQL(false)"
            >
            <el-option
                v-for="Option in seasonStrDayOptions"
                :key="Option.value"
                :label="Option.label"
                :value="Option.value"
                
            />
        </el-select>

        <el-select
            v-model="findKpiEmployeeBranch"
            clearable
            placeholder="分店"
            size="small"
            style="width: 130px;margin-right: 20px;"
            @change = "current=1;callKpiFindByHQL(false)"
            >
            <el-option
                v-for="Option in branchOptions"
                :key="Option.value"
                :label="Option.label"
                :value="Option.value"
                
            />
        </el-select>

        <el-select
            v-model="findKpiEmployeeType"
            clearable
            placeholder="狀態"
            size="small"
            style="width: 130px;margin-right: 20px;"
            @change = "current=1;callKpiFindByHQL(false)"
            >
            <el-option
                v-for="Option in employeeTypeOptions"
                :key="Option.value"
                :label="Option.label"
                :value="Option.value"
            />
        </el-select>

<!-- 開啟進階查詢 -->
        <div class="btm-div" style="display: flex;margin-right: 20px;" @click="openKpiFindMore=true">
            <font-awesome-icon icon="magnifying-glass" size="" style="color: #a33238; padding: 0;"/>
            <el-button type='' link  style="color: #a33238; font-weight: 900;">進階查詢</el-button>
        </div>

<!-- 清除查詢 -->
        <div class="btm-div" style="display: flex;margin-right: 20px;" @click="cleanKpiFind">
            <font-awesome-icon icon="fa-regular fa-circle-xmark" size="" style="color: #a33238; padding: 0;"/>
            <el-button type='' link  style="color: #a33238; font-weight: 900;">清除查詢</el-button>
        </div>
    </div>
    
<!-- 抬頭 -->
    <div class="col-2" style="padding: 0px 0px;">
        <h3 class="table-title" id="kpi">考核評比</h3>
    </div>
    <div class="col-1"></div>

<!-- 多選彈出 -->
    <el-drawer
        v-model="openKpiFindMore"
        title=""
        :direction="direction"
        >
        <el-divider content-position="left">
                    <h5 class="table-title" >Kpi查詢多選選項</h5>
        </el-divider>

        <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">

            <el-form-item label="員工姓名 :&nbsp;">
                <el-select
                    v-model="findKpiEmployeeId"
                    clearable
                    placeholder="員工姓名"
                    size="small"
                    @change = "current=1;callFindByHQL(false)"
                    >
                    <el-option
                        v-for="Option in employeeIDOptions"
                        :key="Option.value"
                        :label="Option.label"
                        :value="Option.value"
                        
                    />
                </el-select>
            </el-form-item>

            <el-divider border-style="dashed" style="margin: 0;"/>
            <el-form-item label="主管姓名 :&nbsp;">
                <el-select
                    v-model="findKpiTeamLeaderId"
                    placeholder="主管姓名"
                    clearable
                    size="small"
                    @change = "current=1;callFindByHQL(false)"
                    >
                    <el-option
                        v-for="Option in teamleaderIDOptions"
                        :key="Option.value"
                        :label="Option.label"
                        :value="Option.value"
                    />
                </el-select>
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;"/>

            <el-form-item label="查詢區間 :&nbsp;">
                <el-date-picker
                    v-model="findKpiSeasonStrDayDuring"
                    size="small"
                    type="monthrange"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    value-format="YYYY-MM-DD"
                    @change="current=1;findKpiYear='';findKpiSeasonStrDay='',callKpiFindByHQL(false);"
                    @clean ="current=1;callKpiFindByHQL(false);"
                />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;"/>

            <el-form-item label="主管給分 :&nbsp;">
                <el-input-number
                v-model="findTeamLeaderRatingMax"
                size="small"
                clearable
                controls-position="right"
                @change = "current=1;callKpiFindByHQL(false)"
            />&nbsp;~&nbsp;
            <el-input-number
                v-model="findTeamLeaderRatingMin"
                size="small"
                clearable
                controls-position="right"
                @change = "current=1;callKpiFindByHQL(false)"
            />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;"/>

            <el-form-item label="客戶給分 :&nbsp;">
                <el-input-number
                v-model="findSalesScoreMax"
                size="small"
                clearable
                controls-position="right"
                @change = "current=1;callKpiFindByHQL(false)"
            />&nbsp;~&nbsp;
            <el-input-number
                v-model="findSalesScoreMin"
                size="small"
                clearable
                controls-position="right"
                @change = "current=1;callKpiFindByHQL(false)"
            />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;"/>

            <el-form-item label="總分區間 :&nbsp;">
                <el-input-number
                v-model="findTotalScoreMax"
                size="small"
                clearable
                controls-position="right"
                @change = "current=1;callKpiFindByHQL(false)"
            />&nbsp;~&nbsp;
            <el-input-number
                v-model="findTalScoreMin"
                size="small"
                clearable
                controls-position="right"
                @change = "current=1;callKpiFindByHQL(false)"
            />
            </el-form-item>
            <el-divider border-style="dashed" style="margin: 0;"/>

            </el-form>
            <div class="btm-div" style="display: flex;margin: 100px 50px; float: right" @click="cleanKpiFind">
                    <font-awesome-icon icon="fa-regular fa-circle-xmark" size="" style="color: #a33238; padding: 0;"/>
                    <el-button type='' link  style="color: #a33238; font-weight: 900;">清除查詢</el-button>
                </div>
    </el-drawer>

</template>
    
<script setup >
import { onMounted,ref } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';


//用於重新導向 router.push
const router = useRouter()

//簡易查詢用屬性
const findKpiYear = ref('2024')
const findKpiSeasonStrDay  = ref('-07-01')
const findKpiEmployeeBranch  = ref(-1)
const findKpiEmployeeType  = ref(1)

//複雜查詢屬性
const findKpiSeasonStrDayDuring = ref([null,null])
const findTeamLeaderRatingMax = ref(100)
const findTeamLeaderRatingMin = ref(0)
const findSalesScoreMax = ref(100)
const findSalesScoreMin = ref(0)
const findTotalScoreMax = ref(100)
const findTalScoreMin = ref(0)
const findKpiEmployeeId = ref('')
const findKpiTeamLeaderId = ref('')

//開啟抽屜/視窗用屬性
const openKpiFindMore =ref(false)

//所有下拉選單選項 - 後續串接方法
const seasonStrDayOptions=[
    { value: "-01-01", label: 'Q1',},
    { value: "-04-01", label: 'Q2',},
    { value: "-07-01", label: 'Q3',},
    { value: "-10-01", label: 'Q4',}
]

const branchOptions=[
    { value: -1, label: '分店不拘', },
    { value: 1, label: '台北店', },
    { value: 2, label: '台中店', },
    { value: 3, label: '高雄店', }
]

const employeeTypeOptions=[
    { value: -1, label: '狀態不拘', },
    { value: 1, label: '在職', },
    { value: 0, label: '離職', }
]

const employeeIDOptions=[
    { value: 1, label: '職員1', },
    { value: 2, label: '職員2', },
    { value: 3, label: '職員3', },
    { value: 4, label: '職員4', },
    { value: 5, label: '職員5', }
]

const teamleaderIDOptions=[
    { value: 5, label: '主管5', }
]

//清除查詢
function cleanKpiFind() {
    findKpiYear.value='2024';
    findKpiSeasonStrDay.value='-07-01';
    findKpiEmployeeBranch.value=-1;
    findKpiEmployeeType.value=1;
    findKpiEmployeeId.value = '';
    findKpiTeamLeaderId.value = '';
    findTeamLeaderRatingMax.value = 100;
    findTeamLeaderRatingMin.value = 0;
    findSalesScoreMax.value = 100;
    findSalesScoreMin.value = 0;
    findTotalScoreMax.value = 100;
    findTalScoreMin.value = 0;
    findKpiSeasonStrDayDuring.value=[null,null];
}

//多筆查詢
function callKpiFindByHQL(doCreat) {
    
}
</script>
    
<style scoped>
    .btn-close{
    margin: 10px;
}


.btm-div:hover{
    text-decoration:underline 2px solid #a33238;
}

.text-btm{
    font-size: 1.2em ;
    font-weight: 900;
}

.table-td{
    font-size: 0.8em ;
}

.table-th{
    color: #a33238;
}

div.col-10{
    padding: 0px 0px;
    background-color: #fff5eb;
    justify-content: center; 
    display: flex;
}
th,tr,td{
    background-color: unset;
    width: 100px;
}
.table-part{
    width: 95%;
    padding: 20px;
}
.table{
    width: 95%;
    margin: auto;
    padding: 10px 10px;
}

.extra-menu{
    width: 5%;
    background-color: #a33238;

}

.table-title{
    float: right;
    color: #a33238;
    font-weight: 900;
    margin: 10px 0px;
}

.msg-title{
    color: #a33238;
    font-weight: 900;
    margin: 10px 0px;
}

.creat-title{
    color: black;
    font-weight: 900;
    margin: 20px 20px;
}
</style>