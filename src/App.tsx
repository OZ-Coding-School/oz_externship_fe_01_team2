import './App.css'
import SignUpPage from './pages/SignUpPage'
import { Routes, Route } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  ) 
}



export default App
