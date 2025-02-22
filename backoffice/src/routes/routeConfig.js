// backoffice/src/routes/routeConfig.js
import { LayoutGrid, Package, Tags, Settings } from 'lucide-react'

export const menuItems = [
  {
    path: '/',
    name: 'แดชบอร์ด',
    icon: LayoutGrid,
    showInMenu: true
  },
  {
    path: '/products',
    name: 'จัดการสินค้า',
    icon: Package,
    showInMenu: true
  },
  {
    path: '/categories',
    name: 'ประเภทสินค้า',
    icon: Tags,
    showInMenu: true
  },
  {
    path: '/settings',
    name: 'ตั้งค่าระบบ',
    icon: Settings,
    showInMenu: true
  }
]