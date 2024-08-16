"use client";

import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import BTCValuePopup from "../components/BTCValuePopup";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    // Here you would typically call your API to calculate BTC value
  };

  return (
    <main className="min-h-screen bg-[#f39c12] py-6 px-4">
      <h1 className="text-4xl font-bold text-center mb-4 text-[#5a3511]">
        What If You Bought BTC Instead?
      </h1>
      <p className="text-center mb-8 text-[#5a3511]">
        Click on a product to see what your investment would be worth if you
        bought Bitcoin instead.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            onSelect={handleProductSelect}
          />
        ))}
      </div>
      {selectedProduct && (
        <BTCValuePopup
          value={{
            currentValue: 0, // This should be calculated
            productName: selectedProduct.name,
            productPrice: selectedProduct.price,
            releaseDate: selectedProduct.releaseDate,
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
