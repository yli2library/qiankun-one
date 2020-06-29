<template>
  <div class="about">
    <h1>vueone list page</h1>
    <div>
      应用通信
      <el-button @click="changeInfo" type="primary">one修改state</el-button>
      <div class="detail_info">{{oneInfo}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      oneInfo: {}
    }
  },
  methods: {
    changeInfo() {
      if(this.$setGlobalState) {
        this.$setGlobalState({
          msg: 'one microapp update'
        })
      }
    }
  },
  mounted() {
    if(this.$onGlobalStateChange) {
      // 监听state，当main app的msg发生变化时，修改name，体现在页面上
      this.$onGlobalStateChange((state, prev) => {
        this.oneInfo = state
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.detail_info {
  color: green;
}
</style>
