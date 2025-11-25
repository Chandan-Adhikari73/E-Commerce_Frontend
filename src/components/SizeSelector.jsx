export default function SizeSelector({ sizes, onSelect, selected }) {
  return (
    <div className="mt-4">
      <p className="font-semibold mb-2">Select Size</p>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`border px-4 py-2 rounded-md 
              ${selected === size ? "border-black font-semibold bg-gray-300" : ""}`}>
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
