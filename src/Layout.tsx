import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>헤더</header>
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default Layout;


// react-router-dom 오류 뜨면 밑에 인스톨 설치해주세요
// npm install react-router-dom 