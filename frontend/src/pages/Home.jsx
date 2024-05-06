import AdminMenu from "./Admin/AdminMenu"
import Header from "../components/Header"
import TopBooks from "./Books/TopBooks"

const Home = () => {
  return (
    <div>
      <AdminMenu />
      <Header />
      <TopBooks />
    </div>
  )
}

export default Home
