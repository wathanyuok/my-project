// src/backoffice/pages/Categories.jsx
export default function Categories() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">จัดการประเภทสินค้า</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
          เพิ่มประเภทใหม่
        </button>
      </div>

      {/* Categories list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['แอคชั่น', 'แฟนตาซี', 'โรแมนติก', 'ตลก', 'กีฬา'].map((category) => (
          <div key={category} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">{category}</span>
              <div>
                <button className="text-blue-600 hover:text-blue-800 mr-2">แก้ไข</button>
                <button className="text-red-600 hover:text-red-800">ลบ</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}