import { FaHeart, FaShoppingCart, FaStar, FaEye } from "react-icons/fa";
import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";


export default function RelatedProducts({ products }) {
  const [wishlisted, setWishlisted] = useState({});
  const [quickView, setQuickView] = useState(null);

  const toggleWishlist = (productId) => {
    setWishlisted(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">You May Also Like</h3>
          <p className="text-gray-600">Customers also viewed these products</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Based on your interests
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {products.map((product, i) => (
          <div 
            key={i}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100">
              <img
                src={product.img}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={product.title}
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 flex items-center justify-center">
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-3">
                  {/* Quick View */}
                  <button 
                    onClick={() => setQuickView(i)}
                    className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
                  >
                    <FaEye className="text-lg" />
                  </button>
                  
                  {/* Add to Cart */}
                  <button className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300">
                    <FaShoppingCart className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Wishlist Button */}
              <button 
                onClick={() => toggleWishlist(i)}
                className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                  wishlisted[i] 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 hover:bg-white text-gray-800'
                }`}
              >
                <FaHeart className={wishlisted[i] ? 'fill-current' : ''} />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {i === 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    🔥 Popular
                  </span>
                )}
                {product.discount && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
              {/* Title */}
              <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300 mb-2">
                {product.title}
              </h4>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-sm ${
                        star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(42)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg line-through text-gray-500">₹{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="text-green-600 font-semibold text-sm">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <div className="text-center mt-8">
        <button className="bg-white text-purple-600 border border-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
          View All Recommendations
        </button>
      </div>

      {/* Quick View Modal */}
      {quickView !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Quick View</h3>
                <button 
                  onClick={() => setQuickView(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                  src={products[quickView].img}
                  className="w-full h-64 object-cover rounded-xl"
                  alt={products[quickView].title}
                />
                <div>
                  <h4 className="font-bold text-lg mb-2">{products[quickView].title}</h4>
                  <p className="text-gray-600 mb-4">Quick product details and description...</p>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold">
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}