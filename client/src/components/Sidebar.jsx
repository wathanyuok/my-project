export default function Sidebar() {
  const categories = [
    { id: 1, name: 'มังงะยอดนิยม', icon: '🏆' },
    { id: 2, name: 'มังงะใหม่', icon: '🆕' },
    { id: 3, name: 'แอคชั่น', icon: '⚔️' },
    { id: 4, name: 'แฟนตาซี', icon: '🔮' },
    { id: 5, name: 'โรแมนติก', icon: '💕' },
    { id: 6, name: 'ตลก', icon: '😄' },
    { id: 7, name: 'กีฬา', icon: '⚽' },
    { id: 8, name: 'ไลท์โนเวล', icon: '📚' },
    { id: 9, name: 'สยองขวัญ', icon: '👻' },
  ]

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">หมวดหมู่</h2>
        <nav>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}