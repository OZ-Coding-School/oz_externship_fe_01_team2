import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  const { pathname } = useLocation()
  const greyBackgroundRoutes = ['/login']
  const hasBg = greyBackgroundRoutes.includes(pathname)

  const hideFooterRoutes = ['/login']
  const isHiddenFooter = hideFooterRoutes.includes(pathname)

  return (
    <div className={`flex flex-col min-h-screen ${hasBg ? 'bg-gray-50' : ''}`}>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      {!isHiddenFooter && <Footer />}
    </div>
  )
}

export default Layout
