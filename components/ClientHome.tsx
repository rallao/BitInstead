"use client";

import { useState } from "react";

export default function ClientHome({ products }) {
  const [btcValue, setBtcValue] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const calculateBTCValue = async (product) => {
    const response = await fetch(
      `/api/bitcoin-price?date=${product.releaseDate}&price=${product.price}`
    );
    const data = await response.json();
    console.log("API response:", data);
    setBtcValue(data);
    setShowPopup(true);
  };
  return (
    <>
      <p className="text-center text-white mb-8">
        Click on a product to see what your investment would be worth if you
        bought Bitcoin instead.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            onCalculate={calculateBTCValue}
          />
        ))}
      </div>

      {showPopup && btcValue && (
        <BTCValuePopup value={btcValue} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}
