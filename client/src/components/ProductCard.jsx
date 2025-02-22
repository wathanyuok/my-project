import { useState } from 'react'
import useProductStore from '../store/product-store'

export default function ProductCard({ product }) {
  const addToCart = useProductStore((state) => state.addToCart)
  const [imageError, setImageError] = useState(false)

  const getCategoryColor = (category) => {
    const colors = {
      'แอคชั่น': 'bg-red-100 text-red-800',
      'แฟนตาซี': 'bg-purple-100 text-purple-800',
      'โรแมนติก': 'bg-pink-100 text-pink-800',
      'ตลก': 'bg-yellow-100 text-yellow-800',
      'กีฬา': 'bg-green-100 text-green-800',
      'ดราม่า': 'bg-blue-100 text-blue-800',
      'ผจญภัย': 'bg-orange-100 text-orange-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const handleImageError = () => {
    setImageError(true)
    console.error(`Failed to load image for ${product.name}:`, product.image)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="relative group aspect-[3/4] bg-gray-50">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-gray-500 text-sm">{product.name}</p>
              <p className="text-gray-400 text-xs mt-2">ไม่พบรูปภาพ</p>
            </div>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain"
            onError={handleImageError}
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => addToCart(product)}
            className="bg-white text-primary-600 px-4 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
        <div className={`absolute top-3 right-3 ${getCategoryColor(product.category)} px-3 py-1 rounded-full text-sm font-medium`}>
          {product.category}
        </div>
        {product.isNewRelease && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            เล่มใหม่
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">โดย {product.author}</p>
          </div>
          <div className="text-lg font-bold text-primary-600">฿{product.price}</div>
        </div>
        <div className="flex items-center space-x-4 mt-3">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">⭐</span>
            {product.rating}
          </div>
          <div className="text-sm text-gray-500">
            ขายแล้ว {product.soldCount} เล่ม
          </div>
        </div>
      </div>
    </div>
  )
}