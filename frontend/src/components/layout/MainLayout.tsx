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
    <div className="flex flex-col w-full fixed bottom-0 justify-center pb-2 bg-black">
      <Footer />
    </div>
  </div>
)

export default MainLayout
