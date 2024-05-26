import { ProductInfo } from "@/utils/types";
import Ratting from "./Ratting";
import Link from "next/link";

type Props = {
  product: ProductInfo;
};

function Product({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border  min-w-60 hover:shadow-xl rounded-xl cursor-pointer"
    >
      <div className="relative mx-4  overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-48">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="py-3 px-4">
        <div className="flex items-center justify-between mb-0.5">
          <p
            title={product.title}
            className="block font-sans text-sm antialiased font-medium leading-relaxed text-blue-gray-900 max-h-6 overflow-hidden overflow-ellipsis w-full whitespace-nowrap"
          >
            {product.title}
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-semibold leading-relaxed text-black w-full">
          AED {product.price}
        </p>
        <div className="flex gap-1 font-sans text-xs antialiased font-normal leading-normal text-gray-700 ">
          <Ratting ratting={product.rating.rate} />({product.rating.count})
        </div>
      </div>
    </Link>
  );
}

export default Product;
