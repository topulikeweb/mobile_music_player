<template>
  <!--  选择分类-->
  <el-tabs v-model="activeName" class="demo-tabs"
           @tab-change="handleClick"
           style="margin-left: 40px">
    <el-tab-pane label="全部"></el-tab-pane>
    <el-tab-pane label="华语" :name="7"></el-tab-pane>
    <el-tab-pane label="欧美" :name="96"></el-tab-pane>
    <el-tab-pane label="日本" :name="8"></el-tab-pane>
    <el-tab-pane label="韩国" :name="16"></el-tab-pane>
  </el-tabs>
  <!--  歌曲表单-->
  <!--  <tr class="table">-->
  <!--    <td>音乐标题</td>-->
  <!--    <td>专辑</td>-->
  <!--    <td>歌曲名字</td>-->
  <!--    <td>时长</td>-->
  <!--  </tr>-->
  <el-table :data="SongList" style="width: 100%"
            @row-click="PlayMusic">
    <template slot-scope="scope">
      <el-button type="primary" @click="PlayMusic(scope.row)"></el-button>
    </template>
    <el-table-column prop="album.artists['0'].name" label="歌手名称"
                     width="100"/>
    <el-table-column prop="album.name" label="专辑" width="90"/>
    <el-table-column prop="name" label="歌曲名字"/>
    <el-table-column prop="duration" label="时长"/>
  </el-table>
</template>

<script>

import { getMusicUrlAPI, getNewsSongsAPI } from '@/api'
import { ref } from 'vue'
import store from '@/store'

export default {
  name: "Songs",
  setup () {
    let type = ref() // 请求到的歌曲的类型
    let SongList = ref()// 请求到的歌曲
    let url = ref()// 音乐的地址
    let id = ref()// 歌曲id存放
    let activeName=ref('全部')// 默认tab

    function getNewsSongsFn () {
      getNewsSongsAPI(type.value).then(resolve => {
        // console.log(resolve.data.data[0])
        SongList.value = resolve.data.data.splice(0, 10)
        console.log('11', SongList)
        FormTime()
      }).catch(err => {
        console.log(err.message)
      })
    }

    getNewsSongsFn()// 创建的时候就调用

    // tabs变化的时候调用
    function handleClick (name) {
      type.value = name
      // console.log(name)
      // console.log(111,type.value)
      getNewsSongsFn(type.value)
    }

    // 转换时间的格式
    function FormTime () {
      for (let i = 0; i < SongList.value.length; i++) {
        let times = SongList.value[i].duration
        // console.log(times)
        let min = parseInt(times / 1000 / 60)
        let second = parseInt(times / 1000 % 60)
        min = min < 10 ? '0' + min : min
        // console.log(min)
        second = second < 10 ? '0' + second : second
        SongList.value[i].duration = `${min}:${second}`
      }
    }

    function PlayMusic (item) {
      // console.log(store.state.musicUrl)
      id.value = item.privilege.id
      // alert(111)
      // console.log(id)
      getMusicUrlAPI(id.value).then(res => {
        store.state.musicUrl=res.data.data[0].url
        // console.log(store.state.musicUrl)
      }).catch(err=>{
        console.log(err)
      })

    }

    return {
      handleClick,
      type,
      SongList,
      PlayMusic,
      id,
      activeName
    }
  }
}
</script>

<style scoped>
.table td {
  height: 30px;
  float: left;
  margin-left: 40px;
}
</style>
