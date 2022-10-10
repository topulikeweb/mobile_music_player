<template>
  <!-- 播放标签 -->
  <div class="player">
    <!-- autoplay 自动播放,当我路径能放歌曲的时候就会播放音乐 -->
    <audio :src='musicUrl' controls autoplay></audio>
  </div>
</template>

<script>

import store from '@/store'

export default {
  name: "Footer",
  setup () {
    let musicUrl = store.state.musicUrl
    // console.log(musicUrl)
    return {
      musicUrl
    }
  }
}
</script>

<style scoped>
.player {
  position: fixed;
  width: 80%;
  margin-left: 10%;
  bottom: 150px;


}
</style>
