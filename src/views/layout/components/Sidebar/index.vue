<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">2
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <a href="/">
        <img src="@/assets/img/logo.jpeg" style="width:180px;border-right:1px rgb(48, 65, 86) solid;">
      </a>
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      <sidebar-item v-for="route in routes2" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'
import store from '@/store'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    routes2() {
      return store.getters.addRouters
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
