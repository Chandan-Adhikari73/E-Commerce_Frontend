import React, { useState, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import RatingBars from "./RatingBars";

export default function Reviews({
  reviewsData,
  initialReviews = [],
  rating,
  onOpenInsights,
}) {
  const [reviews, setReviews] = useState(
    initialReviews.length
      ? initialReviews
      : [
          { id: 1, name: "Asha", rating: 5, text: "Lovely fabric and stitching!", date: "2025-11-20" },
          { id: 2, name: "Rahul", rating: 4, text: "Good quality, size runs a bit large.", date: "2025-11-18" },
          { id: 3, name: "Hardik", rating: 5, text: "Comfortable but could be softer.", date: "2025-11-20" },
          { id: 4, name: "Karan", rating: 3, text: "Not what I expected.", date: "2025-11-18" },
        ]
  );

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);

  const stats = useMemo(() => {
    const total = reviewsData?.total ?? reviews.length;
    const avg =
      reviewsData?.avg ??
      reviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, reviews.length);

    return { total, avg: Number(avg).toFixed(1) };
  }, [reviewsData, reviews]);

  const breakdown = useMemo(() => {
    if (Array.isArray(reviewsData?.breakdown)) return reviewsData.breakdown;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    for (const r of reviews) counts[r.rating]++;

    const total = reviews.length || 1;

    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      percent: Math.round((counts[star] / total) * 100),
    }));
  }, [reviewsData, reviews]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating: selectedRating,
      text: text.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    setReviews((r) => [newReview, ...r]);
    setName("");
    setText("");
    setSelectedRating(5);
  }

  function formatDate(d) {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <section className="mt-10">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-3xl font-semibold text-gray-900">Reviews & Ratings</h3>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center shadow-sm">
                <FaStar className="text-yellow-500 text-lg" />
              </div>
              <div>
                <p className="text-xl font-semibold">{stats.avg}</p>
                <p className="text-gray-500 text-sm">
                  {stats.total} reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {onOpenInsights && (
          <button
            onClick={onOpenInsights}
            className="text-indigo-600 hover:text-indigo-500 underline text-sm transition-transform hover:scale-[1.02]"
          >
            View Detailed Insights →
          </button>
        )}
      </div>

      {/* Rating Breakdown Box */}
      <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-md mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Rating distribution</h4>
        <RatingBars breakdown={breakdown} />
      </div>

      {/* Add Review Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-md mb-6"
      >
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Your Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSelectedRating(s)}
                className={`rounded-lg px-3 py-2 flex items-center gap-1 shadow-sm transition
                  ${
                    selectedRating === s
                      ? "bg-yellow-100 text-yellow-600 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                `}
              >
                <FaStar className="text-yellow-500" />
                {s}
              </button>
            ))}
          </div>
        </div>

        <input
          className="w-full rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-indigo-200 outline-none mb-3 shadow-sm"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-indigo-200 outline-none mb-4 shadow-sm"
          placeholder="Write your review..."
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-[2px]"
          >
            Submit Review
          </button>
          <button
            type="button"
            onClick={() => {
              setName("");
              setText("");
              setSelectedRating(5);
            }}
            className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet — be the first!</p>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className="p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700 shadow-sm">
                    {r.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-gray-500">{formatDate(r.date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full shadow-sm">
                  <FaStar className="text-yellow-500 text-sm" />
                  <span className="font-semibold">{r.rating}</span>
                </div>
              </div>

              <p className="mt-3 text-gray-700 leading-relaxed">{r.text}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
