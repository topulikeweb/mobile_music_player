<template>
  <div class="player">
    <!-- autoplay 自动播放,当我路径能放歌曲的时候就会播放音乐 -->
    <audio :src='musicUrl' controls autoplay></audio>
  </div>
</template>

<script>
import store from '@/store'
import { ref } from 'vue'

export default {
  name: "Footer",
  setup () {
    let musicUrl = store.state.musicUrl = ref()
    return{
      musicUrl
    }
  }
}
</script>

<style scoped>
.player{
  position: fixed;
  bottom: 150px;
  left: 8%;
}
</style>
