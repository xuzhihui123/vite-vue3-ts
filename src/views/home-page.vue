<script lang="tsx">
import { defineComponent } from "vue"
import { getUsers } from "@/api/test"
export default defineComponent({
  name: "HomePage",
  setup() {
    getUsers().then((r) => {
      console.log(r.data)
    })
    return {}
  },
  render() {
    return (
      <div class={"red"}>
        home-page hello world
        <el-button type={"primary"}>success</el-button>
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
