<template>
	<el-card class="card">
		<div class="header-container">
			<RouterLink :to="{ name: 'home-link' }" class="logo">
				<el-icon class="logo-icon"><img src="/Kajarta_LOGO_02.svg"></el-icon>
			</RouterLink>
			<span class="header-text">員工登入</span>
		</div>
		<div class="card-content">
		
			<img src="/jeep.jpg" class="card-image">
			<div class="form-container">
				<form @submit.prevent="handleSubmit" class="form">
					<br>
					<br>
					<br>
					<p class="p-text">Life's tough,<br>but working for a living must go on.</p><br>
					
					<div class="form-group">
						<label for="username">帳號:</label>
						<input type="text" id="username" v-model="username" class="input-field" required>
					</div>
					<div class="form-group">
						<label for="password">密碼:</label>
						<input type="password" id="password" v-model="password" class="input-field" required>
					</div>
					<button type="submit" class="submit-button">登入</button>
					<div v-if="loginMessage" class="alert alert-success mt-3">
						{{ loginMessage }}
					</div>
				</form>
			</div>
		</div>
	</el-card>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios';

const username = ref('');
const password = ref('');
const loginMessage = ref('');
const router = useRouter();
const store = useStore();

const handleSubmit = () => {
	const formData = new FormData();
	formData.append('username', username.value);
	formData.append('password', password.value);

	axiosapi.post(`/login`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: true
	})
		.then(response => {
			const data = response.data;

			if (data.success && data.code === 200) {
				Swal.fire({
					icon: 'success',
					title: '登入成功',
					text: '您已成功登入！'
				}).then(async () => {
					const username = data.data.username;

					localStorage.setItem('username', username);
					await getEmployeeInfo(username);
					router.push({ name: 'personal-link' });
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: '登入失敗',
					text: data.msg || '帳號或密碼錯誤'
				});
			}
		})
		.catch(error => {
			Swal.fire({
				icon: 'error',
				title: '登入失敗',
				text: '帳號或密碼錯誤'
			});
		});
};

const getEmployeeInfo = async (username) => {
	try {
		const response = await axiosapi.get(`/employee/info/username/${username}`);
		const data = response.data;
		store.commit('setEmployeeInfo', data);
	} catch (error) {
		console.error('Failed to get employee info:', error);
	}
};
</script>

<style scoped>
.p-text{


	
	
	width: 90%; /* 调整底线的长度 */
	border-bottom: 1px solid #a33238;
}
.header-container {
	display: flex;
	align-items: center;
	margin-bottom: 20px;
}

.logo {
	all: unset;
	margin-right: 30px;
	display: flex;
	justify-content: center;
}

.logo-icon {
	width: 30px;
}

.header-text {
	font-size: 1.5em;
	font-weight: bold;
	color: #a33238;
}

.card {
	max-width: 800px;
	margin: auto;
	padding: 20px;
	background-color: #fff5eb;
}

.card-content {
	display: flex;
	align-items: flex-start;
	background-color: white;
	font-weight: bold;
	color: #a33238;
}

.card-image {
	width: 50%;
	margin-right: 20px;
}

.form-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.form {
	width: 100%;
	max-width: 400px;
}

.form-group {
	margin-bottom: 15px;
}

.form-group label {
	margin-right: 10px;
}

.input-field {
	width: calc(100% - 100px);
	/* 计算宽度以适应标签 */
	padding: 8px;
	border: none;
	border-bottom: 1px solid #a33238;
	/* 底線 */
	background-color: transparent;
}

.submit-button {
	width: 100%;
	max-width: 300px;
	padding: 10px;
	border: none;
	border-radius: 4px;
	background-color: #a33238;
	color: white;
	cursor: pointer;
}

.submit-button:hover {
	background-color: #66b1ff;
}

.alert {
	margin-top: 15px;
}
</style>
