import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import MyPage from './pages/MyPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/index'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="LoginPage" element={<LoginPage />} />
            <Route path="MyPage" element={<MyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
