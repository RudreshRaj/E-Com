import { Product } from "@/utils/apis"; // Import the correct Product type
import Ratting from "./Ratting";
import Link from "next/link";

type Props = {
  // Use the 'Product' type from your API service
  product: Product;
};

function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border  min-w-60 hover:shadow-xl rounded-xl cursor-pointer"
    >
      <div className="relative mx-4  overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-48">
        <img
          // Use 'imageUrl' instead of 'image'
          src={product.imageUrl}
          // Use 'name' instead of 'title'
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="py-3 px-4">
        <div className="flex items-center justify-between mb-0.5">
          <p
            // Use 'name' instead of 'title'
            title={product.name}
            className="block font-sans text-sm antialiased font-medium leading-relaxed text-blue-gray-900 max-h-6 overflow-hidden overflow-ellipsis w-full whitespace-nowrap"
          >
            {product.name}
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-semibold leading-relaxed text-black w-full">
          AED {product.price}
        </p>
        {product.rating && (
          <div className="flex gap-1 font-sans text-xs antialiased font-normal leading-normal text-gray-700 ">
            <Ratting ratting={product.rating.rate} />({product.rating.count})
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
