<template>
  <!--  选择表单-->
  <el-select v-model="value1" class="m-2" placeholder="地区" size="default"
             @change="myChoosefn1">
    <el-option
        v-for="item in Foptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <el-select v-model="value2" class="m-2" placeholder="类型" size="default"
             @change="myChoosefn2">
    <el-option
        v-for="item in Soptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <el-select v-model="value3" class="m-2" placeholder="排序" size="default"
             @change="mychoosefn3">
    <el-option
        v-for="item in Toptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <!--  内容渲染-->
  <h2 style="padding-left: 8px">推荐MV</h2>
  <div class="demo-image__placeholder">
    <div class="block" v-for="(item,index) in MVs" :key="index">
      <el-image :src="item.cover">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
      <span class="demonstration">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { getMVsAPI } from '@/api'

export default {
  name: "MVs",
  setup () {
    let space = ref('全部')// 地区
    let kind = ref('全部')// 类型
    let queny = ref('上升最快')// 排序
    let MVs = ref()// 储存mv
    const Foptions = reactive([{
      value: "全部",
      label: "全部"
    }, {
      value: "内地",
      label: "内地"
    },
      {
        value: "欧美",
        label: "欧美"
      }, {
        value: "港澳台",
        label: "港澳台"
      }, {
        value: "韩国",
        label: "韩国"
      }, {
        value: "日本",
        label: "日本"
      }])
    const Soptions = reactive([{
      value: "官方版",
      label: "官方版"
    }, {
      value: "原生",
      label: "原生"
    },
      {
        value: "现场版",
        label: "现场版"
      }, {
        value: "网易出品",
        label: "网易出品"
      }, {
        value: "最新",
        label: "最新"
      }])
    const Toptions = reactive([{
      value: "上升最快",
      label: "上升最快"
    }, {
      value: "最热",
      label: "最热"
    },
      {
        value: "最新",
        label: "最新"
      }])

    // 获取mv
    async function getMvsFn () {
      getMVsAPI(space.value, kind.value, queny.value).then(res => {
        MVs.value = res.data.data
        console.log(MVs)
      }).catch(err => {
        console.log(err)
      })
    }

    getMvsFn()

    // 选中的地区内容发生改变的时候调用，赋值我选中的内容
    function myChoosefn1 (value1) {
      space.value = value1
      getMvsFn()
    }

    function myChoosefn2 (value2) {
      kind.value = value2
      getMvsFn()
    }

    function mychoosefn3 (value3) {
      queny.value = value3
      getMvsFn()
    }

    return {
      Foptions,
      Soptions,
      Toptions,
      myChoosefn1,
      myChoosefn2,
      mychoosefn3,
      MVs
    }
  }
}
</script>

<style scoped>
.m-2 {
  width: 30%;
  height: 40px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 10px;
}

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
