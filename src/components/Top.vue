<template>

  <div class="box">
    <div class="login" @click="login">登录</div>
    <!--  input框-->
    <input type="text" placeholder="请输入你想搜索的歌曲"
           @input="toResult(Result)"
           @keydown.enter="ToResultplace"
           v-model="Result"
           @blur="Find=false"
           @focus="Find=true"
    >
    <div class="center" @click="tocenter">个人中心</div>
  </div>
  <!-- 匹配结果展示部分-->
  <div class="ResBox" v-if="Find">
    <ul>
      <li v-for="(item,index) in myResult" @click="toTheResult">
        {{ item.name }}
      </li>
    </ul>
  </div>
  <!--  用户中心页面-->
  <div class="mycenter" v-if="center">
    <div class="avater"><img :src="UserInfo.avatarUrl"></div>
    <div class="username">{{ UserInfo.nickname }}</div>
    <div class="phone">等级：{{ UserInfo.level }}</div>
    <div class="createtime">创建时间：{{ UserInfo.creatTime }}</div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { getMyresult, loginAPI, userDetil } from '@/api'
import store from '@/store'
import router from '@/router'

export default {
  name: "MyTop",
  // props: ['isdisapper','change'],
  setup () {
    // 用户需要查找的内容
    let Result = ref()
    let timer = ref()
    // let isdisapper = ref(isdisapper)
    // function getResult () {
    //   Result.value = Result
    // }
    let myResult = store.state.resPlayList = ref()
    let Find = ref('false') // 控制匹配框是否出现
    let userid = store.state.uid = ref()
    let center = store.state.usercenter = ref()
    let UserInfo = reactive({
      nickname: '',
      creatTime: '',
      avatarUrl: '',
      level: ''
    })
    let token = ref()

    // let isdisapper = store.state.isdisapper = ref()

    function toResult (Result) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        getMyresult(Result).then(res => {
          myResult.value = store.state.resPlayList = res.data.result.songs
          console.log(111, myResult.value)
          FormTime()
        }).catch(err => {
          console.log(err)
        })
      }, 200)
      Find.value = true
    }

// 点击回车跳转页面
    function ToResultplace () {
      router.push('/Result')
      getMyresult()
    }

// 点击获取的结构的时候调用
//     function toTheResult (e) {
//       Result.value = e.target.innerText // 将我点击的值放到input框中
//       router.push('/Result')
//       // Result.value = ''// 清空搜索框的内容
//     }
    // 转换时间的格式
    function FormTime () {
      for (let i = 0; i < myResult.value.length; i++) {
        let times = myResult.value[i].duration
        // console.log(times)
        let min = parseInt(times / 1000 / 60)
        let second = parseInt(times / 1000 % 60)
        min = min < 10 ? '0' + min : min
        // console.log(min)
        second = second < 10 ? '0' + second : second
        myResult.value[i].duration = `${min}:${second}`
      }
    }

// 点击登录按钮根据token进行切换
    function login () {
      token.value = localStorage.getItem('token')
      if (token.value) {
        if (confirm('你已经登陆了')) {
          store.state.isdisapper = !store.state.isdisapper
        }
      } else {
        alert('你还没有登陆')
      }
      // loginAPI(phone.value,password)
    }

// 点击‘个人中心’展示个人中心页面
    function tocenter () {
      if (!localStorage.getItem('token')) {
        alert('您还没有登录')
      } else {
        store.state.usercenter = !store.state.usercenter
        getuserDetil()// 获取用户信息
      }
    }

// 获取用户信息
    function getuserDetil () {
      console.log(userid.value)
      userDetil(localStorage.getItem('uid')).then(res => {
        UserInfo.nickname = res.data.profile.nickname
        UserInfo.avatarUrl = res.data.profile.avatarUrl
        UserInfo.creatTime = res.data.profile.createTime
        UserInfo.level = res.data.level
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }

    return {
      toResult,
      Result,
      ToResultplace,
      myResult,
      Find,
      tocenter,
      // toTheResult
      login,
      center,
      UserInfo,
      token
    }
  }
}
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

.box {
  width: 100%;
  height: 45px;
  background-color: #dd001b;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px auto;
  line-height: 45px;
}

input {
  width: 200px;
  height: 20px;
  margin: auto;
  border-radius: 10px;
  border: solid 1px black;
  font-size: 15px;
  padding-left: 10px;
}

.login {
  font-size: 18px;
  margin-left: 10px;;
  height: 20px;
}

.center {
  font-size: 18px;
  margin-right: 10px;
}

.ResBox {
  width: 65%;
  position: absolute;
  background-color: white;
  z-index: 2;
  left: 60px;
  top: 50px;
  border-radius: 10px;

}

.ResBox ul {
  list-style: none;
  font-size: 18px;
}

.ResBox ul li {
  margin-top: 10px;
  text-indent: 1.3em;
}

.ResBox ul li:hover {
  background-color: silver;
  font-size: 21px;
}

.login:hover {
  font-size: 22px;
  color: #d3dce6;
}
</style>
