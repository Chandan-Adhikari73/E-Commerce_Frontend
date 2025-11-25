import { useState } from "react";
import { FaHeart, FaShare } from "react-icons/fa";

export default function AddToCartPanel({ onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    onAddToCart();
    // Add your cart logic here
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
        <span className="font-semibold text-gray-700">Quantity</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 hover:border-purple-500 transition-all duration-300 flex items-center justify-center shadow-sm"
          >
            <span className="text-lg font-semibold text-gray-600">−</span>
          </button>
          
          <span className="font-bold text-xl w-8 text-center">{qty}</span>
          
          <button
            onClick={() => setQty(qty + 1)}
            className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 hover:border-purple-500 transition-all duration-300 flex items-center justify-center shadow-sm"
          >
            <span className="text-lg font-semibold text-gray-600">+</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
        >
          <span>🛒 Add to Cart</span>
        </button>
        
        <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
          ⚡ Buy Now
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-4">
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all duration-300 ${
            isWishlisted 
              ? 'bg-red-50 border-red-200 text-red-600' 
              : 'bg-white border-gray-300 text-gray-600 hover:border-purple-500'
          }`}
        >
          <FaHeart className={isWishlisted ? 'fill-red-500' : ''} />
          {isWishlisted ? 'Wishlisted' : 'Wishlist'}
        </button>
        
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-gray-300 text-gray-600 hover:border-purple-500 transition-all duration-300">
          <FaShare />
          Share
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-500">
        <div className="p-2 bg-green-50 rounded-lg">
          <div className="font-semibold text-green-600">🚚 Free Delivery</div>
          <div>5-7 Days</div>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <div className="font-semibold text-blue-600">↩️ Easy Returns</div>
          <div>7 Days</div>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg">
          <div className="font-semibold text-purple-600">🔒 Secure Payment</div>
          <div>100% Safe</div>
        </div>
      </div>
    </div>
  );
}