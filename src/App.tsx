import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/common/Layout'
import HomePage from './pages/index'
import LoginPage from './pages/LoginPage'
import MyPage from './pages/MyPage'
// import MypageEdit from './pages/MypageEdit'
import QnaDetailPage from './pages/QnaDetailPage'
import QnaListPage from './pages/QnaListPage'
import SignUpPage from './pages/SignUpPage'
import SignUpFormPage from './pages/SignUpFormPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="qna" element={<QnaListPage />} />
          <Route path="qna/:id" element={<QnaDetailPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="mypage" element={<MyPage />} />
          {/* <Route path="mypage/edit" element={<MypageEdit />} /> */}
          <Route path="signupform" element={<SignUpFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
