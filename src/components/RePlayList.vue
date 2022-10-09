<template>
  <div>
    <div class="ReImg">
      <img :src="outImg">
      <!--    <img :src="outImg.name" v-for="(item) in outImg">-->
    </div>
    <!--  分类的tab标签-->
    <el-tabs class="demo-tabs" @tab-change="handleClick"
             v-model="activetab">
      <el-tab-pane label="全部" name="全部">
      </el-tab-pane>
      <el-tab-pane label="欧美" name="欧美" @click="ListData.tag='欧美'">
      </el-tab-pane>
      <el-tab-pane label="华语" name="华语" @click="ListData.tag='华语'">
      </el-tab-pane>
      <el-tab-pane label="摇滚" name="摇滚" @click="ListData.tag='摇滚'">
      </el-tab-pane>
      <el-tab-pane label="民谣" name="民谣" @click="ListData.tag='民谣'">
      </el-tab-pane>
      <el-tab-pane label="电子" name="电子" @click="ListData.tag='电子'">
      </el-tab-pane>
      <el-tab-pane label="轻音乐" name="轻音乐" @click="ListData.tag='轻音乐'">
      </el-tab-pane>
      <el-tab-pane label="影视原声" name="影视原声"
                   @click="ListData.tag='影视原声'">
        影视原声
      </el-tab-pane>
    </el-tabs>
  </div>

  <h2 style="padding-left: 8px">推荐歌单</h2>
  <div class="demo-image__placeholder">
    <div class="block" v-for="(item,index) in PlayList" :key="index">
      <el-image :src="item.coverImgUrl">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
      <span class="demonstration">{{ item.name }}</span>
    </div>
  </div>
  <!--  分页按钮-->
  <el-pagination background layout="prev, pager, next" :total="1000"
                 @current-change="toPageFn" :current-page="ListData.Page"/><!--c...p是高亮选中的页数标签-->
</template>

<script>
import { getListDateAPI, getoutImgAPI } from '@/api'
import { reactive, ref } from 'vue'

export default {
  name: "MyRePlayList",
  setup () {
    let outImg = ref()
    let ListData = reactive({
      limit: 6,
      Page: 1,// 页数
      cat: '',
    })
    let PlayList = ref()// 获取的歌单数据
    let activetab = ref('全部') // 默认选中的tab标签

    // elementPlusTabs标签上的属性，切换标签的时候就会调用
    function handleClick (name) {
      ListData.cat = name// 先给cat赋值，告诉类别
      // console.log(ListData.cat)
      // ListData.Page = 1
      toPageFn(1)
      getListdataFn() // 进行歌单的请求
    }

    async function getoutImgFn () {
      const { data } = await getoutImgAPI()
      if (data.code !== 200) {
        this.$message.error('获取封面失败')
      } else {
        outImg.value = data.playlists[0].coverImgUrl// 只取第一张当封面
        // console.log(outImg)
      }
    }

    // 获取歌曲列表的数据请求
    function getListdataFn () {
      getListDateAPI(ListData).then(res => {
        PlayList.value = res.data.playlists
        // console.log(PlayList)
      }).catch(err => {
        console.log(err)
      })
    }

    getListdataFn()//初始化的时候就调用一次
    getoutImgFn()

    // // async function getListDataFn () {
    // //   const { data } = await getListDateAPI(ListData)
    // //   if (data.status !== 0) {
    // //     console.log('请求歌曲失败')
    // //   } else {
    // //     PlayList.value=data
    // //     console.log(111,data)
    // //   }
    // }
    function toPageFn (page) {
      ListData.Page = page// page是新的当前页
      getListdataFn()
    }


    return {
      handleClick,
      outImg,
      ListData,
      PlayList,
      activetab,
      getListdataFn,
      toPageFn,
      currentPage
      // getListDataFn
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
