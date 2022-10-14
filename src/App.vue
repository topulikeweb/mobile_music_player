<template>
  <div class="routerIN"></div>
  <Top/>
  <div class="isdisappear" v-if="isapper">
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="5" class="el">
          <template v-slot:title>
            <i class="title">TO RESULT</i>
          </template>
          <div>
            <router-view></router-view>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <Tab/>
    <!--  <router-view></router-view>-->
    <Footer/>
    <div class="div"></div><!--在最底部设置一个div空盒子，就可以看到底部了，解决滑不到底部的问题-->
  </div>

  <div class="Userlogin" v-if="!isapper">
    <div class="wel">欢迎登陆</div>
    <div class="input">
      <div class="accont">手机号</div>
      <input type="text" v-model="phone">
      <div class="password">密码</div>
      <input type="password" v-model="password">
      <button>登录</button>
    </div>
  </div>
</template>

<script>

import Top from '@/components/Top'
import Tab from '@/components/Tab'
import Footer from '@/components/Footer'
import store from '@/store'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    Footer,
    Top,
    Tab
  },
  setup () {
    let isapper = store.state.isdisapper = ref()
    // console.log(222, isdisappe.value)
    let phone = ref()// 用户输入的手机号
    let password = ref()// 用户输入的密码
    return {
      isapper,
      password,
      phone
    }
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}

html {
  font-size: 15px;
  color: #464648;
  padding: 0;
  margin: 0;
  background-color: #e8f3fd;
}

.div {
  height: 210px;
}

.face {
  width: 100%;
  height: 100%;
  background-color: #475669;
  z-index: 999;
  position: absolute;
  top: 0;
}

.title {
  font-size: 18px;
  font-style: normal;
  margin-left: 40%;
  color: #dd001b;
}

.Userlogin {
  height: 30%;
  width: 70%;
  margin: 30px auto;
  position: absolute;
  background-color: #c0bfbf;
  top: 80px;
  left: 55px;
  border-radius: 15px;
}

.input {
  margin: 65px auto;
  margin-left: 40px;
}

input {
  margin-top: 30px;
  height: 20px;
  width: 180px;
  border-radius: 8px;
  text-indent: 1.5em;
  font-size: 16px;
}

.wel {
  position: absolute;
  top: 20px;
  left: 80px;
  font-size: 30px;
  font-weight: 550;
  color: #dd001b;
}

.accont {
  position: absolute;
}

.password {
  position: absolute;
}

button {
  width: 40%;
  height: 40px;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 30px;
  background-color: #dd001b;
  font-size: 25px;
}
</style>
