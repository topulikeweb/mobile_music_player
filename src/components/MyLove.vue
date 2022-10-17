<template>
  <!--  <ul class="Mytitle">-->
  <!--    <li>封面</li>-->
  <!--    <li>歌曲名</li>-->
  <!--    <li>时长</li>-->
  <!--  </ul>-->
  <!--  <ul class="songList">-->
  <!--    <li>2</li>-->
  <!--    <li>2</li>-->
  <!--    <li>23</li>-->
  <!--    <li>2</li>-->
  <!--  </ul>-->
  <el-table :data="arrList" style="width: 100%;margin-left: 2%"
            @row-click="PlayMusic">
    <template slot-scope="scope">
      <el-button type="primary" @click="PlayMusic(scope.row)"></el-button>
    </template>
    <el-table-column prop="alia[0]" label="简介" width="130"/>
    <el-table-column prop="name" label="歌名" width="120"/>
    <el-table-column prop="dt" label="时长"/>
  </el-table>
</template>

<script>
import { reactive, ref } from 'vue'
import { getMusicDetil, getMusicUrlAPI, userLikeListAPI } from '@/api'
import store from '@/store'

export default {
  name: "MyLove",
  setup () {
    let likelist = ref()
    let uid = ref(localStorage.getItem('uid'))
    let arr = ref()
    let arrList = ref([])// 歌曲详情列表

    async function getLikeListFn () {
      // const { data: res } = userLikeListAPI(uid.value)
      // if (res.code !== 200) {
      //   console.log(res)
      // } else {
      //   console.log('请求喜爱歌曲失败')
      // }
      console.log(11, JSON.parse(localStorage.getItem('uid')))
      if (localStorage.getItem('token')) {
        userLikeListAPI(uid.value).then(res => {
          likelist.value = res.data.ids //用户喜欢音乐的id
          arr.value = likelist.value.length
          // 拿到请求出来的喜欢歌曲的id的数组，然后循环对每一个id进行请求，获取id相应的详情
          for (let i = 0; i < arr.value; i++) {
            getMusicDetil(likelist.value[i]).then(res => {
              // 将请求出来的歌曲详情加到数组，到时候方便遍历渲染
              arrList.value.push(res.data.songs[0])
              // console.log(res.data.songs[0])
            }).catch(err => {
              console.log(err)
            })
          }
          console.log(arrList)
        }).catch(err => {
          console.log(err)
        })
      }
    }

    // 播放音乐
    async function PlayMusic (item) {
      const { data: res } = await getMusicUrlAPI(item.id)
      if (res.code !== 200) {
        console.log('请求歌曲url失败')
      } else {
        // console.log(res.data[0].url)
        store.state.musicUrl = res.data[0].url
      }
    }

    getLikeListFn()// 获取用户喜欢列表的所有歌曲的id
    return {
      // likelist
      arrList,
      PlayMusic
    }
  }
}
</script>

<style scoped>
.Mytitle {
  list-style: none;
  font-size: 17px;
  font-weight: 500;
  color: #687283;
}

.Mytitle li {
  float: left;
  margin-left: 10%;
  margin-right: 8%;
}

.songList li {
  float: left;
}

.songList {
  list-style: none;
}
</style>
