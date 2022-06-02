<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import { defineComponent } from "vue"
import zhCn from "element-plus/lib/locale/lang/pt"

export default defineComponent({
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
