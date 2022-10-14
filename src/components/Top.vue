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
    <div class="center">个人中心</div>
  </div>
  <!-- 匹配结果展示部分-->
  <div class="ResBox" v-if="Find">
    <ul>
      <li v-for="(item,index) in myResult" @click="toTheResult">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getMyresult } from '@/api'
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

    function login () {
      store.state.isdisapper=!store.state.isdisapper
    }

    return {
      toResult,
      Result,
      ToResultplace,
      myResult,
      Find,
      // toTheResult
      login,
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
  margin-left: 10px;
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
</style>
