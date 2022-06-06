<script lang="tsx">
import { defineComponent, ref, resolveComponent } from "vue"
import { getUsers } from "@/api/test"
import { getImageUrl } from "@/utils"
import { cloneDeep } from "lodash-es" // 按需加载 减少lodash打包大小
export default defineComponent({
  name: "HomePage",
  setup() {
    const value1 = ref("")
    getUsers().then((r) => {
      console.log(r.data)
    })
    return {
      value1
    }
  },
  render() {
    let com = resolveComponent("test-com")
    let d = cloneDeep({ name: 123 })
    console.log(d)
    return (
      <div class={"red"}>
        home-page hello world
        <svg-icon name={"phone"} />
        <el-button type={"primary"}>success</el-button>
        <el-date-picker v-model={this.value1} type="date" placeholder="Pick a day" />
        <img src={getImageUrl("logo")} />
        <img src={getImageUrl("1")} />
        <com />
      </div>
    )
  }
})
</script>

<style scoped lang="scss">
.red {
  color: red;
}
</style>
