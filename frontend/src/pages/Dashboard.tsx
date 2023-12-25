import MainLayout from "../components/layout/MainLayout"
import { useEffect, useState } from "react"
import axios from "axios"
import { apiUrl } from "../utils/consts"
import Cookies from "universal-cookie"

const Dashboard = () => {
  const [json, setJson] = useState("")
  const cookies = new Cookies()

  useEffect(() => {
    axios
      .get(apiUrl + "/friends/mem-feed", {
        headers: { token: cookies.get("token") },
      })
      .then((res) => {
        setJson(JSON.stringify(res.data.data.data))
      })
      .catch((err) => {
        console.error("Error getting data:", err)
      })
  }, [])

  return (
    <MainLayout>
      <div>Dashboard</div>
      <div>{json}</div>
    </MainLayout>
  )
}

export default Dashboard
