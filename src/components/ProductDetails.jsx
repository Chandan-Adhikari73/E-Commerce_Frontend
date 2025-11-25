import RatingInfo from "./RatingInfo";
import { FaFire, FaShieldAlt, FaTruck } from "react-icons/fa";

export default function ProductDetails({ product }) {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
        <FaFire /> 🔥 Best Seller
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold text-gray-900 leading-tight">
        {product.title}
      </h1>

      {/* Rating Info */}
      <RatingInfo
        rating={product.rating}
        reviews={product.reviews}
        soldThisMonth={product.soldThisMonth}
      />

      {/* Pricing */}
      <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
          <span className="line-through text-gray-500 text-xl">₹{product.mrp}</span>
          <span className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
            {product.discount}% OFF
          </span>
        </div>
      </div>


    </div>
  );
}