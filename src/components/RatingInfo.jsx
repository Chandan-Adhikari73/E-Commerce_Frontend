import { FaStar, FaUsers, FaChartLine } from "react-icons/fa";

const RatingInfo = ({ rating, reviews, soldThisMonth }) => {
  return (
    <div className="
      w-full rounded-2xl px-6 py-4 
      bg-white/70 backdrop-blur-md
      shadow-[0_4px_20px_rgba(0,0,0,0.05)]
      flex items-center justify-between gap-8
      transition-all duration-300
      hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)]
      hover:bg-white
    ">
      
      {/* Rating */}
      <div className="flex items-center gap-2">
        <FaStar className="text-yellow-500 text-xl drop-shadow-sm" />
        <span className="font-semibold text-lg text-gray-800">
          {rating}
        </span>
      </div>

      {/* Divider Dot */}
      <div className="h-2 w-2 rounded-full bg-gray-300"></div>

      {/* Reviews */}
      <div className="flex items-center gap-2 text-gray-600">
        <FaUsers className="text-gray-500" />
        <span className="text-sm font-medium">
          {reviews} Reviews
        </span>
      </div>

      {/* Divider Dot */}
      <div className="h-2 w-2 rounded-full bg-gray-300"></div>

      {/* Sold */}
      <div className="flex items-center gap-2 text-gray-600">
        <FaChartLine className="text-green-600" />
        <span className="text-sm font-medium">
          {soldThisMonth} Sold this month
        </span>
      </div>
    </div>
  );
};

export default RatingInfo;
