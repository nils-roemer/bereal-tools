import Cookies from "universal-cookie"
import axios from "axios"

const cookies = new Cookies()

export const checkCookie = () => {
  return typeof cookies.get("token") === "string"
}

export const deleteCookie = () => {
  cookies.remove("token")
  axios.defaults.headers.common["Token"] = cookies.get("token")
}

export const setCookie = (token: string) => {
  cookies.set("token", token, { path: "/" })
  axios.defaults.headers.common["Token"] = token
}

export const getCookie = () => {
  return cookies.get("token")
}
