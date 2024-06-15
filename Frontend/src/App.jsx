import { Outlet } from "react-router-dom"
import { Navbar } from "./components/index"
// import { useEffect } from "react"
// import { useDispatch } from "react-redux"
// import { login } from "./store/authSlice";

function App() {

  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   const token = localStorage.getItem('token');
  //   if(token)
  //     dispatch(login({}))
  // },[])
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
