<script lang="tsx">
import { defineComponent, ref } from "vue"
import { getUsers } from "@/api/test"
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
    return (
      <div class={"red"}>
        home-page hello world
        <svg-icon name={"phone"} />
        <el-button type={"primary"}>success</el-button>
        <el-date-picker v-model={this.value1} type="date" placeholder="Pick a day" />
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
