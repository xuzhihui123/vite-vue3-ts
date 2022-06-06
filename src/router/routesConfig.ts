import { RouteRecordRaw } from "vue-router"

const routesCom = import.meta.glob("/src/views/**/*.vue")
console.log(routesCom)

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "HomePage",
    component: () => import("@/views/home-page.vue")
  },
  { path: "/", redirect: { name: "HomePage" } }
]

export default routes
