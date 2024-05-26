"use client";
import { addCart } from "@/redux/features/cartSlice";
import { shakeCartCount } from "@/utils/supportFunction";
import { ProductInfo } from "@/utils/types";
import { useDispatch } from "react-redux";

type Props = { data: ProductInfo };

function AddCartButton({ data }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="w-fit  mb-3">
      <button
        className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-2 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-orange-600"
        onClick={() => {
          if (data) dispatch(addCart(data));

          shakeCartCount();
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default AddCartButton;
