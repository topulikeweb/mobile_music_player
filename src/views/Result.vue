<template>
  <el-table :data="MyResult" stripe style="width: 100%" @row-click="PlayMusic">
    <template slot-scope="scope">
      <el-button type="primary" @click="PlayMusic(scope.row)"></el-button>
    </template>
    <el-table-column prop="name" label="歌名" width="150"/>
    <el-table-column prop="artists[0].name" label="歌手" width="150"/>
    <el-table-column prop="duration" label="时长"/>
  </el-table>
</template>

<script>
import store from '@/store'
import { ref } from 'vue'
import { getsongurlAPI } from '@/api'

export default {
  name: "Result",
  setup () {
    let MyResult = store.state.resPlayList = ref()// 搜索到的数据
    let id = ref()// 想要播放的歌曲的id

    // 播放音乐
    function PlayMusic (data) {
      id.value = data.id
      getsongurlAPI(id.value).then(res => {
        store.state.musicUrl = res.data.data[0].url
      }).catch(err => {
        console.log(err)
      })
    }

    return {
      MyResult,
      PlayMusic
    }
  }
}
</script>

<style scoped>

</style>
