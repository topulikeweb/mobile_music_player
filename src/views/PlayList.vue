<template>
  <el-table :data="resPlayList" stripe style="width: 100%">
    <el-table-column prop="al.name" label="简介" width="100"/>
    <el-table-column prop="ar[0].name" label="歌手" width="100"/>
    <el-table-column prop="name" label="歌曲名称"/>
    <el-table-column prop="dt" label="时长"/>
  </el-table>
</template>

<script>
import { getPlayListresAPI } from '@/api'
import { reactive, ref } from 'vue'
import store from '@/store'

export default {
  name: "PlayList",
  setup () {
    let id = store.state.id = ref()
    let resPlayList = store.state.resPlayList= ref()

    // 转换时间的格式
    // formTime()

    // console.log(12,resPlayList)
    // function getDPlayListFn () {
    //   // console.log(id)
    //   getPlayListresAPI(id).then(res => {
    //     console.log(id)
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //
    //   })
    // }

    // getDPlayListFn()
    return {
      resPlayList
    }
  }
}
</script>

<style scoped>

</style>
