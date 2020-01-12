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
        <img src="https://vehicle-1231.oss-cn-beijing.aliyuncs.com/epc-asset/amVehicleExport/2020-01-12/7f8a54840c1143a1917a9606bf9f12c5.png" style="width:180px">
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
