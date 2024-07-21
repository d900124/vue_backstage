<template>
    <div class="col-1"></div>
<!-- 表頭、抬頭 -->
    <div class="col-5" style="padding: 0px 0px;display: flex; justify-content: space-between;align-items: center;">

        <h5 class="table-title" style="flex: 1; text-align: left;">
                {{ title }}
            </h5>
            <div style="margin-right:25%;">
                <el-button class="calendar-btm" size="small" color="#a33238" :dark="isDark"  @click="calendarprev">
                    <b><</b>
                </el-button>
                <el-button class="calendar-btm" size="small" color="#a33238" :dark="isDark"  @click="calendartoday">
                        <b>Today</b>
                </el-button>
                <el-button class="calendar-btm" size="small" color="#a33238" :dark="isDark" @click="calendarnext">
                    <b>></b>
                </el-button>
            </div>
    </div>    
    <div class="col-3" style="padding: 0px 0px;display: flex; justify-content:center;align-items: center;">
        
            <el-button-group>
            <el-button class="calendar-btm" size="small" color="#a33238" :dark="isDark"  @click="calendarmonth">
                <b>月表</b>
            </el-button>
            <el-button class="calendar-btm" size="small" color="#a33238" :dark="isDark"  @click="calendarweek">
                <b>周表</b>
            </el-button>
            <el-button class="calendar-btm" size="small" color="#a33238" :dark="isDark"  @click="calendarlist">
                <b>清單</b>
            </el-button>
        </el-button-group>
        <el-button-group>
            <el-button ref="next" size="small" color="#a33238" :dark="isDark" 
                    class="calendar-btm"
                    type="button"
                    @click="calendarsearch">
                    <b>查询</b>
            </el-button>
            <el-button class="calendar-btm" size="small" color="#a33238" :dark="isDark"  @click="toggleWeekends" >
                <b>有無六日</b>
                </el-button>
        </el-button-group>
    </div>
    <div class="col-2" style="padding: 0px 0px;">
        <h3 class="table-title" >工作排程</h3>
    </div>
    <div class="col-1"></div>

    <div class="col-1"></div>
    <div class="col-10">
<!-- 表身 -->
        <FullCalendar
            id="calendar"
            ref="fullCalendar"
            class="demo-app-calendar"
            :options="calendarOptions">
            
            <template v-slot:eventContent="arg">
<!-- 事件氣泡 -->
                <el-popover   
                    placement="bottom"
                    width="200"
                    popper-style="background-color: #fff5eb;
                                  box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;
                                  border:3px solid #ffffff;"
                    :visible-arrow="false"
                    trigger="hover">
                    <div style="display: flex; gap: 16px; flex-direction: column">
                        <div>
                            <p style="margin: 0; font-weight: 900" > 排程 No.{{ arg.event.id }}</p>
                            <p style="margin: 0; font-size: 12px; ">  {{ arg.event.title }}    -    {{ arg.event.extendedProps.employeeName}} </p>
                            <p style="margin: 0; font-size: 10px; color: var(--el-color-info)"> 建立時間  /  {{ arg.event.extendedProps.createTimeString}}<br>
                                                                                                修改時間  /  {{ arg.event.extendedProps.updateTimeString}}</p>
                        </div>
                        <hr style="margin: 0">
                                <b style="margin: 0;" >詳細事由</b>  
                        <p style="margin: 0">
                            {{ arg.event.extendedProps.businessPurpose}} <br>  
                        </p>
                        
                    </div>
                    <div v-if="arg.event.extendedProps.unavailableStatus==1" style="display: flex; justify-content: flex-end; margin-top: 20px;">
                        <el-button class="calendar-btm" size="small" color="#254252" :dark="isDark" style=""  @click="leaveURL(arg.event.id)">
                        詳細
                        </el-button>
                        <el-button class="calendar-btm" size="small" color="#254252" :dark="isDark" style="" disabled="true" @click="removeEvent(arg.event.id)">
                        刪除
                        </el-button>
                    </div>

                    <div v-if="arg.event.extendedProps.unavailableStatus==2" style="display: flex; justify-content: flex-end; margin-top: 20px;">
                        <el-button class="calendar-btm" size="small" color="#a77a2f" :dark="isDark" style=""  @click="viewCarURL(arg.event.id)">
                        詳細
                        </el-button>
                        <el-button class="calendar-btm" size="small" color="#a77a2f" :dark="isDark" style="" disabled="true" @click="removeEvent(arg.event.id)">
                        刪除
                        </el-button>
                    </div>

                    <div v-if="arg.event.extendedProps.unavailableStatus==3" style="display: flex; justify-content: flex-end; margin-top: 20px;">
                        <el-button class="calendar-btm" size="small" color="#a33238" :dark="isDark" style=""  @click="openAgandaDrawer=true;drawerByCreate=false;drawerByModify=true">
                        詳細
                        </el-button>
                        <el-button class="calendar-btm" size="small" color="#a33238" :dark="isDark" style=""  @click="removeEvent(arg.event.id)">
                        刪除
                        </el-button>
                    </div>
                    <template #reference>
                        <div slot="reference" class="popper-content"> 
                                <div>{{ arg.timeText }}</div>
                                <b>{{ arg.event.title }}</b>
                                <!-- <i>{{ arg.event.title }}</i> -->
                        </div>
                    </template>
                    
                </el-popover>

                
            </template>
        </FullCalendar>
    </div>   
    <div class="col-1"></div>

    <div class="col-1"></div>
    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
<!-- 新增用按鈕 -->
        <div class="btm-div" style="display: flex;" @click="openAgandaDrawer=true;drawerByCreate=true;drawerByModify=false">
        <font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;"/>
        <el-button type='' link class="text-btm" style="color: #a33238;margin-top: 13px">新增公事安排</el-button>
        </div>
    </div>
    <div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;"></div>
    <div class="col-1"></div>

<!-- 修改/新增彈出 -->
<el-drawer
        v-model="openAgandaDrawer"
        title=""
        :direction="direction"
        size="450"
        
        >
        <el-divider content-position="left">
                    <h5 v-if="drawerByCreate" class="table-title" >新增公事安排</h5>
                    <h5 v-if="drawerByModify" class="table-title" >排程詳情</h5>
        </el-divider>

        <el-form :model="form" label-width="auto" style="width: 100%; padding: 25px;">
                <el-form-item label="創建員工 :&nbsp;">
                    <p style="margin: 0;">後續串接登陸員工</p>
                </el-form-item>

                
                <el-form-item label="排程區間 :&nbsp;">
                    <el-date-picker
                        v-model="createUnavailableTime"
                        size="small"
                        type="datetimerange"
                        start-placeholder="Start Time"
                        end-placeholder="End Time"
                        format="YYYY-MM-DD HH:mm"
                        date-format="YYYY/MM/DD ddd"
                        time-format="A hh:mm"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :default-time="defaultTime2"
                    />
                </el-form-item>

         
                <el-form-item label="詳細事由 :&nbsp;">
                    <el-input
                        v-model="createBusinessPurpose"
                        style="width: 240px"
                        :rows="4"
                        type="textarea"
                        placeholder="詳細事由"
                    />
                </el-form-item>
                </el-form>
                <div style=" float: left;text-align: left;margin: 0 25px;">
                    <div style="margin: 0; font-size: 12px; justify-self: start;">員工 : {{createEmployeeId}}</div>
                    <div style="margin: 0; font-size: 12px; justify-self: start;">排程期始 : {{createUnavailableTime[0]}}</div>
                    <div style="margin: 0; font-size: 12px; justify-self: start;">排程結束 : {{createUnavailableTime[1]}}</div>
                    <div style="margin: 0; font-size: 12px; justify-self: start;">事由 : {{createBusinessPurpose}}</div>
                </div>

                <div class="btm-div" style="text-decoration:unset;display: flex;margin: 100px 50px; float: right" >
                    <div class="btm-div" style="display: flex;margin: 0 70px; float: right" @click="cleanCerateAgenda">
                        <font-awesome-icon icon="fa-regular fa-circle-xmark" size="" style="color: #a33238; padding: 0;margin-top: 8px"/>
                        <el-button type='' link  style="color: #a33238; font-weight: 900;">清空</el-button>
                    </div>
                    <el-button class="calendar-btm"  color="#a33238" :dark="isDark"  @click="cancelCerateAgenda">
                        <b>取消新增</b>
                    </el-button>
                    <el-button class="calendar-btm"  color="#a33238" :dark="isDark"  @click="creatAGDVisible=true">
                        <b>確認新增</b>
                    </el-button>
                </div>
    </el-drawer>

<!-- 確認新增用彈出視窗 -->
<el-dialog
        v-model="creatAGDVisible"
        width="350"
        :show-close="false"
    >
    <h5 class="msg-title" >確認新增 ?</h5>
    <div style="text-align: left;margin: 0 25px;">
        <p>員工 : {{createEmployeeId}} </p>
        <p>排程期始 : {{createUnavailableTime[0]}}</p>
        <p>排程結束 : {{createUnavailableTime[1]}} </p>
        <p>事由 : {{createBusinessPurpose}} </p>
    </div>
        <template #footer> 
        <div class="dialog-footer" style="display: flex;justify-content: center;">
            <div>
            <el-button @click="creatAGDVisible=false">否</el-button>
            <el-button type="primary" @click="doCreateAgenda" style="background-color: #a33238;border: #a33238;">
            是
            </el-button>
        </div>
        </div>
        </template>
    </el-dialog>

</template>
    



<script setup>
import { ref , onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import moment from 'moment'//時間轉換套件

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';



//用於重新導向 router.push
const router = useRouter()

const title = ref('');
const fullCalendar = ref(null);

//開啟新增修改抽屜
const openAgandaDrawer = ref(false)
const drawerByCreate = ref(false)
const drawerByModify = ref(false)
const creatAGDVisible =ref(false)

//新增用屬性
const createEmployeeId =ref(1)
const createUnavailableTime =ref({0:null,1:null})
const defaultTime2 = [
  new Date(2000, 1, 1, 9, 0, 0),
  new Date(2000, 2, 1, 18, 0, 0),
]//Unavailable的預設時間屬性
const createBusinessPurpose =ref('')


onMounted(() => {
    callFindByAgangaHQL();
    calendarApi.value = fullCalendar.value.getApi();
    // console.log(calendarApi.value.view);
    title.value = calendarApi.value.view?.title;

    console.log(agangaEvents);
    getDtata();
});

//日曆屬性
const calendarOptions = ref({
    locale: 'en',
    plugins: [ dayGridPlugin, interactionPlugin, listPlugin ,timeGridPlugin,bootstrap5Plugin],
    themeSystem: 'bootstrap5',
    initialView: 'timeGridWeek',
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    eventDurationEditable: true, // 可以调整事件的时间
    selectable: true, // 日历格子可选择
    nowIndicator: true, // 当前的时间线显示
    eventDisplay: 'block', // 争对全天的情况下，以块状显示
    headerToolbar: false, // 隐藏头部的导航栏
    selectMirror: false,
    displayEventEnd: true, // like 08:00 - 13:00
    eventTimeFormat: { // like '14:30:00'
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                    hour12: false, // 设置时间为24小时
    },
    slotLabelFormat: { // 左侧时间格式
        hour: '2-digit',
        minute: '2-digit',
        meridiem: 'lowercase',
        hour12: false, // false设置时间为24小时
    },

    // headerToolbar: {  //標配表頭
    //     left: "prev,next today",
    //     right: "title",
    //     center: "dayGridMonth,timeGridWeek,timeGridDay",
    //     },
    // buttonText: {
    //     today: "Today",
    //     month: "Month",
    //     week: "Week",
    //     day: "Day",
    //     },

    dateClick: handleDateClick,//點即觸發事件
    events: [],//事件排程
    eventColor: '#378006', // 事件的颜色
    allDayText: '全天',
    droppable: true, // this allows things to be dropped onto the calendar
    weekends: true,  //周末顯示
    eventDragStart: function(info) { //事件移動開始
        console.log('Event drag started:', info.event);
        console.log('Drag-id:', info.event._def.publicId);
        console.log('Drag-businessPurpose:', info.event._def.title);
        console.log('Drag-unavailableStatus:', info.event._def.extendedProps.unavailableStatus);
        console.log('Drag-employeeId:', info.event._def.extendedProps.employeeId);
        console.log('Drag-unavailableTimeStr:', formatDate(info.event._instance.range.start));
        console.log('Drag-unavailableStatus:', formatDate(info.event._instance.range.end));
        // 可以在這裡記錄初始狀態或執行其他操作
    },
    eventDrop: async function(info) { //事件移動放下時間完成改變
        console.log('Event drag Droped:', info.event);
        console.log('Drop-id:', info.event._def.publicId);
        console.log('Drop-businessPurpose:', info.event._def.title);
        console.log('Drop-unavailableStatus:', info.event._def.extendedProps.unavailableStatus);
        console.log('Drop-employeeId:', info.event._def.extendedProps.employeeId);
        console.log('Drop-unavailableTimeStr:', formatDate(info.event._instance.range.start));
        console.log('Drop-unavailableStatus:', formatDate(info.event._instance.range.end));
        // 在這裡更新數據庫或執行其他操作
        var dragSuccessful = await  doAgangaModify(info.event);
        console.log("dragSuccessful",dragSuccessful);
        if (!dragSuccessful) {
            info.revert();
          }

    },
    eventResizeStart: function(info) { //事件區間拉動開始
        console.log('Event drag ResizeStart:', info.event);
        console.log('ResizeStart-id:', info.event._def.publicId);
        console.log('ResizeStart-businessPurpose:', info.event._def.title);
        console.log('ResizeStart-unavailableStatus:', info.event._def.extendedProps.unavailableStatus);
        console.log('ResizeStart-employeeId:', info.event._def.extendedProps.employeeId);
        console.log('ResizeStart-unavailableTimeStr:', formatDate(info.event._instance.range.start));
        console.log('ResizeStart-unavailableStatus:', formatDate(info.event._instance.range.end));
        // 在這裡更新數據庫或執行其他操作
    },
    
    eventResize: async function(info) { //事件區間拉動放下時間完成改變
        console.log('Event drag Resize:', info.event);
        console.log('Resize-id:', info.event._def.publicId);
        console.log('Resize-businessPurpose:', info.event._def.title);
        console.log('Resize-unavailableStatus:', info.event._def.extendedProps.unavailableStatus);
        console.log('Resize-employeeId:', info.event._def.extendedProps.employeeId);
        console.log('Resize-unavailableTimeStr:', formatDate(info.event._instance.range.start));
        console.log('Resize-unavailableStatus:', formatDate(info.event._instance.range.end));

        // 在這裡更新數據庫或執行其他操作
        var dragSuccessful = await  doAgangaModify(info.event);
        console.log("dragSuccessful",dragSuccessful);
        if (!dragSuccessful) {
            info.revert();
          }
    }
});
                
const calendarApi = ref(null)

// watch(() => calendarApi.value.view?.type, //改變資料用
//     () => {
//         getDtata();
//     }
// );

const getDtata = () => {
    setTimeout(() => {
        calendarOptions.value.events = calendarApi.value.view?.type === 'timeGridWeek' ? agangaEvents : agangaEvents;
    }, 200);
};

const calendarprev = () => {
    calendarApi.value.prev();
    title.value = calendarApi.value.view?.title;
};

const calendarnext = () => {
    calendarApi.value.next();
    title.value = calendarApi.value.view?.title;
};

const calendartoday = () => {
    calendarApi.value.today();
    title.value = calendarApi.value.view?.title;
};

const calendarmonth = () => {
    calendarApi.value.changeView('dayGridMonth');
    calendarApi.value.today();
    title.value = calendarApi.value.view?.title;
};

const calendarweek = () => {
    calendarApi.value.changeView('timeGridWeek');
    calendarApi.value.today();
    title.value = calendarApi.value.view?.title;
};

const calendarlist = () => {
    calendarApi.value.changeView('listMonth');
    calendarApi.value.today();
    title.value = calendarApi.value.view?.title;
};

const calendarday = () => {
    calendarApi.value.today();
    title.value = calendarApi.value.view?.title;
};

const calendarsearch = () => {
    calendarApi.value.changeView('dayGrid', {
        start: '2024-10-21',
        end: '2024-10-23',
    });
};



// https://juejin.cn/post/7030696881420238878   還在研究中
// https://cloud.tencent.cn/developer/article/1019452?from=15425 屬性



function toggleWeekends(params) {
    calendarOptions.value.weekends=!calendarOptions.value.weekends;
}

//點擊空白開啟新增
function handleDateClick(arg) {
    // alert('date click! ' + arg.dateStr);
    drawerByCreate.value = true;
    openAgandaDrawer.value=true
    createUnavailableTime.value=({0:formatDate2(arg.dateStr),1:formatDate2Add2Hr(arg.dateStr)})
    console.log("formatDate2(arg.dateStr)",formatDate2(arg.dateStr));
    console.log("arg.dateStr",arg.dateStr);
}

//清空新增
function cleanCerateAgenda() {
    createUnavailableTime.value =({0:null,1:null})
    createBusinessPurpose.value =''
}

//取消新增
function cancelCerateAgenda(){
    cleanCerateAgenda();
    openAgandaDrawer.value = false;
    drawerByCreate.value = false;
    drawerByModify.value = false;
    
}

//執行新增確認按鈕
function openDoCreateAgenda() {
    // console.log("createEmployeeId",createEmployeeId.value);
    // console.log("createUnavailableTime",createUnavailableTime.value);
    // console.log("createBusinessPurpose",createBusinessPurpose.value);
    creatAGDVisible.value=true;
}

//執行新增排程
function doCreateAgenda() {
    creatAGDVisible.value=false;
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });


    let request ={  
        "employeeId":1, 
        "businessPurpose":createBusinessPurpose.value, 
        "unavailableTimeStr":createUnavailableTime.value[0],
        "unavailableTimeEnd":createUnavailableTime.value[1], 
        "unavailableStatus":3
    }
    console.log("request", request);
    axiosapi.post("/agenda", request).then(function(response) {
        console.log("response", response);
        if(response.data.success)  {
            callFindByAgangaHQL(false);
            getDtata();
            Swal.fire({
                icon: "success",
                text: response.data.msg,
                showConfirmButton: false,
            }).then(function(result) {
                
            });
            setTimeout(function () {
                Swal.close();  //視窗關閉 
                cancelCerateAgenda();
                location.reload();
            }, 1000); 
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
            text: "新增錯誤："+error.message,
            showConfirmButton: false,
        });
        setTimeout(function () {
                    Swal.close();  //視窗關閉 
                }, 1000); 
    });
    
    
}

//資料庫Aganga回傳資料
const items = ref([]);
const agangaEvents = [];

//查詢用參數
const  findEmployeeId =ref(null);
const  findUnavailableStatus =ref(null);

//拖曳測試
function move() {
    console.log(calendarApi.value.view.events);
}

//多筆查詢
function callFindByAgangaHQL(doCreat){
    if (doCreat) {
        cleanFind();
    }
    
    let employeeId = findEmployeeId.value="" ? null : findEmployeeId.value;
    let unavailableStatus = findUnavailableStatus.value="" ? null : findUnavailableStatus.value;

    let request ={ 
        "id":null,
        "id":null,
        "employeeId":employeeId,
        "unavailableTimeStr":null,
        "unavailableTimeEnd":null,
        "unavailableStatus":unavailableStatus,  
        "createTime":null,


        "isPage":0,
        "max":99999,
        "dir":true,
        "order":"id"
    }

    axiosapi.post("/agenda/findByHQL",request).then(function (responce) {  //(AJAX前端程式)多產品查詢的Post功能()
        items.value = responce.data.data;
        console.log("items",responce.data.data);
        console.log("total",responce.data.totalElement);
        console.log("responce",responce.data);
        for(let i = 0;i<responce.data.totalElement;i++){
            switch (items.value[i].unavailableStatus) {
                case 1: //請假
                    agangaEvents.push({
                    id:items.value[i].id,
                    title:items.value[i].unavailableStatusName,
                    start:items.value[i].unavailableTimeStrString,
                    end: items.value[i].unavailableTimeEndString,
                    resourceId: null, //定義資源(擴展用)
                    color: '#254252',
                    // url:null,
                    editable:false,
                    className: "holidayEvent",
                    allDay: false,
                    extendedProps: {
                        businessPurpose:items.value[i].businessPurpose,
                        employeeId:items.value[i].employeeId,
                        employeeName:items.value[i].employeeName,
                        unavailableStatus :items.value[i].unavailableStatus,
                        unavailableStatusName :items.value[i].unavailableStatusName,
                        createTimeString :items.value[i].createTimeString,
                        updateTimeString :items.value[i].updateTimeString
                    }

                    });
                    break;

                case 2: //排賞車
                    agangaEvents.push({
                    id:items.value[i].id,
                    title:items.value[i].unavailableStatusName,
                    start:items.value[i].unavailableTimeStrString,
                    end: items.value[i].unavailableTimeEndString,
                    resourceId: null, //定義資源(擴展用)
                    color: '#bb8b3a',
                    // url:null,
                    editable:false,
                    className: "holidayEvent",
                    allDay: false,
                    extendedProps: {
                        businessPurpose:items.value[i].businessPurpose,
                        employeeId:items.value[i].employeeId,
                        employeeName:items.value[i].employeeName,
                        unavailableStatus :items.value[i].unavailableStatus,
                        unavailableStatusName :items.value[i].unavailableStatusName,
                        createTimeString :items.value[i].createTimeString,
                        updateTimeString :items.value[i].updateTimeString
                    }
                    });
                    break;

                case 3: //自行安排
                    agangaEvents.push({
                    id:items.value[i].id,
                    title:items.value[i].unavailableStatusName,
                    start:items.value[i].unavailableTimeStrString,
                    end: items.value[i].unavailableTimeEndString,
                    resourceId: null, //定義資源(擴展用)
                    color: '#a33238',
                    // url:null,
                    editable:true,
                    className: "holidayEvent",
                    allDay: false,
                    extendedProps: {
                        businessPurpose:items.value[i].businessPurpose,
                        employeeId:items.value[i].employeeId,
                        employeeName:items.value[i].employeeName,
                        unavailableStatus :items.value[i].unavailableStatus,
                        unavailableStatusName :items.value[i].unavailableStatusName,
                        createTimeString :items.value[i].createTimeString,
                        updateTimeString :items.value[i].updateTimeString
                    }
                    });
                    break;
            
                default:
                    agangaEvents.push({
                    id:items.value[i].id,
                    title:items.value[i].businessPurpose,
                    start:items.value[i].unavailableTimeStrString,
                    end: items.value[i].unavailableTimeEndString,
                    resourceId: null, //定義資源(擴展用)
                    color: '#ec1c24',
                    // url:null,
                    editable:false,
                    className: "holidayEvent",
                    allDay: false,
                    extendedProps: {
                        employeeId:items.value[i].employeeId,
                        employeeName:items.value[i].employeeName,
                        unavailableStatus :items.value[i].unavailableStatus,
                        unavailableStatusName :items.value[i].unavailableStatusName,
                        createTimeString :items.value[i].createTimeString,
                        updateTimeString :items.value[i].updateTimeString
                    }
                    });
                    break;
            }
        }
        console.log(calendarOptions.value.events);
        console.log("agangaEvents",agangaEvents);

        
    }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢錯誤"+error.message,
                icon: "error"
            });
        // router.push("/")
    }) 
}

//修改排程(狀態3)
async function doAgangaModify(infoEvent) {
    // Swal.fire({
    //     text: "執行中......",
    //     allowOutsideClick: false,
    //     showConfirmButton: false,
    // });

    let request ={ 
        "id":infoEvent._def.publicId, 
        "employeeId":infoEvent._def.extendedProps.employeeId,
        "businessPurpose":infoEvent._def.extendedProps.businessPurpose,
        "unavailableTimeStr":formatDate(infoEvent._instance.range.start),
        "unavailableTimeEnd":formatDate(infoEvent._instance.range.end),
        "unavailableStatus":infoEvent._def.extendedProps.unavailableStatus
    }
    console.log("request", request);

    
    try {
        let response = await axiosapi.put(`/agenda/${infoEvent._def.publicId}`, request);

        console.log("response", response);

        if(response.data.success)  {
            ElMessage({
                message: '排程修改成功',
                type: 'success',
            })
            return true
        } else {
            ElMessage({
                message: response.data.msg,
                type: 'warning',
            })
            return false
        }
    }catch(error) {
        console.log("error", error);
        ElMessage.error('修改錯誤'+error.message)
        return false
    };

}

//時間轉換格式 //拖曳修改用
function formatDate(dateString) {
    // 創建 Moment 物件並減去 8 小時
    const modifiedDate = moment(dateString, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zzzz)").subtract(8, 'hours');
    // 格式化為所需的日期時間格式
    return modifiedDate.format("YYYY-MM-DD HH:mm:ss");
}

//時間轉換  //新建用
function formatDate2(dateString) {
  // 創建 Moment 物件
  const modifiedDate = moment(dateString);
  // 格式化為所需的日期時間格式
  return modifiedDate.format("YYYY-MM-DD HH:mm:ss");
}

//時間轉換+2小時  //新建用
function formatDate2Add2Hr(dateString) {
  // 創建 Moment 物件
  const modifiedDate = moment(dateString).add(2, 'hours');
  // 格式化為所需的日期時間格式
  return modifiedDate.format("YYYY-MM-DD HH:mm:ss");
}

function removeEvent() {}

</script>
    
<style scoped>
.popper {
    position: fixed;
    width: 200px;
    height: 140px;
    padding: 20px;
    border: 1px solid #eee;
    text-align: center;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: none;
    background-color: #fff5eb;
}

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