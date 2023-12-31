import Cookies from "universal-cookie"

const cookies = new Cookies()

export const setVideoUrlCookie = (url: string) => {
  cookies.set("videoUrl", url, { path: "/" })
}

export const getVideoUrl = () => {
  return cookies.get("videoUrl") || ""
}
