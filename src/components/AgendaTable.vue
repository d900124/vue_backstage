<template>
    <div class="col-1"></div>
<!-- 多選下拉選單(簡易搜尋) -->
    <div class="col-8" style="padding: 0px 0px;display: flex; justify-content: flex-start;align-items: center;"></div>
    <div class="col-2" style="padding: 0px 0px;">
        <h3 class="table-title">工作排程</h3>
    </div>
    <div class="col-1"></div>

    <div class="col-1"></div>
    <div class="col-10">
        <!-- <FullCalendar :options="calendarOptions" >
            <template v-slot:eventContent='arg'>
                <b>{{ arg.event.title }}</b>
            </template>
        </FullCalendar> -->
        
        
        <div class="fc-toolbar">
            <div class="fc-left">
                <el-button-group>
                    <el-button @click="month">
                        月
                    </el-button>
                    <el-button @click="week">
                        周
                    </el-button>
                    <el-button @click="today">
                        今天
                    </el-button>
                </el-button-group>
            </div>
            <div class="fc-center">
                <el-button @click="prev">
                    上一个
                </el-button>
                <h2>
                    {{ title }}
                </h2>
                <el-button @click="next">
                    下一个
                </el-button>
            </div>
            <el-button ref="next"
                    class="search"
                    type="button"
                    @click="search">
            查询
            </el-button>
        </div>

        <FullCalendar
            id="calendar"
            ref="fullCalendar"
            class="demo-app-calendar"
            :options="calendarOptions">
            <template v-slot:eventContent="arg">
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
            </template>
        </FullCalendar>
    </div>

        
    
    <div class="col-1"><button @click="toggleWeekends">toggle weekends</button></div>
</template>
    



<script setup>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const title = 'AAAA';

const calendarOptions = ref({
    locale: 'zh-tw',
    plugins: [ dayGridPlugin, interactionPlugin, listPlugin ,timeGridPlugin],
    initialView: 'dayGridMonth',
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

    headerToolbar: {
        left: "prev,next today",
        right: "title",
        center: "dayGridMonth,timeGridWeek,timeGridDay",
        },
    buttonText: {
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        },

    dateClick: handleDateClick,//點即觸發事件
    events: [//事件排程
    {
            title: "All Day Event",
            start: "2024-03-02",
        },
        {
            title: "Time Event",
            start: "2024-03-02 12:00:00",
        },
        {
            title: "Holiday",
            start: "2024-03-03 12:00:00",
            end: "2024-03-06 16:00:00",
            textColor: "#000",
            className: "holidayEvent"
        },
        {
            title: "Home Page",
            start: "2024-03-08",
            url: "網址路徑"
        },
        {
            id: 1,
            title: 'event 1',
            start: '2024-10-21',
            color: 'purple',
        },
        {
            id: 2, title: 'event 2', start: '2024-10-22', color: 'purple',
        },
        { title: 'event 3', start: '2024-10-23' },
        { title: 'event 4', start: '2024-10-24' },
        { title: 'event 5', start: '2024-10-21' },
        { title: 'event 6', start: '2024-10-21', color: 'purple' },
        { title: 'event 7', start: '2024-10-21' },
        {
            id: 3,
            title: 'event 6',
            start: '2024-11-21',
            end: '2024-11-23',
            color: 'purple',
            extendedProps: {
                description: 'asdasdasdasdasdasdasdasds',
            },
            allDay: false,
        },
        {
            id: 4,
            title: 'event 7',
            start: '2024-11-21',
            extendedProps: {
                description: '444444444444',
            },
        },
    ],
    eventColor: '#378006', // 事件的颜色
    allDayText: '全天',
    droppable: true, // this allows things to be dropped onto the calendar
    weekends: false  //周末顯示
});

// https://juejin.cn/post/7030696881420238878   還在研究中

function handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
}

function toggleWeekends(params) {
    calendarOptions.value.weekends=!calendarOptions.value.weekends;
}
</script>
    
<style>

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