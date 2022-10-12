<template>
  <el-table :data="resPlayList" stripe style="width: 100%"
            @row-click="PlayMusic">
    <template slot-scope="scope">
      <el-button type="primary" @click="PlayMusic(scope.row)"></el-button>
    </template>
    <el-table-column prop="al.name" label="简介" width="100"/>
    <el-table-column prop="ar[0].name" label="歌手" width="100"/>
    <el-table-column prop="name" label="歌曲名称"/>
    <el-table-column prop="dt" label="时长"/>
  </el-table>
</template>

<script>
import { getMusicUrlAPI, getPlayListresAPI } from '@/api'
import { reactive, ref } from 'vue'
import store from '@/store'
import axios from 'axios'

export default {
  name: "PlayList",
  setup () {
    let id = ref()
    let resPlayList = store.state.resPlayList = ref()

    function PlayMusic (PlayList) {
      id.value = PlayList.id
      getMusicUrlAPI(id.value).then(res => {
        store.state.musicUrl = res.data.data[0].url
      }).catch(err => {
        console.log(err)
      })

    }

    return {
      resPlayList,
      PlayMusic
    }
  }
}
</script>

<style scoped>

</style>
