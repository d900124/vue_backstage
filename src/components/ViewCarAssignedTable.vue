<template>
    <div class="col-1">&nbsp;</div>
    <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;"></div>
<!-- 抬頭 -->
    <div class="col-2" style="padding: 0px 0px;">
        <h3 class="table-title" id="viewCarAssigned">賞車詳請</h3>
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
            <th scope="col" class="table-th" >單號</th>
            <th scope="col" class="table-th" >狀態</th>
            <th scope="col" class="table-th" >品牌 - 車型</th>
            <th scope="col" class="table-th" >日期</th>
            <th scope="col" class="table-th" >時段</th>
            <th scope="col" class="table-th" >客戶名稱</th>
            <th scope="col" class="table-th" >銷售</th>
            <th scope="col" class="table-th" >是否排單</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr v-for="item in items" :key="item.id"  @click="">
            <th scope="row" class="table-td">{{item.id}}</th>
            <td class="table-td">{{item.viewCarStatusName}}</td>
            <td class="table-td">{{item.branch}} - {{item.modelName}}</td>
            <td class="table-td">{{item.viewCarDate}}</td>
            <td class="table-td">{{item.viewTimeSection}}</td>
            <td class="table-td">{{item.customerName}}</td>
            <td v-if="!isVKAModify" class="table-td">{{item.employeeName}}</td>
            <td v-if="isVKAModify" class="table-td">
                <el-select
                        v-model="item.employeeId"
                        placeholder="指派員工"
                        size="small"
                        style="width: 100%;height: 100%"
                        @click="vcaTableDoEmpFindAll2(item.viewCarDate,item.viewTimeSection);getOldAgandaInfo(item.viewCarDate,item.viewTimeSection,item.employeeId)"
                        @change = "logoutAndCreateVCA(item.viewCarAssignedId,item.employeeId,item.id,item.viewCarDate,item.viewTimeSection,item);"
                        >
                        <el-option
                            v-for="Option in employeeIDOptions"
                            :key="Option.value"
                            :label="Option.label"
                            :value="Option.value"
                            
                        />
                    </el-select>
            </td>
            <td class="table-td">{{item.assignedStatusName}}</td>
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
<!-- 賞車排單修改按鈕-->
        <div class="col-5" style="padding: 10px 0px;background-color: unset;  display: flex; justify-content: flex-start; ">
        <el-switch
            v-if="employeeInfo.accountType==4"
            v-model="isVKAModify"
            inline-prompt
            class="value5"
            size="large"
            active-text="&nbsp;&nbsp;排程修改&nbsp;&nbsp;"
            inactive-text="&nbsp;&nbsp;排程鎖定&nbsp;&nbsp;"   
            style="--el-switch-on-color: #a33238; margin-right: 8px;"
            />
            <el-button color="#a33238" :dark="isDark" size="small" style="margin: 8px 0px;" @click = "vcaTableVisible=true;callViewAssignedFindByHQL(false)" round>&nbsp;賞車排程記錄&nbsp;</el-button>
        </div>

    </div>

    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; height: 50px;">
<!-- 分頁區塊 -->
        <el-pagination
            style="margin: 10px 0px;"
            hide-on-single-page=true
            layout="total,prev, pager, next"
            :total="total"
            :page-size=rows
            v-model:current-page="current"
            @change="callViewCarSelect(false)"
        ></el-pagination>
        

    </div>

<!-- 排程詳情 -->
<el-dialog v-model="vcaTableVisible" title="" width="800" draggable overflow>
    <div class="row">
    <div class="col-4" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;">
        <h4 class="table-title" style="float: left;margin-left:22px ;" id="ViewCarAssigned">賞車排程詳細記錄表</h4>
    </div>
    <div class="col-8" style="padding: 0px 20px;display: flex; justify-content: flex-end;align-items: center;">
        <el-select
            v-model="findAssignedStatus"
            clearable
            placeholder="指派狀態"
            size="small"
            style="width: 110px;margin-right: 20px;"
            @change = "vcacurrent=1;callViewAssignedFindByHQL(false)"
            >
            <el-option
                v-for="Option in assignedStatusOptions"
                :key="Option.value"
                :label="Option.label"
                :value="Option.value"
                
            />
        </el-select>
        <el-select
            v-model="findTeamLeaderId"
            clearable
            placeholder="派單主管"
            size="small"
            style="width: 110px;margin-right: 20px;"
            @change = "vcacurrent=1;callViewAssignedFindByHQL(false)"
            @click = "vcaTableDoTeamleaderFindAll"
            >
            <el-option
                v-for="Option in teamleaderIDOptions"
                :key="Option.id"
                :label="Option.name"
                :value="Option.id"
            />
        </el-select>
        <el-select
            v-model="findEmployeeId"
            clearable
            placeholder="賞車銷售"
            size="small"
            style="width: 110px;margin-right: 20px;"
            @change = "vcacurrent=1;callViewAssignedFindByHQL(false)"
            @click="vcaTableDoEmpFindAll"
            >
            <el-option
                v-for="Option in employeeIDOptions"
                :key="Option.value"
                :label="Option.label"
                :value="Option.value"
                
            />
        </el-select>
        <el-input-number
            clearable
            v-model="findViewCarId"
            placeholder="賞車單號"
            size="small"
            controls-position="right"
            style="width: 110px;"
            @change = "vcacurrent=1;callViewAssignedFindByHQL(false)"
        />
    </div>
    </div>
    <el-table :data="vcaitems">
      <el-table-column property="assignedStatusName" label="指派狀態" width="150"/>
      <el-table-column property="viewCarId" label="賞車單號" width="150"/>
      <el-table-column property="employeeName" label="賞車銷售" width="150" />
      <el-table-column property="teamLeaderName" label="派單主管" width="150" />
      <el-table-column property="updateTimeString" label="修改時間" />
    </el-table>

    <div class="row">
        <div class="col-1"></div>
            <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
            </div>

            <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end; height: 50px;">
<!-- 分頁區塊 -->
                <el-pagination
                    style="margin: 10px 0px;"
                    hide-on-single-page=true
                    layout="total,prev, pager, next"
                    :total="vcatotal"
                    :page-size="vcarows"
                    v-model:current-page="vcacurrent"
                    @change="callViewAssignedFindByHQL(false)"
                ></el-pagination>
                

                </div>
            <div class="col-1"></div>
    </div>
  </el-dialog>
<div class="col-1"></div>

<!-- <div>
用户名:{{ employeeInfo.name || "" }} / 用户ID:{{ employeeInfo.id || "" }}  / 帳號:{{ employeeInfo.account || "" }} / 帳號分類:{{ employeeInfo.accountType || "" }}
</div> -->

</template>
    
<script setup>
import {computed, onMounted,ref } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";


//用於重新導向 router.push
const router = useRouter()

//賞車分頁用參數
const total = ref(0) //總比數
const current = ref(1) //目前頁碼
const pages = ref(0) //分頁總數
const rows = ref(7) //分頁資料顯示筆數 

//賞車顯示元件用的參數
const items = ref([]);
const singleItem= ref([])


//分頁用參數
const vcatotal = ref(0) //總比數
const vcacurrent = ref(1) //目前頁碼
const vcapages = ref(0) //分頁總數
const vcarows = ref(5) //分頁資料顯示筆數 

//賞車排程顯示元件
const vcaitems = ref([]);
const vcasingleItem= ref([])

//排程用多條件查詢
const findAssignedStatus  = ref(null);
const findTeamLeaderId  = ref(null);
const findEmployeeId  = ref(null);
const findViewCarId  = ref(null);


//修改賞車排業務用
const isVKAModify = ref(false)

//排業務串接Aganga
const oldAgandId =ref(null)

//下拉選單用屬性
const employeeIDOptions=ref([])
const teamleaderIDOptions=ref([])
const assignedStatusOptions=ref([
    {value:0,label:"未指派"},{value:1,label:"已指派"},{value:2,label:"已註銷"}
])

//彈出視窗/抽屜
const vcaTableVisible = ref(false)

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
        callViewCarSelect(false);
    }else {
    console.warn('Employee info not loaded yet');
  }
})

//賞車查詢
function callViewCarSelect(doCreat) {

    if (doCreat) {
        current.value=1
        cleanViewCarFind();
    }
    console.log("getViewCar",`/front/viewCar/selectAll?pageNumber=${current.value}&max=${rows.value}`)
    axiosapi.get(`/front/viewCar/selectAll?pageNumber=${current.value}&max=${rows.value}`).then(function (responce) {  
        items.value = responce.data.list;
        // items.value[0].dddd = "測試"

        //計算分頁比數資訊
        total.value = responce.data.totalElements;
        pages.value = responce.data.totalPage;

        console.log("items",responce.data.list);
        console.log("total",responce.data.totalElements);
        console.log("responce",responce.data);
        console.log("length",responce.data.list.length);//本頁數量
        for (const vcInfo of items.value){
            switch (vcInfo.viewCarStatus) {
                case 0:
                vcInfo.viewCarStatusName="預約中"
                    break;
                case 1:
                vcInfo.viewCarStatusName="時間確定"
                    break;
                case 2:
                vcInfo.viewCarStatusName="完成賞車"
                    break;
                case 3:
                vcInfo.viewCarStatusName="註銷"
                    break;
                default:
                    vcInfo.viewCarStatusName="??"     
                    break; 
            }

            let request ={
                "viewCarId":vcInfo.id,
                "isPage":0,
                "max":999,
                "dir":false,
                "order":"updateTime"  
            }
            axiosapi.post("/viewCarAssigned/findByHQL",request).then(function (responce) {
                console.log(responce.data.data);
                if (responce.data.data.length==0) {
                    console.log("no單");
                    vcInfo.viewCarAssignedId=-10
                    vcInfo.employeeId=null
                    vcInfo.employeeName="--"
                    vcInfo.assignedStatus=-1
                    vcInfo.assignedStatusName="未指派"
                }else{
                    vcInfo.viewCarAssignedId=responce.data.data[0].id
                    vcInfo.employeeId=responce.data.data[0].employeeId
                    vcInfo.employeeName=responce.data.data[0].employeeName
                    vcInfo.assignedStatus=responce.data.data[0].assignedStatus
                    vcInfo.assignedStatusName=responce.data.data[0].assignedStatusName
                }
            }).catch(function (error) {
                console.log("error",error);
                Swal.fire({
                        text: "查詢錯誤"+error.message,
                        icon: "error"
                    });
            }) 
        }

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢賞車錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}

//賞排程查詢
function callViewAssignedFindByHQL(doCreat){
    let employeeId = findEmployeeId.value="" ? null : findEmployeeId.value;
    let teamLeaderId = findTeamLeaderId.value="" ? null : findTeamLeaderId.value;
    let viewCarId = findViewCarId.value="" ? null : findViewCarId.value;
    let assignedStatus = findAssignedStatus.value="" ? null : findAssignedStatus.value;

    let request ={
        "id":null, 
        "viewCarDateStr":null, 
        "viewCarDateEnd":null, 
        "employeeId":employeeId, 
        "teamLeaderId":teamLeaderId, 
        "viewCarId":viewCarId, 
        "carId":null,
        "carinfoId":null, 
        "suspensionid":null, 
        "assignedStatus":assignedStatus,

        "isPage":vcacurrent.value-1,
        "max":vcarows.value,
        "dir":false,
        "order":"updateTime"  
    }
    console.log("request",request);

    axiosapi.post("/viewCarAssigned/findByHQL",request).then(function (responce) {
        vcaitems.value = responce.data.data;
        vcatotal.value=responce.data.totalElement;
        console.log("vcaitems",responce.data.data);
        console.log("vcatotal",responce.data.totalElement);
        console.log("vcaresponce",responce.data);
    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}

//員工查詢全部製作下拉選單
function vcaTableDoEmpFindAll() {
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

//員工查詢全部製作下拉選單(外加時段判斷)(判斷時段沒事才出選單)
function vcaTableDoEmpFindAll2(date,time) {
    let empcount = 0;
    axiosapi.get("employee/count").then(function (responce){
        empcount=responce.data.data;
        console.log("empcount",empcount);
    })

    axiosapi.get("employee/all").then(function (responce) {  //(AJAX前端程式)單筆查詢的Post功能()
        console.log("employee/all responce",responce.data);
        const times = time.split('-');
        let ckeckavailableTimeStr = `${date} ${times[0]}`;
        let ckeckavailableTimeEnd = `${date} ${times[1]}`;
        console.log("ckeckavailableTimeStr",ckeckavailableTimeStr);
        console.log("ckeckavailableTimeEnd",ckeckavailableTimeEnd);
        employeeIDOptions.value=[];
        for(let i = 0;i<empcount;i++){
            let idTimerequest={
                // 查詢中間時間點是否有排程
                "ckeckavailableTimeStr":ckeckavailableTimeStr,
                "ckeckavailableTimeEnd":ckeckavailableTimeEnd,
                "employeeId":responce.data.data[i].id,

                "isPage":0,
                "max":99999,
                "dir":true,
                "order":"id"
            }
            console.log("idTimerequest",idTimerequest);
            axiosapi.post("/agenda/findByHQL",idTimerequest).then(function (rptime) {
                console.log("time / ID",responce.data.data[i].id);
                console.log("time / totalElement",rptime.data.totalElement);
                if (rptime.data.totalElement==0) {
                    employeeIDOptions.value.push({
                        value:responce.data.data[i].id,
                        label: responce.data.data[i].name})
                }
            }).catch(function (error) {
                console.log("error",error);
                Swal.fire({
                    text: "查詢錯誤"+error.message,
                    icon: "error"
                });
                
            }) 

            
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
function vcaTableDoTeamleaderFindAll() {
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

//指派(註銷同時新增)
function logoutAndCreateVCA(OldViewCarAssignedId,ViewCarSelseId,ViewCarId,date,time,item){
    console.log("OldViewCarAssignedId",OldViewCarAssignedId);    
    console.log("ViewCarSelseId",ViewCarSelseId);  
    console.log("ViewCarId",ViewCarId);      

    //註銷的修改
    let request ={ 
        "id":OldViewCarAssignedId, 
        "assignedStatus":2
    }

    //原先有單的情況(OldViewCarAssignedId != -10)
    if (OldViewCarAssignedId != -10) {
        axiosapi.put(`/viewCarAssigned/${OldViewCarAssignedId}`, request).then(function(response) {
            console.log("response", response);
            if(response.data.success)  {
                // ElMessage({
                //         message: '賞車指派中',
                //         type: 'success',
                //     })
                let requestCreate ={ 
                        "teamLeaderId":employeeInfo.value.id, 
                        "employeeId":ViewCarSelseId,
                        "viewCarId":ViewCarId,
                        "assignedStatus":1
                }  
                axiosapi.post("/viewCarAssigned", requestCreate).then(function(response) {  
                    console.log("responseCreate", response);
                    if(response.data.success)  {
                        //新建排程Aganda(如果有舊排程則刪)
                        if (oldAgandId.value!=null) {
                            axiosapi.delete(`/agenda/${oldAgandId.value}`).then(function(responseDeleteOldAgandId) {
                                console.log("responseDeleteOldAgandId", responseDeleteOldAgandId);
                                if(response.data.success)  {
                                    ElMessage({
                                    message: '排程刪除成功',
                                    type: 'success',
                                })
                                } else {
                                    ElMessage({
                                        message: response.data.msg,
                                        type: 'warning',
                                    })
                                }
                            }).catch(function(error) {
                                console.log("error", error);
                                ElMessage.error('刪除排程錯誤'+error.message)
                            });
                        }

                        //新建排程Aganda
                        const times = time.split('-');
                        let unavailableTimeStr = `${date} ${times[0]}`;
                        let unavailableTimeEnd = `${date} ${times[1]}`;

                        let newAgandaReQuest ={
                            "employeeId": ViewCarSelseId,
                            "businessPurpose":`賞車No.${ViewCarId} , 車輛No.${item.car} , 型號 : ${item.modelName} , 客戶 : ${item.customerName}`,
                            "unavailableTimeStr":unavailableTimeStr,
                            "unavailableTimeEnd":unavailableTimeEnd,
                            "unavailableStatus":2
                        }
                        console.log("newAgandaReQuest", newAgandaReQuest);
                        axiosapi.post("/agenda", newAgandaReQuest).then(function(responseAGD) {
                            console.log("responseAGD", responseAGD);
                            if(response.data.success)  {
                                ElMessage({
                                    message: '排程成功建立',
                                    type: 'success',
                                })
                            } else {
                                ElMessage({
                                    message: response.data.msg,
                                    type: 'warning',
                                })
                            }
                        }).catch(function(error) {
                            console.log("error", error);
                            ElMessage.error('排程錯誤'+error.message)
                        });


                        ElMessage({
                            message: '賞車指派成功',
                            type: 'success',
                        })
                        callViewCarSelect(false);

                    }else{
                        ElMessage({
                            message: response.data.msg,
                            type: 'warning',
                        })
                    }
                }).catch(function(error) {
                    console.log("error", error);
                    ElMessage.error('指派錯誤'+error.message)
                });
            }else{
                ElMessage({
                    message: response.data.msg,
                    type: 'warning',
                })
            }
        }).catch(function(error) {
            console.log("error", error);
            ElMessage.error('指派錯誤'+error.message)
        });
    
    //原先沒有有單的情況
    }else if(OldViewCarAssignedId == -10){
        let requestCreate ={ 
                        "teamLeaderId":employeeInfo.value.id,
                        "employeeId":ViewCarSelseId,
                        "viewCarId":ViewCarId,
                        "assignedStatus":1
                }  
                axiosapi.post("/viewCarAssigned", requestCreate).then(function(response) {  
                    console.log("responseCreate", response);
                    if(response.data.success)  {
                        //新建排程Aganda
                        if (oldAgandId.value==null) {
                            const times = time.split('-');
                            let unavailableTimeStr = `${date} ${times[0]}`;
                            let unavailableTimeEnd = `${date} ${times[1]}`;

                            let newAgandaReQuest ={
                                "employeeId": ViewCarSelseId,
                                "businessPurpose":`賞車No.${ViewCarId} , 車輛No.${item.car} , 型號 : ${item.modelName} , 客戶 : ${item.customerName}`,
                                "unavailableTimeStr":unavailableTimeStr,
                                "unavailableTimeEnd":unavailableTimeEnd,
                                "unavailableStatus":2
                            }
                            console.log("newAgandaReQuest", newAgandaReQuest);
                            axiosapi.post("/agenda", newAgandaReQuest).then(function(responseAGD) {
                                console.log("responseAGD", responseAGD);
                                if(response.data.success)  {
                                    ElMessage({
                                        message: '排程成功建立',
                                        type: 'success',
                                    })
                                } else {
                                    ElMessage({
                                        message: response.data.msg,
                                        type: 'warning',
                                    })
                                }
                            }).catch(function(error) {
                                console.log("error", error);
                                ElMessage.error('排程錯誤'+error.message)
                            });
                        }

                        ElMessage({
                            message: '賞車指派成功',
                            type: 'success',
                        })
                        callViewCarSelect(false);
                    }else{
                        ElMessage({
                            message: response.data.msg,
                            type: 'warning',
                        })
                    }
                }).catch(function(error) {
                    console.log("error", error);
                    ElMessage.error('指派錯誤'+error.message)
                });
    }
}

//取得點擊選擇框時的empID排程資料
function getOldAgandaInfo(date,time,empId) {
    const times = time.split('-');
    let ckeckavailableTimeStr = `${date} ${times[0]}`;
    let ckeckavailableTimeEnd = `${date} ${times[1]}`;
    console.log("ckeckavailableTimeStr",ckeckavailableTimeStr);
    console.log("ckeckavailableTimeEnd",ckeckavailableTimeEnd);

    let oldAgandarequest={
        "unavailableStatus":2,
        "ckeckavailableTimeStr":ckeckavailableTimeStr,
        "ckeckavailableTimeEnd":ckeckavailableTimeEnd,
        "employeeId":empId,

        "isPage":0,
        "max":99999,
        "dir":true,
        "order":"id"
    }
    console.log("oldAgandarequest",oldAgandarequest);
    axiosapi.post("/agenda/findByHQL",oldAgandarequest).then(function (rptime) {
        console.log("oldAgand / totalElement",rptime.data.totalElement);
        if (rptime.data.totalElement!=0) {
            //要將舊的日程記錄下來
            oldAgandId.value = rptime.data.data[0].id;
            console.log("oldAgand",rptime.data.data);
            console.log("oldAgandId有東西",oldAgandId.value);
        }else{
            oldAgandId.value =null;
            console.log("oldAgandId沒東西",oldAgandId.value);
        }
    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
            text: "查詢oldAgand錯誤"+error.message,
            icon: "error"
        });
        
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