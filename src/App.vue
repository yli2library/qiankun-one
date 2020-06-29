<template>
  <div id="app">
    <el-menu
      class="el-menu-vertical-demo"
      mode="horizontal"
      default-active="101"
      text-color="#000"
      active-text-color="#ffd04b">
      <el-menu-item v-for="item in menus" :index="item.index" :key="item.index">
        <router-link active-class="active-link-one" :to="{path: item.path}">
          {{item.title}}
        </router-link>
      </el-menu-item>
    </el-menu>
    <router-view :key="(new Date()).getTime()" />
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      menus: [
        {
          index: "101",
          key: "vue",
          path: "/",
          title: "主页"
        },
        {
          index: '102',
          key: "vue-list",
          path: "/list",
          title: "列表页"
        }
      ]
    }
  },

  computed: {
    currentRoute() {
      const menu = this.menus.find(item => item.route === this.$route.path)
      return menu ? menu.key : "vue";
    }
  },
}
</script>

<style lang="stylus" scoped>
.active-link-one {
  color: #f00;
}
</style>
