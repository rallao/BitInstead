"use client";

import { format } from "date-fns";

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

  const formattedReleaseDate = format(
    new Date(value.releaseDate),
    "MMMM dd, yyyy"
  );
  const formattedOriginalPrice = value.productPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedCurrentValue = value.currentValue
    ? value.currentValue.toLocaleString("en-US", {
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

  const isGain = percentageChange > 0;
  const productCount = Math.floor(
    (value.currentValue || 0) / value.productPrice
  );

  const binanceReferralLink =
    "https://www.binance.com/activity/referral-entry/CPA?ref=CPA_005HC6NFN9&utm_medium=web_share_copy";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-orange-500 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">
          Great Scott!
        </h2>
        <p className="mb-4 text-white">
          If you had a DeLorean and zoomed back to {formattedReleaseDate}, you
          could've bought Bitcoin instead of that {value.productName}. Your{" "}
          {formattedOriginalPrice} investment would now be worth a mind-bending{" "}
          {formattedCurrentValue}! That's a {formattedPercentage} change –
          heavy, Doc!
        </p>
        <p className="mb-4 text-white">
          {isGain
            ? `Whoa, this is heavy! You could've bought ${productCount} ${
                value.productName
              }${productCount > 1 ? "s" : ""} with that!`
            : `Bummer! Looks like the ${value.productName} was the better flux capacitor this time.`}
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Back to the Present
          </button>
          <a
            href={binanceReferralLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors text-center"
          >
            Power Your Flux Capacitor
          </a>
        </div>
      </div>
    </div>
  );
}
