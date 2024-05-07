import Footer from "../../components/Footer"
import Navigation from "../../components/Navigation"
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
