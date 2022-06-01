<script lang="tsx">
import { defineComponent } from "vue"
export default defineComponent({
  name: "HomePage",
  setup() {
    let data = 1
    console.log(data)
    return {}
  },
  render() {
    return <div class={"red"}>home-page hello world</div>
  }
})
</script>

<style scoped lang="scss">
.red {
  color: red;
}
</style>
