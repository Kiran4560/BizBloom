import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MarketProfile, AllMarkets, ProfileForm, Rating } from "./components"
import { ForgotPassword, ResetPassword, Login, Signup, Home } from './pages'

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
        path: '/forgotPassword',
        element: (
          // <AuthLayout authenticated={false}>
          <ForgotPassword />
          // </AuthLayout>
        )
      },
      {
        path: '/resetPassword',
        element: (
          // <AuthLayout authenticated={false}>
          <ResetPassword />
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
      },
      {
        path: '/rateProduct',
        element: (
          // <AuthLayout authenticated>
          <Rating />
          // </AuthLayout>
        )
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>,
)
