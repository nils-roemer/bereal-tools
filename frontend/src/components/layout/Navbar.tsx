import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { deleteCookie } from "../../utils/authUtils"

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <>
      <Button variant="contained" size="small" onClick={() => navigate("/")}>
        Dashboard
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate("/recapVideo")}
      >
        RecapVideo
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          deleteCookie()
          navigate("/login")
        }}
      >
        Logout
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate("/feed")}
      >
        Feed
      </Button>
    </>
  )
}

export default Navbar
