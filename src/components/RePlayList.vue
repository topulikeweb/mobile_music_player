<template>
  <div>
    <div class="ReImg">
      <img :src="outImg">
      <!--    <img :src="outImg.name" v-for="(item) in outImg">-->
    </div>
    <!--  分类的tab标签-->
    <el-tabs class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getoutImgAPI } from '@/api'
import { ref } from 'vue'

export default {
  name: "MyRePlayList",
  setup () {
    let outImg = ref()

    function handleClick (tab, event) {
      console.log(tab, event)
    }

    async function getoutImgFn () {
      const { data } = await getoutImgAPI()
      if (data.code !== 200) {
        this.$message.error('获取封面失败')
      } else {
        outImg.value = data.playlists[0].coverImgUrl// 只取第一张当封面
        console.log(outImg)
      }
    }

    getoutImgFn()
    return {
      handleClick,
      outImg
    }
  }
}
</script>

<style scoped>
.ReImg {
  width: 90%;
  height: 180px;
  background-color: blue;
  margin: 10px auto;
  border-radius: 10px;
}

.ReImg img {
  width: 100%;
  height: 100%;
}
</style>
