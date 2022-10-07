<template>
  <!-- 播放标签 -->
  <div class="player">
    <!-- autoplay 自动播放,当我路径能放歌曲的时候就会播放音乐 -->
    <audio :src='musicUrl' controls autoplay></audio>
  </div>
</template>

<script>


export default {
  name: "Footer",
  setup () {
    let musicUrl = 'http://m7.music.126.net/20200303182550/8aa5971b1630d1527a922ccd2b97f392/ymusic/035d/0109/520e/478f86cc9f6c6539f7c8ed3e06c1bf8e.mp3'
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
