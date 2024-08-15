"use client";

interface Product {
  name: string;
  releaseDate: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onCalculate: (product: Product) => void;
}

export default function ProductCard({
  product,
  onCalculate,
}: ProductCardProps) {
  return (
    <div
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-orange-500/50"
      onClick={() => onCalculate(product)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2 text-white">{product.name}</h2>
        <p className="text-orange-300">Price: ${product.price}</p>
        <p className="text-gray-400">Release Date: {product.releaseDate}</p>
      </div>
    </div>
  );
}
