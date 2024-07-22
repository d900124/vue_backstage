<template>
	<div class="col-1"></div>
	<!-- 多選下拉選單(簡易搜尋) -->
	<div class="col-5" style="padding: 0px 0px;"></div>

	<!-- 抬頭 -->
	<div class="col-5" style="padding: 0px 0px;">
		<h3 class="table-title">個人資訊</h3>
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
					<th scope="col" class="table-th">串接XXX員工名</th>
				</tr>
			</thead>
			<tbody class="table-group-divider">
				<tr>
					<td class="table-th">
						<span>職等：</span><span>某個值</span>
					</td>
				</tr>
				<tr>
					<td class="table-th">
						<span>姓名：</span><span>某個值</span>
					</td>
				</tr>
				<tr>
					<td class="table-th">
						<span>性別：</span><span>某個值</span>
					</td>
				</tr>
				<tr>
					<td class="table-th">
						<span>帳號：</span><span>某個值</span>
					</td>
				</tr>
				<tr>
					<td class="table-th">
						<span>手機：</span><span>某個值</span>
					</td>
				</tr>
				<tr>
					<td class="table-th">
						<span>Email：</span><span>某個值</span>
					</td>
				</tr>
				<tr>
					<td class="table-th">
						<span>入職日：</span><span>某個值</span>
					</td>
				</tr>
				<tr>
					<td class="table-th">
						<span>直屬主管：</span><span>某個值</span>
					</td>
				</tr>
				<tr>
					<td class="table-th">
						<span>分店：</span><span>某個值</span>
					</td>
				</tr>
				
			</tbody>
		</table>
		</div>
	</div>



</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const employee = ref({});


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

th,
tr,
td {
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

.creat-title {
	color: black;
	font-weight: 900;
	margin: 20px 20px;
}
</style>