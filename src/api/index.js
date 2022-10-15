import axios from '@/utils/request'
// 请求轮播图图片
export const getimgAPI = () => {
  return axios({
    url: '/banner',
    method: 'GET',
    data: {
      limit: 4
    }
  })
}
// 请求推荐歌单
export const getPlayListAPI = () => {
  return axios({
    method: 'GET',
    url: '/personalized',
    params: {
      limit: 4
    }
  })
}
// 请求最新音乐
export const getNewPlayListAPI = () => {
  return axios({
    method: 'GET',
    url: '/personalized/newsong',
    params: {
      limit: 4
    }
  })
}
// 获取最新mv
export const getNewMVAPI = () => {
  return axios({
    method: 'GET',
    url: '/personalized/mv',
    params: {
      limit: 6
    }
  })
}
// 获取封面图片
export const getoutImgAPI = () => {
  return axios({
    method: 'GET',
    url: '/top/playlist/highquality'
  })
}
// 获取歌曲列表
export const getListDateAPI = ({ limit, cat, Page }) => {
  return axios({
    method: 'GET',
    url: '/top/playlist/',
    params: {
      limit, // 限制请求到的数据个数
      cat: cat || '全部',
      offset: (Page - 1) * 10
    }
  })
}
// 获取最新音乐
export const getNewsSongsAPI = (type) => {
  return axios({
    method: 'GET',
    url: 'top/song',
    params: {
      type,
      limit: 8
    }
  })
}
// 获取相应歌曲（id）的音源
export const getMusicUrlAPI = (id) => {
  return axios({
    method: 'GET',
    url: '/song/url',
    params: {
      id
    }
  })
}
// 获取指定mv数据
export const getMVsAPI = (space, kind, queny) => {
  return axios({
    method: 'GET',
    url: '/mv/all',
    params: {
      limit: 8,
      area: space,
      type: kind,
      order: queny
    }
  })
}

export const getPlayListresAPI = (id) => {
  return axios({
    method: 'GET',
    url: 'playlist/detail',
    params: {
      id
    }
  })
}
// 获取指定id歌曲的播放地址
export const getsongurlAPI = (id) => {
  return axios({
    method: 'GET',
    url: 'song/url',
    params: {
      id
    }
  })
}
//获取mv的播放地址
export const getMVurlAPI = (id) => {
  return axios({
    method: 'GET',
    url: 'mv/url',
    params: {
      id
    }
  })
}
// 实现搜索功能
export const getMyresult = (keywords) => {
  return axios({
    method: 'GET',
    url: '/search',
    params: {
      keywords,
      type: 1,
      limit: 10
    }
  })
}
// 用户手机登录
export const loginAPI = (phone, password) => {
  return axios({
    method: 'POST',
    url: '/login/cellphone',
    params: {
      phone,
      password
    }
  })
}
// 获取登录的用户的信息
export const userDetil = (uid) => {
  return axios({
    method: 'GET',
    url: '/user/detail',
    params: {
      uid
    }
  })
}
