import requestInstance from "@/config/http"
export function getUsers() {
  return requestInstance.get("/mock/api/getUsers")
}
