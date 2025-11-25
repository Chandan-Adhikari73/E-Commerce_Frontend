import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="mt-6 divide-y divide-gray-100 rounded-2xl bg-white shadow-xl overflow-hidden">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="group transition-all duration-300 hover:bg-gray-50"
        >
          <button
            className="w-full flex justify-between items-center p-6 font-semibold text-gray-800 hover:text-purple-700 transition-all duration-300"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-lg font-bold">{item.title}</span>
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform duration-300 ${
                open === i ? 'rotate-180' : 'rotate-0'
              }`}>
                {open === i ? (
                  <FaChevronUp className="text-purple-600" />
                ) : (
                  <FaChevronDown className="text-gray-400 group-hover:text-purple-600" />
                )}
              </span>
            </div>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${
            open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-6 pt-0 text-gray-600 leading-relaxed bg-gradient-to-r from-gray-50 to-white">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
