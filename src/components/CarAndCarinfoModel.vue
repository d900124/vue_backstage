<template>
        <div class="d-flex flex-row">
    <div class="p-2">
      <div class="d-flex flex-column">
  <!-- =======================品牌======================= -->
    <label>品牌</label>
    <input type="text"  v-model="brand" required />
    <!-- <select v-model="brand" required>
      <option>選擇你要的品牌</option>
      <option>BMW</option>
      <option>袋鼠會吃人</option>
      <option>唐人街拳法</option>
    </select>  -->
  
  <!-- =======================車型======================= -->
    <label >車型</label>
    <input type="text"  v-model="suspension" required />
    <!-- <select v-model="suspension" required>
      <option option value="" disabled>選擇你要的車型</option>
      <option value="suspension 1">轎車</option>
      <option value="suspension 2">休旅車</option>
      <option value="suspension 3">敞篷車</option>
      <option value="suspension 4">跑車</option>
      <option value="suspension 5">吉普車</option>
      <option value="suspension 6">掀背車</option>
    </select>  -->
  
  <!-- =======================馬力======================= -->
    <label >馬力</label>
    <input type="text"  v-model="hp" required />
  
  <!-- =======================扭力======================= -->
    <label >扭力</label>
    <input type="text"  v-model="torque" required />
  
  <!-- =======================排氣量======================= -->
    <label>排氣量</label>
    <input type="text"  v-model="displacement" required />
    <!-- <select v-model="displacement" required>
      <option option value="" disabled>選擇你要的排氣量</option>
      <option value="displacement 1">1200cc以下</option>
      <option value="displacement 2">1201cc-1800cc</option>
      <option value="displacement 3">1801cc-2400cc</option>
      <option value="displacement 4">2401cc-3000cc</option>
      <option value="displacement 5">3001cc-4200cc</option>
      <option value="displacement 6">4201cc-5400cc</option>
      <option value="displacement 7">5401cc以上</option>
    </select>  -->
  
  
  <!-- =======================變速系統======================= -->
    <label>變速系統</label>
    <input type="text"  v-model="transmission" required />
    <!-- <select v-model="transmission" required>
      <option option value="" disabled>選擇你要的引擎燃料</option>
      <option value="transmission 1">自排</option>
      <option value="transmission 2">手排</option>
      <option value="transmission 3">手自排</option>
      <option value="transmission 4">自手排</option>
    </select>  -->
  
  <!-- =======================驅動方式======================= -->
  <label >驅動方式</label>
  <input type="text"  v-model="rearwheel" required />
  <!-- <select v-model="rearwheel" required><
  <option option value="" disabled>選擇你要的驅動方式</option>
      <option value="rearwheel 1">前驅</option>
      <option value="rearwheel 2">後驅</option>
      <option value="rearwheel 3">四驅</option>
  </select> -->
  <!-- =======================引擎燃料======================= -->
    <label for="gasoline">引擎燃料</label>
    <input type="text"  v-model="gasoline" required />
    <!-- <select v-model="gasoline" required>
      <option option value="" disabled>選擇你要的引擎燃料</option>
      <option value="gasoline 1">汽油</option>
      <option value="gasoline 2">柴油</option>
      <option value="gasoline 3">油電複合</option>
      <option value="gasoline 4">純電</option>
    </select>  -->
  
  <!-- =======================車門數======================= -->
    <label for="door">車門數</label>
    <input type="text"  v-model="door" required />
    <!-- <select v-model="door" required>
      <option option value="" disabled>選擇你要的車門數</option>
      <option value="door 1">二門</option>
      <option value="door 2">三門</option>
      <option value="door 3">四門</option>
      <option value="door 4">五門</option>
      <option value="door 5">六門</option>
    </select>  -->
  
  <!-- =======================乘客數======================= -->
    <label for="passenger">乘客數</label>
    <input type="text"  v-model="passenger" required />
    <!-- <select v-model="passenger" required>
      <option option value="" disabled>選擇能容納的乘客數</option>
      <option value="passenger 1">二人座</option>
      <option value="passenger 2">四人座</option>
      <option value="passenger 3">五人座</option>
      <option value="passenger 4">七人座以上</option>
    </select> 
   -->
  <!-- =======================顏色======================= -->
    <label>顏色</label>
    <input type="text" name="color" :value="modelValue.color" @input="doInput('color',$event)" required />
  
  <!-- =======================里程數======================= -->
        <label>里程數</label>
        <input type="text" name="milage" :value="modelValue.milage" @input="doInput('milage',$event)" required />
  
  <!-- =======================出廠年份======================= -->
        <label>年分</label>
        <input type="text" name="productionYear" :value="modelValue.productionYear" @input="doInput('productionYear',$event)" required />
  </div>
</div>


  <div class="p-2">
    <div class="d-flex flex-column">
  <!-- =======================賣家======================= -->
    <label for="customer">賣家</label>
    <input type="text" name="customerId" :value="modelValue.customerId" @input="doInput('customerId',$event)" required />
  
  <!-- =======================管理銷售員======================= -->
    <label for="employee">管理銷售員</label>
    <input type="text" name="employeeId" :value="modelValue.employeeId" @input="doInput('employeeId',$event)" required />
  
  <!-- =======================議價空間======================= -->
    <label for="negotiable">議價空間</label>
    <input type="text" name="negotiable" :value="modelValue.negotiable" @input="doInput('negotiable',$event)" required />
  
  <!-- =======================車況評分======================= -->
    <label for="conditionScore">車況評分</label>
    <input type="text" name="conditionScore" :value="modelValue.conditionScore" @input="doInput('conditionScore',$event)" required />
  
  <!-- =======================停放分店======================= -->
    <label for="branch">停放分店</label>
    <input type="text"  name="branch" :value="modelValue.branch" @input="doInput('branch',$event)" required />
  
  <!-- =======================狀態======================= -->
    <label for="state">狀態</label>
    <input type="text"  name="state" :value="modelValue.state" @input="doInput('state',$event)" required />
  
  
  <!-- =======================售價======================= -->
        <label>價格</label>
        <input type="text" name="price" :value="modelValue.price" @input="doInput('price',$event)" required />
  
  <!-- =======================型號======================= -->
      <label>車輛名稱搜尋</label>
      <input type="text" v-model="selectName" required />
  
  <!-- =======================是否改裝======================= -->
    <label >是否改裝</label>
    <input type="text"  name="remark" :value="modelValue.remark" @input="doInput('remark',$event)" required />

    <label >上架日期</label>
    <input type="text"  name="launchDate" :value="modelValue.launchDate" @input="doInput('launchDate',$event)" required />

    <label >型號</label>
    <input type="text" name="carinfoId" :value="modelValue.carinfoId" @input="doInput('carinfoId',$event)" required />
  </div>
  </div>
</div>

  
<button @click="emits('customInsert')">新增草稿</button>
</template>
    
<script setup >
import { ref } from 'vue'
import axios from 'axios'

const emits = defineEmits(["customInsert"]);
const props = defineProps(["modelValue"]);

function doInput(key,event) {
    emits('update:modelValue'),{
        ...props.modelValue,
        [key]:event.target.value
    };
}


     // const brand = ref('')
// const suspension = ref('')
// const hp = ref('')
// const torque = ref('')
// const displacement = ref('')
// const transmission = ref('')
// const rearwheel = ref('')
// const gasoline = ref('')
// const door = ref('')
// const passenger = ref('')
const color = ref('')
const milage = ref('')
const productionYear = ref('')
const customer = ref('')
const employee = ref('')
const negotiable = ref('')
const conditionScore = ref('')
const branch = ref('')
const state = ref('')
const price = ref('')
// const selectName = ref('')
const remark = ref('')
const launchDate = ref('')
const carinfo_id = ref('')

 const submitForm = async () => {
  const formData = {
    // brand: brand.value,
    // suspension: suspension.value,
    // hp: hp.value,
    // torque: torque.value,
    // displacement: displacement.value,
    // transmission: transmission.value,
    // rearwheel: rearwheel.value,
    // gasoline: gasoline.value,
    // door: door.value,
    // passenger: passenger.value,
    color: color.value,
    milage: milage.value,
    productionYear: productionYear.value,
    customerId: customer.value,
    employeeId: employee.value,
    negotiable: negotiable.value,
    conditionScore: conditionScore.value,
    branch: branch.value,
    state: state.value,
    price: price.value,
    // selectName: selectName.value,
    remark: remark.value,
    launchDate:launchDate.value,
    carinfoId:carinfo_id.value
    
  }
    try {
    const response = await axios.post('http://localhost:8080/kajarta/car/create', formData)
    console.log('Response:', response.data)
  } catch (error) {
    console.error('Error:', error)
  }
}



</script>
    
<style>
    
</style>