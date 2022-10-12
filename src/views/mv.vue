<template>
  <!-- mv -->
  <div class="video-wrap">
    <video
        autoplay
        controls
        :src="MVurl"
    ></video>
  </div>
</template>

<script>
import store from '@/store'
import { ref } from 'vue'

export default {
  name: "mv",
  setup () {
    let MVurl = store.state.MVurl = ref()
    return {
      MVurl
    }
  }
}
</script>

<style scoped>
.video-wrap {
  position: relative;
  left: 11.5%;
  top: 5%;
  height: 250px;
  width: 310px;
  background-color: black;
}

video {
  width: 310px;
  height: 250px;
  position: relative;
  left: 0px;
}
html{
  background-color: #464648;
}
</style>
