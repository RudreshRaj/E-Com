import { fetchProducts, Product } from "@/utils/apis";// Adjust the import path as needed
import ProductCard from "./Components/Product"; // Assuming this is your product card component

async function Trending() {
  // IMPORTANT: Replace 'your-index-name' with your actual Elasticsearch index name.
  const indexName = '91182be9-9446-4e29-9ade-b0312b238668'; 

  // Fetch the newest products using the new API service.
  // The result is an object containing items and pagination details.
  const productData = await fetchProducts({ 
    index: indexName, 
    sortBy: 'newest' 
  });

  // Extract the 'items' array from the fetched data.
  const products = productData.items;

  // If there are no products, don't render the component.
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white pb-2">
      <div className="text-3xl px-4 text-slate-800 font-semibold tracking-wide">
        Latest products
      </div>
      <div className="flex overflow-x-scroll mt-4 gap-4 pb-4">
        {/* Map over the 'products' array and pass the correct type */}
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Trending;
