import { Product } from "@/utils/apis";
import Ratting from "@/Sections/Components/Ratting";
import GoBack from "@/Sections/Components/GoBack";
// No longer need AddCartButton for this example, but you could add it back
// import AddCartButton from "@/Sections/Components/AddCartButton";

// The component now expects to receive the 'product' object directly
type Props = { 
  product: Product 
};

// It's no longer an async function because it doesn't fetch data
function ProductPage({ product }: Props) {
  // All data-fetching logic has been removed from this file.

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <GoBack />
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full rounded-xl object-cover"
                src={product.imageUrl}
                alt={product.name} // Added alt text for accessibility
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {product.description}
            </p>
            <div className="flex mb-1">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-200 font-semibold">
                  {" "}
                  AED {product.price}
                </span>
              </div>
            </div>
            {product.rating && (
              <div className="flex items-center mb-2">
                <Ratting ratting={product.rating.rate} />
                &nbsp;
                <span className="text-white text-xs">
                  {" "}
                  ({product.rating.count})
                </span>
              </div>
            )}
            {/* You can now pass the full product object to AddCartButton */}
            {/* <AddCartButton data={product} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;