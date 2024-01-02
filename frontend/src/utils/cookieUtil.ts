import Cookies from "universal-cookie"

const cookies = new Cookies()

export const setVideoUrlCookie = (url: string) => {
  cookies.set("videoUrl", url, { path: "/" })
}

export const getVideoUrl = () => {
  return cookies.get("videoUrl") || ""
}

export const setUserNameCookie = (url: string) => {
  cookies.set("userName", url, { path: "/" })
}

export const getUserNameCookie = () => {
  return cookies.get("userName") || ""
}

export const clearAllCookies = () => {
  cookies.remove("videoUrl")
  cookies.remove("userName")
}
