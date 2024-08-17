import { useState, useEffect } from "react";
import { XCircle } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

interface BTCValuePopupProps {
  value: {
    productName: string;
    productPrice: number;
    releaseDate: string;
    btcPrice: number;
  };
  onClose: () => void;
}

export default function BTCValuePopup({ value, onClose }: BTCValuePopupProps) {
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentBitcoinPrice = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        const currentBtcPrice = response.data.bitcoin.usd;

        const bitcoinAmount = value.productPrice / value.btcPrice;
        const calculatedCurrentValue = bitcoinAmount * currentBtcPrice;
        setCurrentValue(calculatedCurrentValue);
      } catch (err) {
        setError("Failed to fetch current Bitcoin price. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentBitcoinPrice();
  }, [value.productPrice, value.btcPrice]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const percentageChange = currentValue
    ? ((currentValue - value.productPrice) / value.productPrice) * 100
    : 0;
  const isGain = percentageChange >= 0;

  const formattedReleaseDate = format(
    new Date(value.releaseDate),
    "MMMM dd, yyyy"
  );
  const formattedOriginalPrice = value.productPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedCurrentValue = currentValue
    ? currentValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      })
    : "N/A";
  const formattedPercentage = percentageChange.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#f7b750] p-6 rounded-lg shadow-lg border border-[#f39c12] max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#5a3511] hover:text-[#f39c12]"
        >
          <XCircle size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-[#5a3511]">
          Great Scott!
        </h2>
        <p className="mb-4 text-[#5a3511]">
          If you had a DeLorean and zoomed back to {formattedReleaseDate}, you
          could've bought Bitcoin instead of that {value.productName}. Your{" "}
          <span className="font-bold">{formattedOriginalPrice}</span> investment
          would now be worth a mind-bending{" "}
          <span
            className={`font-bold ${
              isGain ? "text-green-600" : "text-red-600"
            }`}
          >
            {formattedCurrentValue}
          </span>
          ! That's a{" "}
          <span
            className={`font-bold ${
              isGain ? "text-green-600" : "text-red-600"
            }`}
          >
            {formattedPercentage}
          </span>{" "}
          change – heavy, Doc!
        </p>
      </div>
    </div>
  );
}
