<template>
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
  <!--  提示框-->
  <el-alert
      id="el-alert"
      title="登陆成功"
      type="success"
      description="欢迎使用本播放器"
      show-icon
      v-show="Alert1"
  />
  <el-alert
      id="el-alert"
      title="登陆失败"
      type="error"
      description="密码或者手机号不正确"
      show-icon
      v-show="Alert2"
  />
  <div class="background" v-if="!isapper">
    <img src="../public/login-backgroundimg.jpg">
    <div class="Userlogin" v-if="!isapper">
      <div class="wel">欢迎登陆</div>
      <div class="input">
        <div class="accont">手机号</div>
        <input type="number" v-model="phone">
        <div class="password">密码</div>
        <input type="password" v-model="password">
        <button @click="LoginIn" @keydown.enter="LoginIn">登录</button>
      </div>
    </div>
  </div>


</template>

<script>

import Top from '@/components/Top'
import Tab from '@/components/Tab'
import Footer from '@/components/Footer'
import store from '@/store'
import { ref } from 'vue'
import { loginAPI, userDetil } from '@/api'

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
    let Alert1 = ref(false)
    let Alert2 = ref(false)
    let token = store.state.token1 = ref()
    let center = store.state.usercenter = ref()
    let uid = store.state.uid = ref()//登录用户的id
    /**
     * 点击登录进行的操作（判断密码是否正确，是否进行跳转）
     * 因为这里的接口不管密码是正确还是错误都不会进行报错，因此只有在then里面判断
     * @constructor
     */
    function LoginIn () {
      loginAPI(phone.value, password.value).then(res => {
        if (res.data.code === 200) {
          store.state.token = res.data.token
          localStorage.removeItem('token')
          localStorage.setItem('token', store.state.token)// 将token存入本地
          // localStorage.getItem('token') = res.data.token
          Alert1.value = true
          Alert2.value = false
          isapper.value = true// 让登录消失，页面展示
          // console.log(1111, res)
          store.state.uid = res.data.account.id
          console.log(store.state.uid)
          localStorage.setItem('uid', store.state.uid)// 将uid存入本地
        } else {
          Alert1.value = false
          Alert2.value = true
        }
      }).catch(err => {
        console.log(err)
      })
    }

    function istoken () {
      if (localStorage.getItem('token')) {
        isapper.value = true
      }
    }

    istoken()
    return {
      isapper,
      password,
      phone,
      LoginIn,
      Alert1,
      Alert2,
      center
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
  position: relative;
  bottom: 0px;
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
  background-color: whitesmoke;
  opacity: .7;
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
  height: 10%;
  width: 70%;
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

.background img {
  width: 100%;
  height: 100%;
}

#el-alert {
  position: absolute;
  /*float: left;*/
  top: 40px;
}

.mycenter {
  width: 90%;
  height: 200px;
  background-color: #343131;
  position: absolute;
  top: 60px;
  z-index: 999;
  left: 5%;
  opacity: .9;
  border-radius: 15px;
}

.avater {
  position: absolute;
  width: 28%;
  height: 45%;
  border-radius: 60px;
  background-color: #dd001b;
  top: 20px;
  left: 20px;
}

.avater img {
  width: 100%;
  height: 100%;
}

.username {
  font-size: 18px;
  color: #e8f3fd;
  position: absolute;
  left: 50%;
  top: 16%;
}

.phone {
  font-size: 18px;
  color: #e8f3fd;
  position: absolute;
  left: 45%;
  top: 33%;
}

.createtime {
  font-size: 15px;
  color: #e8f3fd;
  position: absolute;
  left: 40%;
  top: 50%;
}
</style>
