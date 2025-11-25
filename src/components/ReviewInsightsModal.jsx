import { useEffect } from "react";
import {
  FaStar,
  FaTimes,
  FaCheckCircle,
  FaChartBar,
  FaRocket,
  FaCrown,
  FaMedal,
  FaShieldAlt
} from "react-icons/fa";

export default function ReviewInsightsModal({ open, onClose, data }) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const getSentimentColor = (percentage) => {
    if (percentage >= 80) return "from-emerald-500 to-green-500";
    if (percentage >= 60) return "from-green-400 to-teal-500";
    if (percentage >= 40) return "from-yellow-400 to-amber-500";
    if (percentage >= 20) return "from-orange-400 to-red-400";
    return "from-red-500 to-pink-500";
  };

  const getRatingColor = (star) => {
    const colors = {
      5: "from-emerald-500 to-green-500",
      4: "from-teal-400 to-cyan-500",
      3: "from-yellow-400 to-amber-500",
      2: "from-orange-400 to-red-400",
      1: "from-red-500 to-pink-500"
    };
    return colors[star] || "from-purple-500 to-blue-500";
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-insights-title"
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl relative animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="review-insights-title" className="text-2xl font-bold flex items-center gap-3">
                <FaChartBar className="text-yellow-300" />
                Review Insights
              </h2>
              <p className="text-purple-100 mt-1">Comprehensive customer feedback analysis</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              aria-label="Close insights modal"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {/* Top Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center items-center gap-2 text-yellow-600 mb-2">
                <FaStar className="text-lg" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Average Rating</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-bold text-gray-900">{data.avg}</p>
                <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center items-center gap-2 text-blue-600 mb-2">
                <FaCheckCircle className="text-lg" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{data.total}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center items-center gap-2 text-green-600 mb-2">
                {/* fixed: use FaShieldAlt (valid import) */}
                <FaShieldAlt className="text-lg" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Verified</p>
              <p className="text-2xl font-bold text-gray-900">{data.verified}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center items-center gap-2 text-purple-600 mb-2">
                <FaRocket className="text-lg" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Recent (30d)</p>
              <p className="text-2xl font-bold text-gray-900">{data.recent}</p>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaChartBar className="text-purple-600" />
              Detailed Rating Breakdown
            </h3>

            <div className="space-y-4">
              {data.breakdown.map((item) => (
                <div key={item.star} className="flex items-center gap-4 group hover:bg-white/50 p-3 rounded-xl transition-all duration-300">
                  {/* Star Rating */}
                  <div className="flex items-center gap-2 w-16">
                    <div className={`flex items-center gap-1 font-bold text-gray-700`}>
                      <span>{item.star}</span>
                      <FaStar className="text-yellow-400" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>{item.count} reviews</span>
                      <span className="font-semibold">{item.percent}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full bg-gradient-to-r ${getRatingColor(item.star)} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCrown className="text-white text-lg" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Positive Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{data.positive}%</p>
              <div className="text-xs text-green-600 font-semibold mt-2">5★ Ratings</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-5 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaMedal className="text-white text-lg" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Neutral Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{data.neutral}%</p>
              <div className="text-xs text-yellow-600 font-semibold mt-2">3★ Ratings</div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-5 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaChartBar className="text-white text-lg" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Negative Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{data.negative}%</p>
              <div className="text-xs text-red-600 font-semibold mt-2">1–2★ Ratings</div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">88%</div>
                <div className="text-sm text-gray-600">Would Recommend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaCheckCircle />
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
