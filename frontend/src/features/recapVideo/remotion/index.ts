import { registerRoot } from "remotion"
import { RootWrapper } from "./Root"
import { getCookie } from "../../../utils/authUtils"

registerRoot(() => {
  return RootWrapper({
    token: getCookie(),
  })
})
