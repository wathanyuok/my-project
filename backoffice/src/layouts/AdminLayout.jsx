// src/backoffice/layouts/AdminLayout.jsx
import { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { 
  LayoutGrid, 
  Package, 
  Tags, 
  Settings,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const menuItems = [
    { icon: LayoutGrid, name: 'แดชบอร์ด', path: '/admin' },
    { icon: Package, name: 'จัดการสินค้า', path: '/products' },
    { icon: Tags, name: 'ประเภทสินค้า', path: '/categories' },
    { icon: Settings, name: 'ตั้งค่าระบบ', path: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 w-64 h-screen transition-transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
          <div className="flex items-center justify-between mb-6 px-3">
            <span className="text-xl font-bold text-primary-600">Manga Admin</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className={`
        p-4 md:ml-64
        ${isSidebarOpen ? 'md:ml-64' : ''}
      `}>
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-1 text-sm">
                <img
                  src="https://ui-avatars.com/api/?name=Admin"
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
                <span>แอดมิน</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="bg-white rounded-lg shadow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}