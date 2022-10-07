<template>
  <!--  tag标签-->
  <div class="el-tabs">
    <el-tabs type="card" id="el-tabs">

      <el-tab-pane label="发现音乐" name="FindMusic">
        <!--发现音乐组件-->
        <FindSong/>
      </el-tab-pane>

      <el-tab-pane label="推荐歌单">
        <RePlayList/>
      </el-tab-pane>
      <el-tab-pane label="最新音乐">Role</el-tab-pane>
      <el-tab-pane label="最新MV">Task</el-tab-pane>
    </el-tabs>
  </div>
  <!--  <h1>{{ banner}}</h1>-->
</template>

<script>
import FindSong from '@/components/FindSong'
import RePlayList from '@/components/RePlayList'

export default {
  name: "MyTab",
  components: {
    RePlayList,
    FindSong
  },
  setup () {

  }
}
</script>

<style scoped>
#el-tabs {
  width: 100%;
}
</style>
