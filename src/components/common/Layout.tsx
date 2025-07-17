import AIChatbot from '@components/common/AIChatbot'
import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const { pathname } = useLocation()
  const greyBackgroundRoutes = ['/login', '/signup', '/signupform']
  const hasBg = greyBackgroundRoutes.includes(pathname)

  const hideFooterRoutes = ['/login', '/signup', '/signupform']
  const isHiddenFooter = hideFooterRoutes.includes(pathname)

  return (
    <div className={`flex flex-col min-h-screen ${hasBg ? 'bg-gray-50' : ''}`}>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <AIChatbot />
      {!isHiddenFooter && <Footer />}
    </div>
  )
}

export default Layout
