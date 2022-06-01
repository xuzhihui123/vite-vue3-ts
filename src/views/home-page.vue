<script lang="tsx">
import { defineComponent } from "vue"
export default defineComponent({
  name: "HomePage",
  setup() {
    return {}
  },
  render() {
    return <div class={"red"}>home-page</div>
  }
})
</script>

<style scoped lang="scss">
.red {
  color: red;
}
</style>
