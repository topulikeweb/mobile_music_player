<template>
  <el-carousel height="145px" direction="vertical" :autoplay="true">
    <el-carousel-item v-for="(item,index) in banner" :key="index">
      <img :src="item.imageUrl">
    </el-carousel-item>
  </el-carousel>
  <!--  请求出来的推荐歌曲列表-->
  <h2 style="padding-left: 8px">推荐歌单</h2>
  <div class="demo-image__placeholder">
    <div class="block" v-for="(item,index) in PlayList" :key="index"
         @click="toPlayList(item.id)">
      <el-image :src="item.picUrl">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
      <span class="demonstration">{{ item.name }}</span>
    </div>
  </div>

  <h2>最新歌单</h2>
  <div class="demo-image__placeholder">
    <div class="block" v-for="(item,index) in NewPlayList" :key="index"
         @click="toPlayList(item.id)">
      <el-image :src="item.picUrl">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
      <span class="demonstration">{{ item.name }}</span>
    </div>
  </div>

  <h2>最新MV</h2>
  <div class="demo-image__placeholder">
    <div class="block" v-for="(item,index) in MVs" :key="index"
         @click="toMVs(item.id)">
      <el-image :src="item.picUrl">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
      <span class="demonstration">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import router from '@/router'
import {
  getimgAPI, getMVurlAPI,
  getNewMVAPI,
  getNewPlayListAPI,
  getPlayListAPI, getPlayListresAPI
} from '@/api'
import { ElNotification } from 'element-plus'
import store from '@/store'

export default {
  name: "MyTab",
  setup () {
    let banner = ref()// 存放轮播图图片
    let PlayList = ref()// 存放请求出来的推荐歌曲
    let NewPlayList = ref()// 存放最新音乐
    let MVs = ref()// 存放最新MV
    let resPlayList = ref() //存放点击专辑请求到的歌曲

// 获取轮播图图片
    async function getImgFn () {
      const { data } = await getimgAPI()
      if (data.code !== 200) {
        this.$message.error('请求轮播图失败')
      } else {
        // console.log(banner)
        banner.value = data.banners.slice(0, 4)// 只需要前四张图// 这里是响应式，ref要用value才能获取到banner的值，才能修改他
      }
    }

// 获取推荐歌单
    async function getPlayListFn () {
      const { data } = await getPlayListAPI()
      if (data.code !== 200) {
        // this.$message.error('请求推荐列表失败')
      } else {
        // this.$message.success('请求推荐列表成功')
        // console.log(data)
        PlayList.value = data.result
        // console.log('请求到的推荐歌单',PlayList)
      }
    }

// 获取最新歌单
    async function getnewPlayList () {
      const { data } = await getNewPlayListAPI()
      if (data.code !== 200) {
        console.log('请求最新歌单失败')
      } else {
        NewPlayList.value = data.result
        // console.log(NewPlayList)
      }
    }

// 获取推荐mv
    async function getNewMVFn () {
      const { data } = await getNewMVAPI()
      if (data.code !== 200) {
        console.log('请求最新mv失败')
      } else {
        MVs.value = data.result
        console.log('1', MVs)
      }
    }

    function toPlayList (id) {
      store.state.id = id
      // console.log(id)

      getPlayListresAPI(id).then(res => {
        store.state.resPlayList = res.data.playlist.tracks
        resPlayList.value = store.state.resPlayList
        // console.log(resPlayList.value.length)
        // console.log(store.state.resPlayList[1].dt)
        FormTime()
        router.push('/PlayList')
      }).catch(err => {
        console.log(err)
      })
      // console.log(store.state.id)
    }

    function FormTime () {
      for (let i = 0; i < resPlayList.value.length; i++) {
        let times = store.state.resPlayList[i].dt
        let min = parseInt(times / 1000 / 60)
        let second = parseInt(times / 1000 % 60)
        min = min < 10 ? '0' + min : min
        // console.log(min)
        second = second < 10 ? '0' + second : second
        resPlayList.value[i].dt = `${min}:${second}`
        // console.log(111,store.state.resPlayList[i].dt)
      }
    }

    // 播放MV
    function toMVs (id) {
      router.push('/mv')
      // console.log(store.state.MVurl)
      getMVurlAPI(id).then(res => {
        store.state.MVurl = res.data.data.url
      }).catch(err => {
        console.log(err)
      })

    }

    getImgFn()
    getPlayListFn()
    getnewPlayList()
    getNewMVFn()
    // FormTime()
    return {
      banner,
      PlayList,
      NewPlayList,
      MVs,
      toPlayList,
      resPlayList,
      toMVs
    }
  },
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel {
  margin-top: 20px;
}

img {
  width: 100%;
  height: 100%;
}

.demo-image__placeholder .block {
  padding: 10px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image__placeholder .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 10px;
}

.demo-image__placeholder .el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
}

.demo-image__placeholder.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.demo-image__placeholder .dot {
  animation: dot 2s infinite steps(3, start);
  overflow: hidden;
}
</style>
