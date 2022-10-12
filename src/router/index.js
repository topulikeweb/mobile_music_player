import { createRouter, createWebHistory } from "vue-router";
import mv from '@/views/mv'


const routes = [{
  path: '/PlayList',
  name: 'PlayList',
  component: () => import('@/views/PlayList')
},
  {
    path: '/mv',
    name: 'mv',
    component: () => import('@/views/mv')
  }, {
    path: '/Result',
    name: 'Result',
    component: () => import('@/views/Result')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
  
})
export default router;
