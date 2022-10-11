import { createRouter, createWebHistory } from "vue-router";
import mv from '@/views/mv'


const routes = [{
  path: '/PlayList',
  name: 'PlayList',
  component: () => import('@/views/PlayList')
},
  { path: '/mv',
    name: 'mv',
    component:()=>import('@/views/mv')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
  
})
export default router;
