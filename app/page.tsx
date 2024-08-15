import { products } from "../data/products";
import ClientHome from "../components/ClientHome";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 py-6 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-500">
        Bitcoin ROI Calculator
      </h1>
      <ClientHome products={products} />
    </main>
  );
}
