import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, Login, Signup, MarketProfile, AllMarkets, ProfileForm } from "./components/index.js"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          // <AuthLayout authenticated={false}>
          <Login />
          // </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          // <AuthLayout authenticated={false}>
          <Signup />
          // </AuthLayout>
        )
      },
      {
        path: '/myProfile',
        element: (
          // <AuthLayout authenticated>
          <MarketProfile />
          // </AuthLayout>
        ),
      },
      {
        path: '/markets',
        element: (
          // <AuthLayout authenticated>
          <AllMarkets />
          // </AuthLayout>
        )
      },
      {
        path: '/createMarket',
        element: (
          // <AuthLayout authenticated>
          <ProfileForm />
          // </AuthLayout>
        )
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
