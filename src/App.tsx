import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/index'
import Layout from './pages/Layout'
import LoginPage from './pages/LoginPage'
import QnaDetailPage from './pages/QnaDetailPage'
import QnaListPage from './pages/QnaListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/qna" element={<QnaListPage />} />
          <Route path="qna/:id" element={<QnaDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
