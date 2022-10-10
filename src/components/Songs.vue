<template>
  <!--  选择分类-->
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick"
           style="margin-left: 40px">
    <el-tab-pane label="全部"></el-tab-pane>
    <el-tab-pane label="华语" :name="7"></el-tab-pane>
    <el-tab-pane label="欧美" :name="96"></el-tab-pane>
    <el-tab-pane label="日本" :name="8"></el-tab-pane>
    <el-tab-pane label="韩国" :name="16"></el-tab-pane>
  </el-tabs>
  <!--  歌曲表单-->
  <el-table :data="SongList" stripe style="width: 100%">
    <el-table-column prop="date" label="音乐标题" width="100%"/>
    <el-table-column prop="name" label="专辑" width="100%"/>
    <el-table-column prop="address" label="歌手"/>
    <el-table-column :prop="" label="时长"/>
  </el-table>
</template>

<script>

import { getNewsSongsAPI } from '@/api'
import { ref } from 'vue'

export default {
  name: "Songs",
  setup () {
    let type = ref() // 请求到的歌曲的类型
    let SongList = ref()// 请求到的歌曲

    function getNewsSongsFn () {
      getNewsSongsAPI().then(resolve => {
        console.log(resolve.data.data[0])
        // SongList.value=resolve.data

      }).catch(err=>{
        console.log(err.message)
      })
    }

    getNewsSongsFn()// 创建的时候就调用

    // tabs变化的时候调用
    function handleClick (name) {
      type.value = name
      console.log(name)
      getNewsSongsFn()
    }

    return {
      handleClick,
      type,
      SongList
    }
  }
}
</script>

<style scoped>

</style>
