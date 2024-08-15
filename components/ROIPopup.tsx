"use client";

interface ROIPopupProps {
  roi: {
    percentage: number;
    value: number;
    productName: string;
    productPrice: number;
    releaseDate: string;
  };
  onClose: () => void;
}

export default function ROIPopup({ roi, onClose }: ROIPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-orange-500 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">
          Result for {roi.productName}
        </h2>
        <p className="mb-2 text-white">
          If you had invested ${roi.productPrice} in Bitcoin on{" "}
          {roi.releaseDate}:
        </p>
        <p className="mb-2 text-white">
          Current value:{" "}
          <span className="font-bold text-green-400">
            ${roi.value.toFixed(2)}
          </span>
        </p>
        <p className="text-white">
          ROI:{" "}
          <span
            className={`font-bold ${
              roi.percentage >= 0 ? "text-green-400" : "text-red-500"
            }`}
          >
            {roi.percentage.toFixed(2)}%
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
