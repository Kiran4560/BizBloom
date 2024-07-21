import { Outlet } from "react-router-dom"
import { Navbar } from "./components/index"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "./store/authSlice";

function App() {
  const location = useSelector(state => state.auth.userLocation)
  const dispatch = useDispatch();

  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(updateLocation({ latitude, longitude }))
      }, (error) => {
        setError(error.message)
      })
    }
    else
      setError('Geolocation is not supported by the browser')
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Outlet />
      {/* <div>
        <h1>Current Location</h1>
        {location.latitude && location.longitude ? (
          <div>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        ) : (
          <p>Fetching location...</p>
        )}
        {error && <p>Error: {error}</p>}
      </div> */}
    </>
  )
}

export default App
