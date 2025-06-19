import { Link } from "react-router-dom"

export default function SignUpPage () {
  return (
    <div>
      <h1>오즈코딩스쿨</h1>
      <form>
        <div>
          <h3>아직 회원이신가요?</h3>
          <Link to="*">로그인하기</Link>
        </div>
      <div>
        <button type="submit">카카오로 3초만에 가입하기</button>
        <button type="submit">네이버로 가입하기</button>
      </div>
      <Link to="*">일반회원 가입</Link>
      </form>
    </div>
  )
}


