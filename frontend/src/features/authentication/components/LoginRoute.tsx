import { Navigate, Outlet } from "react-router-dom"
import React from "react"
import { checkCookie } from "../../../utils/authUtils"
const LoginRoute = () => {
  return !checkCookie() ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={""} />
  )
}

export default LoginRoute
