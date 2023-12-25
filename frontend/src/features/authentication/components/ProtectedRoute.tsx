import { Navigate, Outlet } from "react-router-dom"
import React from "react"
import { checkCookie } from "../../../utils/authUtils"
const ProtectedRoute = () => {
  return checkCookie() ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={"login"} />
  )
}

export default ProtectedRoute
