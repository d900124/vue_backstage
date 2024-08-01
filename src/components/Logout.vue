<template>
	<div class="header">
		<span class="welcome-message"><b>歡迎 {{ employeeInfo.name || '用戶' }}</b></span>
		<el-button round @click="logout" plain>登出</el-button>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axiosapi from '@/plugins/axios';
import 'element-plus/dist/index.css';

const router = useRouter();
const store = useStore();

const logout = async () => {
	try {
		const response = await axiosapi.post('/logout', {}, {
			withCredentials: true // 确保带上 Cookie
		});

		if (response.status === 200) {
			// 清除本地存储的用户信息
			localStorage.removeItem('username');

			// 调用 Vuex 的 logout action 清除 Vuex 状态
			store.dispatch('logout');

			// 跳转到登录页面
			router.push('/');
		}
	} catch (error) {
		console.error('Logout failed:', error);
	}
};

const employeeInfo = computed(() => store.state.employeeInfo.data || {});

onMounted(() => {
	const username = localStorage.getItem('username');
	if (username) {
		store.dispatch('fetchEmployeeInfo', username);
	}
});

const isCollapse = ref(false);
const activeIndex = ref('1');

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
</script>

<style>
.header {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 10px;
	background-color: #fff;
	border-bottom: 1px solid #ebebeb;
	margin-bottom: 20px;
}

.welcome-message {
	color: #a33238;
	margin-right: 10px;
}

.el-menu-vertical-demo {
	height: 100vh;
	display: flex;
	flex-direction: column;
	border: none;
	/* 确保菜单没有边框 */
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
}

.fixed-logout-container {
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1000;
	border: none;
	/* 确保容器没有边框 */
}

.logout-container {
	display: flex;
	justify-content: center;
	padding: 10px 0;
	border: none;
	/* 确保没有边框 */
}
</style>