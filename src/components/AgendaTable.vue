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
    
        <FullCalendar
            id="calendar"
            ref="fullCalendar"
            class="demo-app-calendar"
            :options="calendarOptions">
            <!-- <template v-slot:eventContent="arg"> -->
                <el-popover
                    placement="top-start"
                    title="标题"
                    width="200"
                    :visible-arrow="false"
                    trigger="hover">
                    <i class="title">{{ arg.event.title }}</i>
                    <el-button @click="more">
                        更多
                    </el-button>
                    <div slot="reference"
                        class="popper-content">
                        <span>{{ arg.timeText }}</span>
                        <i>{{ arg.event.title }}</i>
                        <i>{{ arg.event.title }}</i>
                    </div>
                </el-popover>
            <!-- </template> -->
        </FullCalendar>
    </div>

        
    
    <div class="col-1"></div>
</template>
    



<script setup>
import { ref , onMounted, watch } from 'vue';
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
    eventDrop: function(info) { //事件移動放下時間完成改變
        console.log('Event drag Droped:', info.event);
        console.log('Drop-id:', info.event._def.publicId);
        console.log('Drop-businessPurpose:', info.event._def.title);
        console.log('Drop-unavailableStatus:', info.event._def.extendedProps.unavailableStatus);
        console.log('Drop-employeeId:', info.event._def.extendedProps.employeeId);
        console.log('Drop-unavailableTimeStr:', formatDate(info.event._instance.range.start));
        console.log('Drop-unavailableStatus:', formatDate(info.event._instance.range.end));
        // 在這裡更新數據庫或執行其他操作
        doAgangaModify(info.event);
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
    
    eventResize: function(info) { //事件區間拉動放下時間完成改變
        console.log('Event drag Resize:', info.event);
        console.log('Resize-id:', info.event._def.publicId);
        console.log('Resize-businessPurpose:', info.event._def.title);
        console.log('Resize-unavailableStatus:', info.event._def.extendedProps.unavailableStatus);
        console.log('Resize-employeeId:', info.event._def.extendedProps.employeeId);
        console.log('Resize-unavailableTimeStr:', formatDate(info.event._instance.range.start));
        console.log('Resize-unavailableStatus:', formatDate(info.event._instance.range.end));

        // 在這裡更新數據庫或執行其他操作
        doAgangaModify(info.event);
    }
});
                
const calendarApi = ref(null)

onMounted(() => {
    callFindByAgangaHQL();
    calendarApi.value = fullCalendar.value.getApi();
    // console.log(calendarApi.value.view);
    title.value = calendarApi.value.view?.title;

    console.log(agangaEvents);
    getDtata();
});

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

function handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
}

function toggleWeekends(params) {
    calendarOptions.value.weekends=!calendarOptions.value.weekends;
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
                    title:items.value[i].businessPurpose,
                    start:items.value[i].unavailableTimeStrString,
                    end: items.value[i].unavailableTimeEndString,
                    resourceId: null, //定義資源(擴展用)
                    color: '#254252',
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

                case 2: //排賞車
                    agangaEvents.push({
                    id:items.value[i].id,
                    title:items.value[i].businessPurpose,
                    start:items.value[i].unavailableTimeStrString,
                    end: items.value[i].unavailableTimeEndString,
                    resourceId: null, //定義資源(擴展用)
                    color: '#bb8b3a',
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

                case 3: //自行安排
                    agangaEvents.push({
                    id:items.value[i].id,
                    title:items.value[i].businessPurpose,
                    start:items.value[i].unavailableTimeStrString,
                    end: items.value[i].unavailableTimeEndString,
                    resourceId: null, //定義資源(擴展用)
                    color: '#a33238',
                    // url:null,
                    editable:true,
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
function doAgangaModify(infoEvent) {
    Swal.fire({
        text: "執行中......",
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    let request ={ 
        "id":infoEvent._def.publicId, 
        "employeeId":infoEvent._def.extendedProps.employeeId,
        "businessPurpose":infoEvent._def.title,
        "unavailableTimeStr":formatDate(infoEvent._instance.range.start),
        "unavailableTimeEnd":formatDate(infoEvent._instance.range.end),
        "unavailableStatus":infoEvent._def.extendedProps.unavailableStatus
    }
    console.log("request", request);
    axiosapi.put(`/carAdjust/${infoEvent._def.publicId}`, request).then(function(response) {
        console.log("response", response);
        if(response.data.success)  {
            Swal.fire({
                icon: "success",
                text: response.data.message,
                showConfirmButton: false,
            }).then(function(result) {
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
}

//時間轉換格式 
function formatDate(dateString) {
    // 創建 Moment 物件並減去 8 小時
    const modifiedDate = moment(dateString, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zzzz)").subtract(8, 'hours');
    // 格式化為所需的日期時間格式
    return modifiedDate.format("YYYY-MM-DD HH:mm:ss");
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