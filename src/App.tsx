import Layout from '@components/common/Layout'
import ChangePasswordPage from '@pages/ChangePasswordPage'
import ErrorPage from '@pages/ErrorPage'
import HomePage from '@pages/index'
import LoginPage from '@pages/LoginPage'
import MyPage from '@pages/MyPage'
import MypageEdit from '@pages/MypageEdit'
import QnaCreatePage from '@pages/QnaCreatePage'
import QnaDetailPage from '@pages/QnaDetailPage'
import QnaListPage from '@pages/QnaListPage'
import SignUpFormPage from '@pages/SignUpFormPage'
import SignUpPage from '@pages/SignUpPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QnaEditPage from '@pages/QnaEditPage'
import KakaoCallbackPage from '@api/auth/KakaoCallbackPage'
import NaverCallbackPage from '@api/auth/NaverCallbackPage'

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
          <Route path="mypage/edit" element={<MypageEdit />} />
          <Route path="signupform" element={<SignUpFormPage />} />
          <Route path="changePassword" element={<ChangePasswordPage />} />
          <Route path="qna/create" element={<QnaCreatePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="qna/:id/edit" element={<QnaEditPage />} />
          <Route path="auth/callback/kakao" element={<KakaoCallbackPage />} />
          <Route path="auth/callback/naver" element={<NaverCallbackPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
