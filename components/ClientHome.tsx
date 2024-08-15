"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import ROIPopup from "./ROIPopup";

export default function ClientHome({ products }) {
  const [roi, setRoi] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const calculateROI = async (product) => {
    // Implement ROI calculation logic here
    // This is a placeholder, replace with actual API call and calculation
    const response = await fetch(
      `/api/bitcoin-price?date=${product.releaseDate}&price=${product.price}`
    );
    const data = await response.json();
    setRoi(data);
    setShowPopup(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            onCalculate={calculateROI}
          />
        ))}
      </div>

      {showPopup && roi && (
        <ROIPopup roi={roi} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}
