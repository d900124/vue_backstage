<template>
	<div class="col-1"></div>
	<!-- 多選下拉選單(簡易搜尋) -->
	<div class="col-5" style="padding: 0px 0px;"></div>

	<!-- 抬頭 -->
	<div class="col-5" style="padding: 0px 0px;">
		<h3 class="table-title">員工總覽</h3>
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
						<th scope="col" class="table-th">員工編號</th>
						<th scope="col" class="table-th">職等</th>
						<th scope="col" class="table-th">姓名</th>
						<th scope="col" class="table-th">電話</th>
						<th scope="col" class="table-th">Email</th>
						<th scope="col" class="table-th">直屬主管</th>
						<th scope="col" class="table-th">分店</th>
					</tr>
				</thead>
				<tbody class="table-group-divider">
					<tr v-for="employee in employees" :key="employee.id" @click="employeeClick(employee.id)">
						<th scope="row" class="table-td">{{ employee.id }}</th>
						<td class="table-td">{{ employee.accountTypeName }}</td>
						<td class="table-td">{{ employee.name }}</td>
						<td class="table-td">{{ employee.phone }}</td>
						<td class="table-td">{{ employee.email }}</td>
						<td class="table-td">{{ employee.teamLeaderName }}</td>
						<td class="table-td">{{ employee.branchName }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="col-1"></div>

	<div class="col-1"></div>
	<div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-start;">
		<!-- 新增用按鈕 -->
		<div class="btm-div" style="display: flex;" @click="openModal('insert')">
			<font-awesome-icon icon="plus" size="xl" style="color: #a33238; padding: 13 5 0 5;" />
			<el-button type='' link class="text-btm" style="color: #a33238;">新增員工</el-button>
		</div>
	</div>

	<div class="col-5" style="padding: 0px 0px;background-color: unset;  display: flex; justify-content: flex-end;">
		<!-- 分頁區塊 -->
		<el-pagination style="margin: 10px 0px;" hide-on-single-page=true layout="total,prev, pager, next" :total="total" :page-size="rows" v-model:current-page="current" @change="callQuery"></el-pagination>
	</div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';

const employees = ref([]);
const total = ref(0);
const current = ref(1);
const rows = ref(4);

onMounted(() => {
	callQuery();
});

const emit = defineEmits();

function employeeClick(employeeId) {
	emit('employee-click', employeeId);
}

function callQuery() {
	let request = {
		pageNum: current.value - 1,
		pageSize: rows.value
	};

	axiosapi.post('/employee/query', request)
		.then(function (response) {
			employees.value = response.data.data.content;
			total.value = response.data.data.totalElements;
		}).catch(function (error) {
			Swal.fire({
				text: '查詢錯誤' + error.message,
				icon: 'error'
			});
		});
}
</script>

<style scoped>
.btn-close {
	margin: 10px;
}

.btm-div:hover {
	text-decoration: underline 2px solid #a33238;
}

.text-btm {
	font-size: 1.2em;
	font-weight: 900;
}

.table-td {
	font-size: 0.8em;
}

.table-th {
	color: #a33238;
}

div.col-10 {
	padding: 0px 0px;
	background-color: #fff5eb;
	justify-content: center;
	display: flex;
}

th, tr, td {
	background-color: unset;
	width: 100px;
}

.table-part {
	width: 95%;
	padding: 20px;
}

.table {
	width: 95%;
	margin: auto;
	padding: 10px 10px;
}

.extra-menu {
	width: 5%;
	background-color: #a33238;
}

.table-title {
	float: right;
	color: #a33238;
	font-weight: 900;
	margin: 10px 0px;
}

.msg-title {
	color: #a33238;
	font-weight: 900;
	margin: 10px 0px;
}
</style>
