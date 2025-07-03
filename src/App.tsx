import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/index'
import Layout from './pages/Layout'
import QnaListPage from './pages/QnaListPage'
import QnaDetailPage from './pages/QnaDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/qna" element={<QnaListPage />} />
          <Route path="qna/:id" element={<QnaDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
