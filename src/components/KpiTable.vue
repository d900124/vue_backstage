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
            value-format="YYYY"
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

    <div class="col-1"></div>
    <div class="col-10">
<!-- 彈出式複雜搜尋 -->
        <div class="extra-menu"></div>
<!-- 列表主體 -->
        <div class="table-part">
        <table class="table">
        <thead style="border-bottom: 2px solid #a33238;">
            <tr>
            <th scope="col" class="table-th" >員工姓名</th>
            <th scope="col" class="table-th" >年分 - 季度</th>
            <th scope="col" class="table-th" >考核均分</th>
            <th scope="col" class="table-th" >客戶評分</th>
            <th scope="col" class="table-th" >主管評分</th>
            <th scope="col" class="table-th" >主管姓名</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr v-for="item in items" :key="item.id"  @click="">
            <th scope="row" class="table-td">{{item.employeeName}}</th>
            <td class="table-td">{{item.seasonStrDayString.substring(0, 4)}} - {{item.seasonStrDayString.substring(5, 10)}}</td>
            <td class="table-td"><b style="color: red;font-weight: 900;">{{item.totalScore}}</b></td>
            <td class="table-td">{{item.salesScore}}</td>
            <td v-if="(!isKpiModify)|(item.teamLeaderId!=employeeInfo.id)" class="table-td">{{item.teamLeaderRating}}</td>
            <td v-if="(isKpiModify)&(item.teamLeaderId==employeeInfo.id)" class="table-td">
                <el-input-number
                    v-model="item.teamLeaderRating"
                    size="small"
                    controls-position="right"
                    style="width: 50%;height: 100%"
                    @change = "TeamLeaderRatingChange(item)"
                />
            </td>
            <td class="table-td">{{item.teamLeaderName}}</td>
            </tr>
            
        </tbody>
        </table>
        <div>
        </div>
    </div>
    
    </div>
    <div class="col-1"> </div>

    <div class="col-1"></div>
    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
<!-- KPI修改按鈕-->
        <div v-if="(findKpiYear=='2024')&&(findKpiSeasonStrDay=='-07-01')" class="col-5" style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-start; ">
        <el-switch
            v-if="employeeInfo.accountType==4"
            v-model="isKpiModify"
            inline-prompt
            class="value5"
            size="large"
            active-text="&nbsp;&nbsp;開啟修改&nbsp;&nbsp;"
            inactive-text="&nbsp;&nbsp;資料鎖定&nbsp;&nbsp;"   
            style="--el-switch-on-color: #a33238; ;"
            @click = "openDoKpiModify"
            />
        </div>
    </div>

    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; height: 50px;">
<!-- 分頁區塊 -->
        <el-pagination
            style="margin: 10px 0px;"
            hide-on-single-page=true
            layout="total,prev, pager, next"
            :total="total"
            :page-size="rows"
            v-model:current-page="current"
            @change="callKpiFindByHQL(false)"
        ></el-pagination>
        

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
                    @change = "current=1;callKpiFindByHQL(false)"
                    @click="kpiTableDoEmpFindAll"
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
                    @change = "current=1;callKpiFindByHQL(false)"
                    @click = "kpiTableDoTeamleaderFindAll"
                    >
                    <el-option
                        v-for="Option in teamleaderIDOptions"
                        :key="Option.id"
                        :label="Option.name"
                        :value="Option.id"
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
                v-model="findTotalScoreMin"
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

<!-- <div>
用户名:{{ employeeInfo.name || "" }} / 用户ID:{{ employeeInfo.id || "" }}  / 帳號:{{ employeeInfo.account || "" }} / 帳號分類:{{ employeeInfo.accountType || "" }}
</div> -->

</template>
    
<script setup >
import { computed, onMounted,ref } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";


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
const findTotalScoreMin = ref(0)
const findKpiEmployeeId = ref(null)
const findKpiTeamLeaderId = ref(null)

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

const employeeIDOptions=ref([
    // { value: 1, label: '職員1', },
    // { value: 2, label: '職員2', },
    // { value: 3, label: '職員3', },
    // { value: 4, label: '職員4', },
    // { value: 5, label: '職員5', }
])

const teamleaderIDOptions=ref([
    // { value: 5, label: '主管5', }
])

//分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(7) //分頁資料顯示筆數

//產品顯示products元件用的參數
const items = ref([]);
const singleItem= ref([])

//修改用屬性
const  isKpiModify = ref(false);

//登錄資訊用
const store = useStore();
const isAuthenticated = computed(() => store.state.isAuthenticated);
const employeeInfo = computed(() => store.state.employeeInfo.data || {});


//登錄資訊用 使用 async 和 await 來等待 Vuex action 完成並更新
const fetchEmployeeData = async () => {
  const username = localStorage.getItem("username");
  if (username) {
    await store.dispatch("fetchEmployeeInfo", username);
  }
};

onMounted(async () => {
    await fetchEmployeeData();
    if (employeeInfo.value.id) {
        console.log("employeeInfo",employeeInfo.value)
        callKpiFindByHQL(false);
    }else {
    console.warn('Employee info not loaded yet');
  }
})

//清除查詢
function cleanKpiFind() {
    findKpiYear.value='2024';
    findKpiSeasonStrDay.value='-07-01';
    findKpiEmployeeBranch.value=-1;
    findKpiEmployeeType.value=1;
    findKpiEmployeeId.value = null;
    findKpiTeamLeaderId.value = null;
    findTeamLeaderRatingMax.value = 100;
    findTeamLeaderRatingMin.value = 0;
    findSalesScoreMax.value = 100;
    findSalesScoreMin.value = 0;
    findTotalScoreMax.value = 100;
    findTotalScoreMin.value = 0;
    findKpiSeasonStrDayDuring.value=[null,null];
    callKpiFindByHQL(false);
}

//多筆查詢
function callKpiFindByHQL(doCreat) {
    let selectStrDay =null;
    let selectEndDay =null;

    const kpiYear = findKpiYear.value;
    const kpiSeasonStrDay = findKpiSeasonStrDay.value;
    const kpiSeasonStrDayDuring = findKpiSeasonStrDayDuring.value;

    console.log("findKpiYear", kpiYear);
    console.log("findKpiSeasonStrDay", kpiSeasonStrDay);
    console.log("findKpiSeasonStrDayDuring", kpiSeasonStrDayDuring);

    if (kpiSeasonStrDayDuring[0]!==null) {
        selectStrDay = kpiSeasonStrDayDuring[0];
        selectEndDay = kpiSeasonStrDayDuring[1];
    } else if (kpiYear !== null && kpiSeasonStrDay !== null){
        selectStrDay = `${kpiYear}${kpiSeasonStrDay}`;
        selectEndDay = `${kpiYear}${kpiSeasonStrDay}`;
    } else if (kpiYear !== null && kpiSeasonStrDay === null){
        selectStrDay = `${kpiYear}-01-01`;
        selectEndDay = `${kpiYear}-12-31`;
    }else if (kpiYear === null && kpiSeasonStrDay !== null){
        findKpiYear.value="2024";
        selectStrDay = `2024${kpiSeasonStrDay}`;
        selectEndDay = `2024${kpiSeasonStrDay}`;
    }else{
        selectStrDay = null;
        selectEndDay = null;
    }



    console.log("selectStrDay", selectStrDay);
    console.log("selectEndDay", selectEndDay);
    
    if (doCreat) {
        current.value=1
        cleanKpiFind();
    }

    console.log("callFindByHQL - 當前頁碼:",current.value);
    
    
    let employeeId = findKpiEmployeeId.value="" ? null : findKpiEmployeeId.value;
    let teamLeaderId = findKpiTeamLeaderId.value="" ? null : findKpiTeamLeaderId.value;
    let teamLeaderRatingMax = findTeamLeaderRatingMax.value="" ? 100 : findTeamLeaderRatingMax.value;
    let teamLeaderRatingMin = findTeamLeaderRatingMin.value="" ? 0 : findTeamLeaderRatingMin.value;
    let salesScoreMax = findSalesScoreMax.value="" ? 100 : findSalesScoreMax.value;
    let salesScoreMin = findSalesScoreMin.value="" ? 0 : findSalesScoreMin.value;
    let totalScoreMax = findTotalScoreMax.value="" ? 100 : findTotalScoreMax.value;
    let totalScoreMin = findTotalScoreMin.value="" ? 0 : findTotalScoreMin.value;
    let branchId = findKpiEmployeeBranch.value="" ? null : findKpiEmployeeBranch.value;
    if(findKpiEmployeeBranch.value==-1){branchId=null}

    let request ={ 
        "id":null,
        "selectStrDay":selectStrDay,
        "selectEndDay": selectEndDay,
        "employeeId":employeeId,
        "teamLeaderId":teamLeaderId, 
        "teamLeaderRatingMax":teamLeaderRatingMax,
        "teamLeaderRatingMin":teamLeaderRatingMin, 
        "salesScoreMax": salesScoreMax,
        "salesScoreMin":salesScoreMin, 
        "totalScoreMax":totalScoreMax,
        "totalScoreMin":totalScoreMin,
        "branchId":branchId,


        "isPage":current.value-1,
        "max":rows.value,
        "dir":false,
        "order":"createTime"
    }

    console.log("KPI request",request);

    axiosapi.post("/kpi/findByHQL",request).then(function (responce) {  //(AJAX前端程式)多產品查詢的Post功能()
        items.value = responce.data.data;

        //計算分頁比數資訊
        total.value = responce.data.totalElement;
        pages.value = responce.data.totalPage;

        console.log("items",responce.data.data);
        console.log("total",responce.data.totalElement);
        console.log("responce",responce.data);

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}

//KPI修改
function TeamLeaderRatingChange(item) {
    item.totalScore= (item.salesScore + item.teamLeaderRating)/2;
    console.log("Updated item:", item);

    let request ={ 
        "id":item.id, 
        "teamLeaderRating":item.teamLeaderRating,
        "salesScore":item.salesScore,
        "totalScore":item.totalScore
    }

    axiosapi.put(`/kpi/${item.id}`, request).then(function(response) {
        console.log("response", response);
        if(response.data.success)  {
            ElMessage({
                message: 'KPI修改成功',
                type: 'success',
            });
        } else {
            Swal.fire({
                icon: "warning",
                text: response.data.msg,
            });
        }
    }).catch(function(error) {
        console.log("error", error);
        ElMessage.error('修改錯誤'+error.message)
    });
}

//員工查詢全部製作下拉選單
function kpiTableDoEmpFindAll() {
    let empcount = 0;
    axiosapi.get("employee/count").then(function (responce){
        empcount=responce.data.data;
        console.log("empcount",empcount);
    })

    axiosapi.get("employee/all").then(function (responce) {  //(AJAX前端程式)單筆查詢的Post功能()
        console.log("employee/all responce",responce.data);
        employeeIDOptions.value=[];
        for(let i = 0;i<empcount;i++){
            employeeIDOptions.value.push({
                        value:responce.data.data[i].id,
                        label: responce.data.data[i].name})
        }
    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "員工查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}

//主管下拉選單
function kpiTableDoTeamleaderFindAll() {
    axiosapi.get("employee/teamLeaders").then(function (responce) {
        console.log("teamLeaders responce",responce.data);
        teamleaderIDOptions.value=responce.data.data;
}).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "主管查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
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