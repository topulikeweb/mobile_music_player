<template>
  <!--  tag标签-->
  <div class="el-tabs">
    <el-tabs type="card" id="el-tabs" v-model="activetab">

      <el-tab-pane label="发现音乐" name="发现音乐">
        <!--发现音乐组件-->
        <FindSong/>
      </el-tab-pane>

      <el-tab-pane label="推荐歌单">
        <RePlayList/>
        <!--        <router-link to="/PlayList"></router-link>-->
      </el-tab-pane>

      <el-tab-pane label="最新音乐">
        <Songs/>
      </el-tab-pane>

      <el-tab-pane label="最新MV">
        <MVs/>
      </el-tab-pane>

      <el-tab-pane label="我喜欢的歌曲">
        <MyLove/>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!--  <h1>{{ banner}}</h1>-->
</template>

<script>
import FindSong from '@/components/FindSong'
import RePlayList from '@/components/RePlayList'
import { ref } from 'vue'
import Songs from '@/components/Songs'
import MVs from '@/components/MVs'
import MyLove from '@/components/MyLove'

export default {
  name: "MyTab",
  components: {
    MyLove,
    MVs,
    Songs,
    RePlayList,
    FindSong
  },
  setup () {
    let activetab = ref('发现音乐')
    return {
      activetab
    }
  }
}
</script>

<style scoped>
#el-tabs {
  width: 100%;
}
</style>
