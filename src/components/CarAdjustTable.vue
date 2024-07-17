<template>
<!-- https://getbootstrap.com/docs/5.2/content/tables/#table-group-dividers 表單部分 --> 
<!-- https://element-plus.org/zh-CN/component/config-provider.html  頁碼 -->

            <div class="col-1"></div>
<!-- 多選下拉選單(簡易搜尋) -->
            <div class="col-5" style="padding: 0px 0px;"></div>

<!-- 抬頭 -->
            <div class="col-5" style="padding: 0px 0px;">
                <h3 class="table-title">車輛調整簽核</h3>
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
                    <th scope="col" class="table-th" >簽核編號</th>
                    <th scope="col" class="table-th" >品牌 - 型號</th>
                    <th scope="col" class="table-th" >簽核需求</th>
                    <th scope="col" class="table-th" >建立時間</th>
                    <th scope="col" class="table-th" >建立者</th>
                    <th scope="col" class="table-th" >簽核狀態</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="item in items" :key="item.id"  @click="itemClick(item.id)">
                    <th scope="row" class="table-td">{{item.id}}</th>
                    <td class="table-td"></td>
                    <td class="table-td">{{item.approvalTypeName}} {{item.floatingAmount}}</td>
                    <td class="table-td">{{item.createTimeString}}</td>
                    <td class="table-td">{{item.employeeName}}</td>
                    <td class="table-td">{{item.approvalStatusName}}</td>
                    </tr>
                    
                </tbody>
                </table>
                <div>
                </div>
            </div>
            
        </div>
        <div class="col-1"></div>

        <div class="col-1"></div>
        <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
<!-- 新增用按鈕 -->
            <div class="btm-div" style="display: flex;" @click="openModal('insert')">
            <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;"/>
            <el-button type='' link class="text-btm" style="color: #a33238;">新增簽核</el-button>
            </div>
        </div>

        <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
<!-- 分頁區塊 -->
            <el-pagination
                style="margin: 10px 0px;"
                hide-on-single-page=true
                layout="total,prev, pager, next"
                :total="total"
                :page-size="rows"
                v-model:current-page="current"
                @change="callFindByHQL"
            ></el-pagination>
            

            </div>
        <div class="col-1"></div>

<!-- 新增區塊 / 抬頭-->
            <div v-if="openCreat" style="height: 50px;"></div>
            <div v-if="openCreat" class="col-1"></div>
            <div v-if="openCreat" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="openCreat=false">
                <el-divider content-position="center">
                    <button type="button" class="btn-close" aria-label="Close" ></button>
                    <h5 class="table-title" >新增簽核</h5>
                </el-divider>
            </div>
            <div v-if="openCreat" class="col-1"></div>

<!-- 新增區塊 / 資料區-->
            <div v-if="openCreat" class="col-1" ></div>
            <div v-if="openCreat" class="col-5" style="height: 250px; background-color:rgb(245, 250, 250)  ;">

                <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
                <el-form-item label="申請員工 :&nbsp;">
                    <p style="margin: 0;" >串接登入員工</p>
                </el-form-item>

                <el-divider border-style="dashed" style="margin: 0;"/>
                <el-form-item label="簽核主管 :&nbsp;">
                    <el-select
                        v-model="creatTeamleaderIDValue"
                        placeholder="Select"
                        size="small"
                        >
                        <el-option
                            v-for="Option in creatTeamleaderIDOptions"
                            :key="Option.value"
                            :label="Option.label"
                            :value="Option.value"
                        />
                    </el-select>
                </el-form-item>
                <el-divider border-style="dashed" style="margin: 0;"/>

                <el-form-item label="修改車輛 :&nbsp;">
                <el-input-number
                    v-model="creatCarIDValue"
                    :min="1"
                    :max="10"
                    size="small"
                    controls-position="right"
                />
                </el-form-item>
                <el-divider border-style="dashed" style="margin: 0;"/>

                <el-form-item label="改後價格 :&nbsp;">
                <el-input-number
                    v-model="creatFloatingAmountValue"
                    :min="1000"
                    :max="100000000000000000"
                    size="small"
                    controls-position="right"
                />
                </el-form-item>

                </el-form>
            </div>

            <div v-if="openCreat" class="col-5" style="height: 250px; background-color:rgb(245, 250, 250)  ;">

                <el-form :model="form" label-width="auto" style="width: 95%; padding: 25px;">
                <el-form-item label="&nbsp;">
                    <p style="margin: 0;" >&nbsp;</p>
                </el-form-item>
                <el-divider border-style="dashed" style="margin: 0;"/>

                <el-form-item label="&nbsp;">
                    <p style="margin: 0;" >&nbsp;</p>
                </el-form-item>
                <el-divider border-style="dashed" style="margin: 0;"/>

                <el-form-item label="簽核狀態 :&nbsp;">
                    <p style="margin: 0;" >尚未簽核</p>
                </el-form-item>
                <el-divider border-style="dashed" style="margin: 0;"/>

                <el-form-item label="簽核需求 :&nbsp;">
                    <el-select
                        v-model="creatApprovalTypeValue"
                        placeholder="Select"
                        size="small"
                        >
                        <el-option
                            v-for="Option in creatApprovalTypeOptions"
                            :key="Option.value"
                            :label="Option.label"
                            :value="Option.value"
                        />
                    </el-select>
                </el-form-item>

                </el-form>
                </div>
            <div v-if="openCreat" class="col-1"></div>


<!-- 新增區塊 / 確認按鈕-->
            <div v-if="openCreat" class="col-1"></div>
            <div v-if="openCreat" class="col-5" style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-start;"></div>
            <div v-if="openCreat" class="col-5" style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
                <el-button color="#a33238" :dark="isDark" style="margin: 20 0;" @click = "creatDdialogVisible=true" >&nbsp確認新增&nbsp</el-button>
            </div>
            <div v-if="openCreat" class="col-1"></div>


<!-- 下方詳細資料區 / 抬頭-->
            <div v-if="openZon" style="height: 50px;"></div>
            <div v-if="openZon" class="col-1"></div>
            <div v-if="openZon" class="col-10" style="padding: 0px 0px; background-color:unset;" @click="openZon=false">
                <el-divider content-position="center">
                    <button type="button" class="btn-close" aria-label="Close" ></button>
                    <h5 class="table-title" >簽核編號 {{singleItem.id}} --單筆詳細資料</h5>
                </el-divider>
            </div>
            <div v-if="openZon"class="col-1"></div>

<!-- 下方詳細資料區 / 資料區-->
            <div v-if="openZon" class="col-1" ></div>
            <div v-if="openZon" class="col-10" style="height: 250px; background-color:rgb(245, 250, 250)  ;">

                <div class="table-responsive" style="padding:20px ;height: 250px; ">
                <table class="table" style="width: 1000px; ">
                    <thead style="border-bottom: 2px solid #a33238;">
                    <tr>
                    <th scope="col" class="table-th" >簽核編號</th> 
                    <th scope="col" class="table-th" >車輛編號</th>
                    <th scope="col" class="table-th" >品牌型號</th>
                    <th scope="col" class="table-th" >品牌型號</th>
                    <th scope="col" class="table-th" >簽核需求</th>
                    <th scope="col" class="table-th" >原始價錢</th>
                    <th scope="col" class="table-th" >改後價錢</th>
                    </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-if="!isModify">
                        <th scope="row" class="table-td" name="id" >{{ singleItem.id }}</th>
                        <td class="table-td">{{singleItem.carId}}</td>
                        <td class="table-td"></td>
                        <td class="table-td"></td>
                        <td class="table-td">{{singleItem.approvalTypeName}}</td>
                        <td class="table-td"></td>
                        <td class="table-td">{{singleItem.floatingAmount}}</td>
                        </tr>
                        <tr v-if="isModify">
                        <th scope="row" class="table-td" name="id" :value="singleItem.id">{{ singleItem.id }}</th>
                        <td class="table-td">{{singleItem.carId}}</td>
                        <td class="table-td"></td>
                        <td class="table-td"></td>
                        <td class="table-td">{{singleItem.approvalTypeName}}</td>
                        <td class="table-td"></td>
                        <td class="table-td">{{singleItem.floatingAmount}}</td>
                        </tr>
                        
                    </tbody>
                    <div style="height: 20px;"></div>
                    <thead style="border-bottom: 2px solid #a33238;" >
                        <tr >
                        <th scope="col" class="table-th" >建立者編號</th>
                        <th scope="col" class="table-th" >建立者</th>
                        <th scope="col" class="table-th" >主管編號</th>
                        <th scope="col" class="table-th" >主管姓名</th>
                        <th scope="col" class="table-th" >建立時間</th>
                        <th scope="col" class="table-th" >修改時間</th>
                        <th scope="col" class="table-th" >簽核狀態</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-if="!isModify" >
                            <th scope="row" class="table-td"></th>
                            <td class="table-td">{{singleItem.employeeName}}</td>
                        <td class="table-td"></td>
                        <td class="table-td">{{singleItem.teamLeaderName}}</td>
                        <td class="table-td">{{singleItem.createTimeString}}</td>
                        <td class="table-td">{{singleItem.updateTimeString}}</td>
                        <td class="table-td">{{singleItem.approvalStatusName}}</td>
                        </tr>

                        <tr v-if="isModify" >
                            <th scope="row" class="table-td"></th>
                            <td class="table-td">{{singleItem.employeeName}}</td>
                        <td class="table-td"></td>
                        <td class="table-td">{{singleItem.teamLeaderName}}</td>
                        <td class="table-td">{{singleItem.createTimeString}}</td>
                        <td class="table-td">{{singleItem.updateTimeString}}</td>
                        <td class="table-td" >
                            <el-select
                            v-model="approvalTypeValue"
                            placeholder="Select"
                            size="small"
                            style="width: 50%"
                            >
                            <el-option
                                v-for="Option in approvalTypeOptions"
                                :key="Option.value"
                                :label="Option.label"
                                :value="Option.value"
                            />
                            </el-select>
                        </td>
                        </tr>
                        
                    </tbody>
                </table>
                </div>

            </div>
            <div v-if="openZon" class="col-1"></div>

<!-- 下方詳細資料區 / 修改按鈕-->
            <div v-if="openZon" class="col-1"></div>
            <div v-if="openZon" class="col-5" style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-start;"></div>
            <div v-if="openZon" class="col-5" style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-end; ">
                <el-switch
                    v-model="isModify"
                    inline-prompt
                    class="value5"
                    size="large"
                    active-text="&nbsp;&nbsp;開啟修改&nbsp;&nbsp;"
                    inactive-text="&nbsp;&nbsp;資料鎖定&nbsp;&nbsp;"   
                    style="--el-switch-on-color: #a33238; -webkit-margin-start: 18px ;"
                    @click = "openDoModify"
                    />
            </div>
            <div v-if="openZon" class="col-1"></div>

<!-- 確認修改用彈出視窗 -->
    <el-dialog
        v-model="dialogVisible"
        width="350"
        :show-close="false"
    >
    <h5 class="msg-title" >確認修改 簽核編號 {{singleItem.id}} ?</h5>
        <template #footer>
        <div class="dialog-footer" style="display: flex;justify-content: center;">
            <el-button @click="dialogVisible = false;isModify = false;">取消修改</el-button>
            <el-button @click="dialogVisible = false;isModify = true">返回修改</el-button>
            <el-button type="primary" @click="doModify" color="#a33238" :dark="isDark">
            確認修改
            </el-button>
        </div>
        </template>
    </el-dialog>

<!-- 確認新增用彈出視窗 -->
<el-dialog
        v-model="creatDdialogVisible"
        width="350"
        :show-close="false"
    >
    <h5 class="msg-title" >確認新增 ?</h5>
        <template #footer>
        <div class="dialog-footer" style="display: flex;justify-content: center;">
            <div>
            <el-button @click="creatDdialogVisible=false">否</el-button>
            <el-button type="primary" @click="doCreat" style="background-color: #a33238;border: #a33238;">
            是
            </el-button>
        </div>
        </div>
        </template>
    </el-dialog>
            
</template>
    
<script setup >
import { onMounted,ref } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

//用於重新導向 router.push
const router = useRouter()

//分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(4) //分頁資料顯示筆數

//下方詳細資料開啟用
const openZon = ref(false)

//下方新增資料開啟用
const openCreat = ref(false)

//產品顯示products元件用的參數
const items = ref([]);
const singleItem= ref([])

//開啟修改用
const isModify = ref(false)

//修改簽核狀態選單
const approvalTypeValue = ref('1')
const approvalTypeOptions = [
    {
        value: '1',
        label: '簽核',
    },
    {
        value: '2',
        label: '拒絕',
    }
]

//確認修改彈出視窗用
const dialogVisible = ref(false)  //修改
const creatDdialogVisible =ref(false)  //新增


//新增用所有資料
const creatCarIDValue = ref("1")
const creatEmployeeIDValue = ref("1")
const creatTeamleaderIDValue = ref("5")
const creatApprovalStatusValue = ref("0")
const creatApprovalTypeValue = ref("1")
const creatFloatingAmountValue = ref("1000000")

const creatApprovalTypeOptions=[
    {
        value: '1',
        label: '降價',
    },
    {
        value: '2',
        label: '漲價',
    },
    {
        value: '3',
        label: '下架',
    }
]
const creatTeamleaderIDOptions=[
    {
        value: '5',
        label: '主管名 - emp5',
    }
]







onMounted(function () {
    callFindByHQL();
})


//單筆新增
function openModal(){
console.log("openModal");
openCreat.value=true;
}


//單筆查詢
function itemClick(itemId){
    console.log(itemId)
    axiosapi.get("/carAdjust/"+itemId).then(function (responce) {  //(AJAX前端程式)單筆查詢的Post功能()
        console.log("responce",responce.data);
        singleItem.value = responce.data.data;
        console.log("singleItem.value.id",singleItem.value.id);
        openZon.value = true
        isModify.value=false

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}


//多筆查詢
function callFindByHQL(){
    console.log("callFindByHQL - 當前頁碼:",current.value);

    let request ={ 
        "id":null,
        "teamLeaderId":null,
        "employeeId": null,
        "carId":null,
        "approvalStatus":null, 
        "approvalType":null,
        "floatingAmountMax":null, 
        "floatingAmountMin": null,
        "createTime": null,
        "updateTime":null,

        "isPage":current.value-1,
        "max":rows.value,
        "dir":false,
        "order":"createTime"
    }

    axiosapi.post("/carAdjust/findByHQL",request).then(function (responce) {  //(AJAX前端程式)多產品查詢的Post功能()
        items.value = responce.data.data;

        //計算分頁比數資訊
        total.value = responce.data.totalElement;
        pages.value = responce.data.totalPage;

        console.log("items",responce.data.data);
        console.log("total",responce.data.totalElement);
        console.log("responce",responce.data);
        // setTimeout(function () {
        //         Swal.close();  //視窗關閉 
        //     }, 500);

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}

//新增簽核
function doCreat() {
    creatDdialogVisible.value=false;
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });


    let request ={  
        "employeeId":creatEmployeeIDValue.value, 
        "teamLeaderId":creatTeamleaderIDValue.value, 
        "carId":creatCarIDValue.value,
        "approvalStatus":creatApprovalStatusValue.value, 
        "approvalType":creatApprovalTypeValue.value,
        "floatingAmount":creatFloatingAmountValue.value
    }

    axiosapi.post("/carAdjust", request).then(function(response) {
        console.log("response", response);
        if(response.data.success)  {
            callFindByHQL();
            Swal.fire({
                icon: "success",
                text: response.data.message,
                showConfirmButton: false,
            }).then(function(result) {
                
                console.log("新增的物件",items.value[0]);
                openCreat.value=false;
                itemClick(items.value[0].id);
                openZon.value=true;

            });
        } else {
            Swal.fire({
                icon: "warning",
                text: response.data.message,
            });
        }
    }).catch(function(error) {
        console.log("error", error);
        Swal.fire({
            icon: "error",
            text: "新增錯誤："+error.message,
        });
    });
    setTimeout(function () {
                    Swal.close();  //視窗關閉 
                }, 1000);
}

//開啟確認修改視窗
function openDoModify() {
    if (isModify.value==false) {
        console.log("isModify.value",isModify.value);
        console.log("修改單號 ID",singleItem.value.id);
        console.log("修改單號 ID",approvalTypeValue.value);
        isModify.value = true;
        dialogVisible.value=true; 
    }
}

//修改簽核
function doModify() {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    let request ={ 
        "id":singleItem.value.id, 
        "teamLeaderId":5,
        "employeeId":1,
        "carId":singleItem.value.carId,
        "approvalStatus":approvalTypeValue.value,
        "approvalType":1,
        "floatingAmount":singleItem.value.floatingAmount
    }

    axiosapi.put(`/carAdjust/${singleItem.value.id}`, request).then(function(response) {
        console.log("response", response);
        if(response.data.success)  {
            Swal.fire({
                icon: "success",
                text: response.data.message,
                showConfirmButton: false,
            }).then(function(result) {
                callFindByHQL();
                itemClick(singleItem.value.id);
                openZon.value=true;
                
            });
        } else {
            Swal.fire({
                icon: "warning",
                text: response.data.message,
            });
        }
    }).catch(function(error) {
        console.log("error", error);
        Swal.fire({
            icon: "error",
            text: "修改錯誤："+error.message,
        });
    });
    setTimeout(function () {
                    Swal.close();  //視窗關閉 
                }, 1000);
    dialogVisible.value = false;
    isModify.value = false;
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