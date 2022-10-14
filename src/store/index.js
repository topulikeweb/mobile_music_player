import { App, ref } from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex'


export default createStore({
  state: {
    // 歌曲的id
    id: '',
    // 请求到的数据
    resPlayList: '',
    resMyList: '',
    musicUrl: 'http://m7.music.126.net/20200303182550/8aa5971b1630d1527a922ccd2b97f392/ymusic/035d/0109/520e/478f86cc9f6c6539f7c8ed3e06c1bf8e.mp3',
    MVurl: '',// 音乐播放地址
    isdisapper:'true'// 点击登录按钮其他组件消失
  }
})
