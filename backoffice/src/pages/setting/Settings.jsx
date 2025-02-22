// src/pages/Settings.jsx
export default function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ตั้งค่าระบบ</h1>
      
      <div className="max-w-xl">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">ตั้งค่าทั่วไป</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อร้าน
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  defaultValue="Manga Store"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  อีเมล
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  defaultValue="contact@mangastore.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  defaultValue="02-123-4567"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">ตั้งค่าการแจ้งเตือน</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotification"
                  className="rounded text-primary-600 focus:ring-primary-500"
                  defaultChecked
                />
                <label htmlFor="emailNotification" className="ml-2">
                  แจ้งเตือนทางอีเมลเมื่อมีการสั่งซื้อใหม่
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stockNotification"
                  className="rounded text-primary-600 focus:ring-primary-500"
                  defaultChecked
                />
                <label htmlFor="stockNotification" className="ml-2">
                  แจ้งเตือนเมื่อสินค้าใกล้หมด
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            บันทึกการตั้งค่า
          </button>
        </div>
      </div>
    </div>
  )
}