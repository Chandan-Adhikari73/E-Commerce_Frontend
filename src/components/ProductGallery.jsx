import { useState } from "react";
import { FaExpand, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductGallery({ images }) {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 border">
        <img
          src={images[index]}
          className={`w-full h-full object-cover transition-transform duration-700 cursor-zoom-in ${
            isZoomed ? 'scale-150' : 'group-hover:scale-105'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          alt="Product view"
        />
        
        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaExpand />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
        >
          <FaChevronLeft />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
        >
          <FaChevronRight />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {index + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setIndex(i)}
            className={`flex-shrink-0 w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all duration-300 ${
              index === i 
                ? 'border-purple-500 shadow-lg scale-110 cover' 
                : 'border-gray-300 hover:border-gray-400 hover:scale-105'
            }`}
            alt={`Thumbnail ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}