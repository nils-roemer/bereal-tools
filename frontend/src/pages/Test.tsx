import { Button } from "antd"
import Cookies from "universal-cookie"

const Test = () => {
  const test = () => {
    const cookies = new Cookies()
    console.log(typeof cookies.get("token") === "string")
  }

  return (
    <Button type="primary" onClick={test}>
      Check Cookie
    </Button>
  )
}

export default Test
