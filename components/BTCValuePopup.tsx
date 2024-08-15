"use client";

interface BTCValuePopupProps {
  value: {
    currentValue: number | null;
    productName: string;
    productPrice: number;
    releaseDate: string;
  };
  onClose: () => void;
}

export default function BTCValuePopup({ value, onClose }: BTCValuePopupProps) {
  const percentageChange = value.currentValue
    ? ((value.currentValue - value.productPrice) / value.productPrice) * 100
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-orange-500 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">
          If you bought BTC instead of {value.productName}
        </h2>
        <p className="mb-2 text-white">
          Original price on {value.releaseDate}:{" "}
          <span className="font-bold">${value.productPrice.toFixed(2)}</span>
        </p>
        <p className="mb-2 text-white">
          Current BTC value:{" "}
          <span className="font-bold text-green-400">
            ${value.currentValue ? value.currentValue.toFixed(2) : "N/A"}
          </span>
        </p>
        <p className="text-white">
          Percentage change:{" "}
          <span
            className={`font-bold ${
              percentageChange >= 0 ? "text-green-400" : "text-red-500"
            }`}
          >
            {percentageChange.toFixed(2)}%
          </span>
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
