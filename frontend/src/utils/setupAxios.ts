import axios, { AxiosError, AxiosResponse } from "axios"
import { apiUrl } from "./consts"
import { checkCookie, getCookie, setCookie } from "./authUtils"

interface CustomResponseData {
  data: any
}

if (checkCookie()) {
  axios.defaults.headers.common["Token"] = getCookie()
}

axios.interceptors.response.use(
  (res: AxiosResponse) => {
    return res
  },
  (err: AxiosError<CustomResponseData>) => {
    const status: number = err.response?.data.data.status

    // User is unauthorized, try to renew the token
    if (status === 401) {
      axios
        .post(apiUrl + "/login/refresh", {
          token: getCookie(),
        })
        .then((res) => {
          setCookie(res.data.data.token)
        })
        .catch((err) => {
          console.error("Error refreshing code:", err.response)
        })
    }

    return Promise.reject(err)
  }
)
