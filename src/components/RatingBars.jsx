import React from "react";
import { FaStar } from "react-icons/fa";

const RatingBars = ({ data, breakdown }) => {
  if (!data && !breakdown) {
    return (
      <div className="py-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
        <p className="text-gray-500 text-sm">Loading review data…</p>
      </div>
    );
  }

  let ratingsArray = [];

  // If breakdown array provided
  if (Array.isArray(breakdown) && breakdown.length) {
    ratingsArray = breakdown.map((b) => ({
      star: b.star,
      count: Number(b.count) || 0,
    }));
  }
  // If full reviewData object provided
  else if (data && Array.isArray(data.breakdown)) {
    ratingsArray = data.breakdown.map((b) => ({
      star: b.star,
      count: Number(b.count) || 0,
    }));
  }
  // If stars object provided (ex: {5:187,4:45})
  else if (data) {
    ratingsArray = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: Number(data[star]) || 0,
    }));
  }

  const total = ratingsArray.reduce((sum, r) => sum + r.count, 0);

  const getBarColor = (star) => {
    const colors = {
      5: "from-green-500 to-emerald-500",
      4: "from-teal-400 to-cyan-500", 
      3: "from-yellow-400 to-amber-500",
      2: "from-orange-400 to-red-400",
      1: "from-red-500 to-pink-500"
    };
    return colors[star] || "from-purple-500 to-blue-500";
  };

  const getStarColor = (star) => {
    const colors = {
      5: "text-green-500",
      4: "text-teal-500",
      3: "text-yellow-500",
      2: "text-orange-500", 
      1: "text-red-500"
    };
    return colors[star] || "text-gray-500";
  };

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-gray-900 text-lg">Rating Breakdown</h3>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {total} total reviews
        </div>
      </div>

      {ratingsArray.map((r) => {
        const percentage = total ? (r.count / total) * 100 : 0;
        const barColor = getBarColor(r.star);
        const starColor = getStarColor(r.star);

        return (
          <div 
            key={r.star} 
            className="flex items-center gap-4 group hover:bg-gray-50 p-3 rounded-xl transition-all duration-300"
          >
            {/* Star Rating */}
            <div className="flex items-center gap-2 w-16">
              <div className={`flex items-center gap-1 ${starColor}`}>
                <span className="font-bold text-sm">{r.star}</span>
                <FaStar className="text-sm" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-1000 ease-out transform origin-left group-hover:scale-y-110`}
                  style={{ 
                    width: `${percentage}%`,
                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              </div>
            </div>

            {/* Count and Percentage */}
            <div className="flex items-center gap-3 w-24 justify-end">
              <span className="font-semibold text-gray-900 text-sm min-w-[2rem] text-right">
                {r.count}
              </span>
              <div className="w-12 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full text-center">
                {Math.round(percentage)}%
              </div>
            </div>
          </div>
        );
      })}

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-gray-200">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">5★</div>
          <div className="text-xs text-green-700 font-medium">Excellent</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">3-4★</div>
          <div className="text-xs text-yellow-700 font-medium">Good</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">1-2★</div>
          <div className="text-xs text-red-700 font-medium">Needs Work</div>
        </div>
      </div>
    </div>
  );
};

export default RatingBars;