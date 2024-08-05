<template>
    <section>
        <div class="container text-center">
            <div class="row" style="border-bottom: #a33238 1px solid; padding-bottom: 10px;">
<!-- 登出圖釘 -->
                <Logout style="margin-bottom: 50px;"></Logout>

<!-- 賞車預約資訊 -->
                <div class="col-6" style="display: flex;justify-content: flex-start;">
                    
                    <font-awesome-icon 
                    :icon="['fas', 'circle-chevron-left']" 
                    style="margin-top :10px;"
                    size="2xl" 
                    class="backLogo" 
                    @click="backToCarMaintain()"/>
                <div style="margin-top: 10px;margin-left: 20px;">
                    <el-button type="primary" round @click="finishVKVisible=true" v-if="viewCarItem.viewCarStatus==1" color="#a33238" :dark="isDark">
                        完成賞車
                    </el-button>
                    <el-button type="primary" round @click="cancelVKVisible=true" v-if="viewCarItem.viewCarStatus==1" color="#a33238" :dark="isDark">
                        註銷賞車
                    </el-button>
                </div>
                </div>

                <div class="col-6" style="display: flex;justify-content: flex-end;">
                    <h5 style="margin-top: 15px;margin-right: 20px;" v-if="viewCarItem.viewCarStatus==0">(預約中)</h5>
                    <h5 style="margin-top: 15px;margin-right: 20px;" v-if="viewCarItem.viewCarStatus==1">(時間確定)</h5>
                    <h5 style="margin-top: 15px;margin-right: 20px;" v-if="viewCarItem.viewCarStatus==2">(完成賞車)</h5>
                    <h5 style="margin-top: 15px;margin-right: 20px;" v-if="viewCarItem.viewCarStatus==3">(已註銷)</h5>
                    <h1>賞車詳情</h1>
                </div>
                
            </div>

            <div class="row"  style="margin-top: 30px;border-bottom: #a33238 1px solid; padding-bottom: 10px;">
                <div class="col-6" style="justify-content: left;">
                    <div class="vcinfo"><h2>Car ID. {{ viewCarItem.car }}</h2></div>
                    <div class="vcinfo"><h2>{{ carItem.carinfoBrand }}&nbsp;&nbsp;-&nbsp;&nbsp;{{ carItem.carinfoModelName }}</h2></div>
                    <div class="vcinfo"><h2>{{ carItem.milage }} KM&nbsp;&nbsp;/&nbsp;&nbsp;{{ carItem.productionYear }}</h2></div>
                    

                </div>
                <div class="col-3" ></div>
                <div class="col-3" >
                    <div class="vcinfo"><h5>賞車編號.&nbsp;&nbsp;{{ viewCarItem.id }}</h5></div>
                    <div class="vcinfo"><h5>賞車日期.&nbsp;&nbsp;{{ viewCarItem.viewCarDate }}</h5></div>
                    <div class="vcinfo"><h5>賞車時間.&nbsp;&nbsp;{{ viewCarItem.viewTimeSection }}</h5></div>
                    <div class="vcinfo" v-if="employeeId"><h5>接待員工.&nbsp;&nbsp;{{ employeeItem.name }}</h5></div>
                    <div class="vcinfo" v-if="!employeeId"><h5>接待員工.&nbsp;&nbsp;尚未指派</h5></div>

                </div>
            </div>

            <div class="row"  style="margin-top: 30px; padding-bottom: 10px;">

                <div class="col-6" style="justify-content: left;">
                    <div class="vcinfo"><h2>Price&nbsp;&nbsp;NT$ {{ carItem.price }} -</h2></div>
                </div>
                <div class="col-3" ></div>
                <div class="col-3" style="display: flex; align-items: center;" >
                    <div class="vcinfo"><h5>最低議價.&nbsp;&nbsp;NT$ {{ negoPrice }} -</h5></div>
                </div>
            </div>

            <div class="row"  style="background-color:  #a33238 ; padding :40px;border-start-start-radius: 15px;border-start-end-radius: 15px;">
                <div class="col-6" style="justify-content: left;">
                    <div class="vcinfo" ><h2 style="color: #fff5eb;">Client.  </h2></div>
                    <div class="vcinfo" ><h2 style="color: #fff5eb;">{{ customerItem.name }} {{ sex }}</h2></div>
                </div>
                <div class="col-6" >
                    <div class="vcinfo" ><h5 style="color: #fff5eb;">Phone:&nbsp;&nbsp; {{ customerItem.phone }} -</h5></div>
                    <div class="vcinfo" ><h5 style="color: #fff5eb;">Email:&nbsp;&nbsp; {{ customerItem.email }} -</h5></div>
                    <div class="vcinfo" ><h5 style="color: #fff5eb;">Remark:&nbsp;&nbsp;{{ customerItem.remark }} -</h5></div>

                </div>
            </div>
        </div>

<!-- 這邊放車輛資訊 -->
<div class="container text-center">
  <div class="row" style="background-color:  #fff5eb ;border-end-end-radius: 15px;border-end-start-radius: 15px; margin-bottom: 5%;">
    <div class="col-12" style="padding: 0;">
        <div style="width: 100%;height: 80vh;overflow: hidden;">
            <img :src="`${path}${imgUrl}`" width="100%">
        </div>
    </div>
    <div class="row" style="padding :40px;">
        <div class="col-4" style="justify-content: left;border-right: #a33238 1px solid;">
            <div class="vcinfo"><h5>Car ID. {{ viewCarItem.car }}</h5></div>
            <div class="vcinfo"><h5>{{ carItem.carinfoBrand }}&nbsp;&nbsp;-&nbsp;&nbsp;{{ carItem.carinfoModelName }}</h5></div>
            <div class="vcinfo"><h5>{{ carItem.milage }} KM&nbsp;&nbsp;/&nbsp;&nbsp;{{ carItem.productionYear }}</h5></div>
        </div>
        <div class="col-4" style="justify-content: left;border-right: #a33238 1px solid;">
            <div class="vcinfo2"><p>車型： {{ carItem.carinfoSuspension }}</p></div>
            <div class="vcinfo2"><p>車門數量：{{ carItem.carinfoDoor }}</p></div>
            <div class="vcinfo2"><p>乘客數：{{ carItem.carinfoPassenger }}</p></div>
            <div class="vcinfo2"><p>驅動方式：{{ carItem.carinfoRearWheel }}</p></div>
            <div class="vcinfo2"><p>引擎燃料：{{ carItem.carinfoGasoline }}</p></div>
            <div class="vcinfo2"><p>變速系統：{{ carItem.carinfoTransmission }}</p></div>
        </div>
        <div class="col-4" >
            <div class="vcinfo2"><p>顏色： {{ carItem.color }}</p></div>
            <div class="vcinfo2"><p>排氣量：{{ carItem.carinfoBrand }}</p></div>
            <div class="vcinfo2"><p>馬力：{{ carItem.carinfoHp }}</p></div>
            <div class="vcinfo2"><p>扭力：{{ carItem.carinfoTorque }}</p></div>
            <div class="vcinfo2"><p>車況評分：{{ carItem.conditionScore }}</p></div>
            <div class="vcinfo2"><p>是否改裝：{{ carItem.remark }}</p></div>
        </div>
    </div>
</div>
</div>

<!-- 確認"完成"賞車用彈出視窗 -->
<el-dialog
        v-model="finishVKVisible"
        width="350"
        :show-close="false"
    >
    <h5 class="msg-title" >確認 "完成" 賞車 No.{{ viewCarItem.id }}?</h5>
        <template #footer> 
        <div class="dialog-footer" style="display: flex;justify-content: center;">
            <div>
            <el-button @click="finishVKVisible=false">否</el-button>
            <el-button type="primary" @click="finishVK" style="background-color: #a33238;border: #a33238;">
            是
            </el-button>
        </div>
        </div>
        </template>
    </el-dialog>

<!-- 確認"註銷"賞車用彈出視窗 -->
<el-dialog
        v-model="cancelVKVisible"
        width="350"
        :show-close="false"
    >
    <h5 class="msg-title" >確認 "註銷" 賞車 No.{{ viewCarItem.id }}?</h5>
        <template #footer> 
        <div class="dialog-footer" style="display: flex;justify-content: center;">
            <div>
            <el-button @click="cancelVKVisible=false">否</el-button>
            <el-button type="primary" @click="cancelVK" style="background-color: #a33238;border: #a33238;">
            是
            </el-button>
        </div>
        </div>
        </template>
    </el-dialog>
    </section>
</template>
    
<script setup >
import { computed, ref , onMounted} from 'vue';
import Logout from '@/components/Logout.vue';
import { useRoute,useRouter } from 'vue-router';
import { useStore } from "vuex";
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
//用於獲取資訊
const route = useRoute();

//用於重新導向 router.push
const router = useRouter()

//內容用的參數
const viewCarItem= ref([])
const customerItem= ref([])
const carItem= ref([])
const employeeItem= ref([])
const negoPrice= ref()
const sex= ref()

//車輛圖片用參數
const path = import.meta.env.VITE_PHOTO;
const imgUrl =ref([])

//賞車排程事件id
const oldAgandId = ref(null)

//確認視窗屬性
const finishVKVisible =ref(false)
const cancelVKVisible =ref(false)

const viewcarId = Number(route.query.viewcarId);  // 获取传递过来的viewcarId参数
const employeeId = Number(route.query.employeeId);  // 获取传递过来的employeeId参数
const assignedStatus = Number(route.query.assignedStatus);  // 获取传递过来的assignedStatus参数
const viewCarAssignedId = Number(route.query.viewCarAssignedId); // 获取传递过来的viewCarAssignedId参数

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
    callViewCarSelect();

})

//反回按鈕導向
function backToCarMaintain() {
    // router.push({ name: 'car-maintain-link' });
    router.go(-1);
    
}
    
//內容資訊查詢(單筆)
function callViewCarSelect() {
    //賞車
    axiosapi.get(`/front/viewCar/select/${viewcarId}`).then(function (responce) {  
        viewCarItem.value = responce.data.list[0];
        console.log("viewCarItem",viewCarItem.value);
        //車輛
        axiosapi.get(`/car/find/${viewCarItem.value.car}`).then(function (responce) {  
            carItem.value = responce.data.list[0];
            console.log("carItem",carItem.value);
            switch (carItem.value.negotiable) {
                case 1: negoPrice.value = carItem.value.price * 0.95;  break;
                case 2: negoPrice.value = carItem.value.price * 0.90; break;
                case 3: negoPrice.value = carItem.value.price * 0.85; break;
                case 4: negoPrice.value = carItem.value.price * 0.80; break;
                default:
                    break;
            }
        }).catch(function (error) {
            console.log("error",error);
            Swal.fire({
                    text: "查詢車輛錯誤"+error.message,
                    icon: "error"
                });
        })

        //客戶
        axiosapi.get(`/customer/info/${viewCarItem.value.customer}`).then(function (responce) {  
            customerItem.value = responce.data.data;
            console.log("customerItem",customerItem.value);
            switch (customerItem.value.sex) {
                case "f": sex.value = "先生";  break;
                case "m": sex.value = "小姐"; break;
                default:
                    break;
            }
        }).catch(function (error) {
            console.log("error",error);
            Swal.fire({
                    text: "查詢會員錯誤"+error.message,
                    icon: "error"
                });
        })

        if (employeeId!=null) {
            //員工
            axiosapi.get(`/employee/info/${employeeId}`).then(function (responce) {  
                employeeItem.value = responce.data.data;
                console.log("employeeItem",employeeItem.value);
            }).catch(function (error) {
                console.log("error",error);
                Swal.fire({
                        text: "查詢員工錯誤"+error.message,
                        icon: "error"
                    });
            })
        }

        //圖片
        axiosapi.get(`image/isListPic/${viewCarItem.value.car}`).then(function (responce) {
            imgUrl.value = responce.data.isListPic[0].imageId
            console.log("imgUrl",imgUrl.value);
        }).catch(function (error) {
            console.log("error",error);
            Swal.fire({
                    text: "查詢員工錯誤"+error.message,
                    icon: "error"
                });
        })

        //排程
        getOldVHAgandaInfo(viewCarItem.value.viewCarDate,viewCarItem.value.viewTimeSection,employeeId);

    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢賞車錯誤"+error.message,
                icon: "error"
            });
    }) 
}
    
function finishVK() {
    //修改賞車狀態
    let viewcarRQ ={
        
        "viewCarStatus": 2, // 0:預約中，1:時間確定，2:完成賞車，3:註銷
        "id": viewCarItem.value.id,
        "carId": viewCarItem.value.car,
        "salesScore":viewCarItem.value.salesScore,
        "factoryScore":viewCarItem.value.factoryScore,
        "carScore":viewCarItem.value.carScore,
        "deal":viewCarItem.value.deal,
        "customerId": viewCarItem.value.customer,
        "viewCarDate": viewCarItem.value.viewCarDate,
        "viewTimeSection": viewCarItem.value.viewTimeSectionNb 
    }
    console.log("viewCarItem.value",viewCarItem.value);
    axiosapi.put(`/front/viewCar/update/${viewCarItem.value.id}`, viewcarRQ).then(function(VCupdate) {
        console.log("VCupdate", VCupdate.data);
        if (VCupdate.data.success) {
            Swal.fire({
					icon: 'success',
					title: '賞車已完成',
					showConfirmButton: false, // 隐藏确认按钮
					timer: 1000, 
					
				})
            //重新整理
            finishVKVisible.value=false
            callViewCarSelect();
        }else{console.log("修改失敗");}
    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
            text: `修改ViewCarId狀態-${viewCarItem.value.id}錯誤`+error.message,
            icon: "error"
        });
    })
}

function cancelVK() {
    //修改賞車狀態
    let viewcarRQ ={
        
        "viewCarStatus": 3, // 0:預約中，1:時間確定，2:完成賞車，3:註銷
        "id": viewCarItem.value.id,
        "carId": viewCarItem.value.car,
        "salesScore":viewCarItem.value.salesScore,
        "factoryScore":viewCarItem.value.factoryScore,
        "carScore":viewCarItem.value.carScore,
        "deal":viewCarItem.value.deal,
        "customerId": viewCarItem.value.customer,
        "viewCarDate": viewCarItem.value.viewCarDate,
        "viewTimeSection": viewCarItem.value.viewTimeSectionNb 
    }
    console.log("viewCarItem.value",viewCarItem.value);
    axiosapi.put(`/front/viewCar/update/${viewCarItem.value.id}`, viewcarRQ).then(function(VCupdate) {
        console.log("VCupdate", VCupdate.data);
        if (VCupdate.data.success) {
            // Swal.fire({
			// 		icon: 'success',
			// 		title: '賞車已註銷',
			// 		showConfirmButton: false, // 隐藏确认按钮
			// 		timer: 1000, 
			// 	})
            
                //刪除原有賞車行程
                axiosapi.delete(`/agenda/${oldAgandId.value}`).then(function(response1) {
                    console.log("response1", response1);
                    if(response1.data.success)  {

                        //註銷原有指派單
                        let requestVCA ={ 
                            "id":viewCarAssignedId, 
                            "assignedStatus":2
                        }
                        axiosapi.put(`/viewCarAssigned/${viewCarAssignedId}`, requestVCA).then(function(response2) {
                            console.log("response2", response2);
                            Swal.fire({
                                icon: "success",
                                title: '賞車行程已註銷',
                                showConfirmButton: false,
                                timer: 1000, 
                            }); 
                            cancelVKVisible.value=false

                        }).catch(function(error) {
                            console.log("error", error);
                            ElMessage.error('指派錯誤'+error.message)
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            text: response.data.msg,
                            showConfirmButton: false,
                        });
                        setTimeout(function () {
                                Swal.close();  //視窗關閉 
                            }, 1000); 
                    }
                }).catch(function(error) {
                    console.log("error", error);
                    Swal.fire({
                        icon: "error",
                        text: "刪除錯誤："+error.message,
                        showConfirmButton: false,
                    });
                    setTimeout(function () {
                                Swal.close();  //視窗關閉 
                            }, 1000); 
                });

            //重新整理
            callViewCarSelect();
        }else{console.log("修改失敗");}
    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
            text: `修改ViewCarId狀態-${viewCarItem.value.id}錯誤`+error.message,
            icon: "error"
        });
    })
}

//取得empID排程資料
function getOldVHAgandaInfo(date,time,empId) {
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

h1,h2,h5 {
    color: #a33238;
    font-weight: 900;
}

p {
    color: #a33238;
    font-weight: 900;
    margin-bottom: 3px;
}

.backLogo{
    color: #a33238;
}

.backLogo:hover{
    color: #5f1a1e;
}

.vcinfo{
    display: flex;
    justify-self: flex-start;
    margin-bottom: 10px;

}

.vcinfo2{
    display: flex;
    justify-self: flex-end;
}
</style>