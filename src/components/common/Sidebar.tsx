import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const menuList = [
    { name: '쪽지 시험', path: '/test' },
    { name: '내 정보', path: '/mypage' },
    { name: '비밀번호 변경', path: '/changePassword' },
  ]
  return (
    <div>
      <nav className="flex flex-col gap-4 w-45">
        {menuList.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              px-4 h-8 transition-all
              ${isActive ? 'text-primary border-l-2 border-primary font-semibold' : 'text-gray-400'}
              hover:text-primary hover:bg-[#F9F5FF]
            `
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
