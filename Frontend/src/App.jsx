import { Outlet } from "react-router-dom"
import { Navbar } from "./components/index"

function App() {

  return (
    <>
      {/* <h2 className="text-3xl hover:underline hover:cursor-pointer text-center">Hello Duniya</h2> */}
      {/* <Navbar />
      <Login />
      <hr />
      <Signup />
      <hr />
      <Features />
      <hr />
      <About /> */}

      <Navbar />
      <Outlet />
    </>
  )
}

export default App
