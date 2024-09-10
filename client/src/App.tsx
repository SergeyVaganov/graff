import { Route, Routes } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage';
import { UserPage } from './pages/UserPage'
import { MainPage } from './pages/MainPage';
import './App.css'


function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />} />
      <Route
        path="/admin"
        element={<AdminPage />} />
      <Route
        path="/user"
        element={<UserPage />} />
    </Routes>
  )
}

export default App
