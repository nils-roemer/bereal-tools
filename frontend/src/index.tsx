import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./utils/setupAxios"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./index.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Login from "./features/authentication/pages/Login"
import PageNotFound from "./pages/PageNotFound"
import Test from "./pages/Test"
import ProtectedRoute from "./features/authentication/components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import LoginRoute from "./features/authentication/components/LoginRoute"
import RecapVideo from "./features/recapVideo/pages/RecapVideo"
import Feed from "./features/feed/pages/Feed"
import { purple } from "@mui/material/colors"
import Imprint from "./pages/Imprint"

const queryClient = new QueryClient()

const primary = {
  main: "#ffffff",
  light: "#fcfcfc",
  dark: "#a9a9a9",
  contrastText: "#000000",
}

const theme = createTheme({
  palette: {
    primary: primary,
    secondary: purple,
    action: {
      disabledBackground: "#343434",
      disabled: "#000000",
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="imprint" element={<Imprint />}></Route>
            <Route element={<LoginRoute />}>
              <Route path="login" element={<Login />}></Route>
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="" element={<RecapVideo />}></Route>
              <Route path="test" element={<Test />}></Route>
              <Route path="feed" element={<Feed />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
