import { product } from "../data/product";
import RatingInfo from "../components/RatingInfo";
import ProductGallery from "../components/ProductGallery";
import ProductDetails from "../components/ProductDetails";
import SizeSelector from "../components/SizeSelector";
import AddToCartPanel from "../components/AddToCartPanel";
import Accordion from "../components/Accordion";
import Reviews from "../components/Reviews";
import RelatedProducts from "../components/RelatedProducts";
import { useState } from "react";
import ReviewInsightsModal from "../components/ReviewInsightsModal";

const reviewData = {
  avg: 4.8,
  total: 262,
  verified: 218,
  recent: 13,
  breakdown: [
    { star: 5, percent: 72, count: 187 },
    { star: 4, percent: 17, count: 45 },
    { star: 3, percent: 6, count: 18 },
    { star: 2, percent: 3, count: 13 },
    { star: 1, percent: 2, count: 4 },
  ],
  positive: 89,
  neutral: 7,
  negative: 5,
};

export default function ProductPage() {
  const [size, setSize] = useState(null);
  const [showInsights, setShowInsights] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Success Notification */}
      {addedToCart && (
        <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounceIn">
          ✅ Added to cart successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        
        {/* Product Gallery Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 transform hover:scale-[1.02] transition-transform duration-500">
          <ProductGallery images={product.images} />
        </div>

        {/* Product Details Section */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <ProductDetails product={product} />
            
            <SizeSelector
              sizes={product.sizes}
              selected={size}
              onSelect={setSize}
            />

            <AddToCartPanel onAddToCart={() => setAddedToCart(true)} />
          </div>

          {/* Accordion Section */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <Accordion
              items={[
                { title: "Product Details", content: product.details },
                { title: "Shipping & Delivery", content: product.shipping },
                { title: "Return Policy", content: product.returns },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Review Insights */}
      <div className="text-center mb-12">
        <button
          onClick={() => setShowInsights(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
        >
          📊 View Detailed Review Insights
        </button>
        
        <ReviewInsightsModal
          open={showInsights}
          onClose={() => setShowInsights(false)}
          data={reviewData}
        />
      </div>

      {/* Reviews & Related Products */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <Reviews rating={product.rating} />
          </div>
        </div>
      <div className="xl:col-span-1">
          <RelatedProducts products={product.related} />
        </div>
    </div>
  );
}