interface ProductCardProps {
  product: {
    name: string;
    price: number;
    releaseDate: string;
  };
  onSelect: (product: ProductCardProps["product"]) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div
      className="bg-[#f7b750] rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => onSelect(product)}
    >
      <h2 className="text-xl font-bold mb-2 text-[#5a3511]">{product.name}</h2>
      <p className="text-[#5a3511]">Price: ${product.price}</p>
      <p className="text-[#5a3511] text-sm">
        Release Date: {product.releaseDate}
      </p>
    </div>
  );
}
