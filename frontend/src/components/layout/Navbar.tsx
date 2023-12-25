import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import { deleteCookie } from "../../utils/authUtils"

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <>
      <Button type="primary" onClick={() => navigate("/")}>
        Dashboard
      </Button>
      <Button type="primary" onClick={() => navigate("/recapVideo")}>
        RecapVideo
      </Button>
      <Button
        type="primary"
        onClick={() => {
          deleteCookie()
          navigate("/login")
        }}
      >
        Logout
      </Button>
      <Button type="primary" onClick={() => navigate("/feed")}>
        Feed
      </Button>
    </>
  )
}

export default Navbar
