import React, { ReactNode } from "react"
import Footer from "./Footer"

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div>
    {children}
    <div className="flex flex-col w-full fixed bottom-0 justify-center pb-1 bg-black">
      <Footer />
    </div>
  </div>
)

export default MainLayout
