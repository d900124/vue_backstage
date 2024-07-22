// store.js 處理vuex
import { createStore } from 'vuex';
import axiosapi from '@/plugins/axios';

const store = createStore({
    state: {
        employeeInfo: {}
    },
    mutations: {
        setEmployeeInfo(state, employeeInfo) {
            console.log('Setting employee info:', employeeInfo);
            state.employeeInfo = employeeInfo;
        }
    },
    actions: {
        async fetchEmployeeInfo({ commit }, username) {
            try {
                const response = await axiosapi.get(`/employee/info/username/${username}`);
                const data = response.data;
                console.log('Employee info:', data);
                commit('setEmployeeInfo', data);
            } catch (error) {
                console.error('Failed to fetch employee info', error);
            }
        }
    }
});

export default store;
