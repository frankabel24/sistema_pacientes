import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import EditarView from '../views/EditarView.vue'
import NuevoView from '../views/NuevoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView 
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: EditarView 
  },
  {
    path: '/nuevo',
    name: 'nuevo',
    component: NuevoView 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
