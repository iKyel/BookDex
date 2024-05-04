import Navigation from "../Auth/Navigation"
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div>
        <Navigation />
        <Outlet />
    </div>
  )
}

export default MainLayout
