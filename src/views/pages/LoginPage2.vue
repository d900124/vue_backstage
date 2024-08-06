<template>
	<div class="card-wrapper">
		<div class="row" style="width: 70%;">
			<div class="col-12">
				<RouterLink :to="{ name: 'home-link' }"  style="position: absolute; top: 10.5%;" >
					<el-icon class="logo-icon" ><img src="/Kajarta_LOGO_03.svg" ></el-icon>
				</RouterLink>
				
			</div>

			<div class="col-12">
        <div class="row">
          <div class="col-3" style="overflow: hidden;">
            <img src="/loading_img.jpg" class="card-image" style="height: 100%; width: auto;">
          </div>
          <div class="col-9" style="overflow: hidden; background-color: white; padding: 0 50px;">
            <div style="display: flex;justify-content: flex-end; padding-top: 18%; padding-bottom: 8%;">
              <h1 style="font-size: 60px;">Member Login</h1>
            </div>
            <div style="display: flex;justify-content: flex-start; border-bottom: 2px solid #a33238;margin-bottom: 5%;" >
            <h3>Life's tough,<br>but working for a living must go on.</h3></div>
            <form @submit.prevent="handleSubmit">
              <div class="labelAndinput" style="border-bottom: 1px solid #a3323821;">
                  <label for="username">帳號&nbsp;&nbsp;:&nbsp;&nbsp;</label>
                  <input type="text" id="username" v-model="username" class="input-field" required>
              </div>  
              <div class="labelAndinput" style="border-bottom: 1px solid #a3323821;">
                  <label for="password">密碼&nbsp;&nbsp;:&nbsp;&nbsp;</label>
                  <input type="password" id="password" v-model="password" class="input-field" required>
              </div> 
              <div style="margin-top: 5%;">
                <button type="submit" class="submit-button">登入</button>
              </div>
              <div v-if="loginMessage" class="alert alert-success mt-3">
                {{ loginMessage }}
              </div>
           </form> 
        </div>
				</div>
			</div>
		</div>
	</div>
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
				timer: 1500, 
				showConfirmButton: false
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
					text: data.msg || '帳號或密碼錯誤',
          timer: 1500, 
				showConfirmButton: false
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

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

html, body {
  height: 100%; /* 确保 HTML 和 Body 元素占满整个页面高度 */
  width: 100%;
  margin: 0; /* 去除默认的边距 */
  padding: 0; /* 去除默认的内边距 */
}

.card-wrapper {
  background-color: #fff5eb; /* 设置 .card 后面的背景颜色 */
  position: absolute; /* 确保 .card-wrapper 填满整个视口 */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex; /* 使用 Flexbox 以使子元素居中对齐 */
  justify-content: center; /* 水平居中对齐子元素 */
  align-items: center; /* 垂直居中对齐子元素 */
  margin: 0; /* 去除默认的边距 */
  padding: 0; /* 去除默认的内边距 */
  
}

.p-text {
  width: 90%; /* 调整底线的长度 */
  border-bottom: 1px solid #a33238;
  font-size: 25px;
  margin-top: 70px;
 
}

.header-container {
  padding: 15%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}



.logo-icon {
  width: 600px; 
}

.header-text {
  font-size: 2em; /* 增大标题字体 */
  font-weight: bold;
  color: #a33238;
}

.card {
  width: 170%; /* 确保卡片宽度是可用空间的 100% */
  max-width: 1200px; /* 设置卡片最大宽度 */
  margin: auto;
  padding: 30px; /* 增加卡片内边距 */
  background-color: #fff5eb;
}

.card-content {
  display: flex;
  align-items: flex-start;
  background-color: white;
  font-weight: bold;
  color: #a33238;
  width: 100%; 
}

.card-image {
  width: 50%; 
  margin-right: 30px; /* 增加图片右边距 */
}

.form-container {
  flex: 2; 
  display: flex;
  flex-direction: column;
  justify-content: center;
}



.input-field {
  width: calc(100% - 120px); /* 计算宽度以适应标签 */
  padding: 10px; /* 增加输入框内边距 */
  border: none;
  background-color: unset;
  font-size: 1.2em; /* 增大输入框字体 */
}

.submit-button {
  width: 100%;
  
  height: 50px; /* 设置按钮高度 */
  padding: 15px; /* 增加按钮内边距 */
  border: none;
  background-color: #a33238;
  color: white;
  cursor: pointer;
  display: flex; /* 使用 Flexbox */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  font-size: 1.2em; /* 增大按钮字体 */
}

.submit-button:hover {
  background-color: #52191c;
}

.alert {
  margin-top: 20px; /* 增大警告框与表单的间距 */
  font-size: 1.2em; /* 增大警告框字体 */
}


h1,h3 {
  font-family: "Ubuntu", sans-serif;
    color: #a33238;
    font-weight: 900;
}

.labelAndinput{
    color: #a33238;
    font-weight: 900;
    font-size: 20px;
    letter-spacing: 3px;
}

.labelAndinput input{
  outline: none;
    color: #a33238;
    font-weight: 900;
    font-size: 20px;
    letter-spacing: 3px;
}
.labelAndinput input:focus{
    color: #a33238;
    font-weight: 900;
    font-size: 20px;
    letter-spacing: 3px;
   
}
</style>
