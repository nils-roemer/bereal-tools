import React, { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <Footer />
  </div>
)

export default MainLayout
