"use client";
import { RootState } from "@/redux";
import { emptyCart, removeCart } from "@/redux/features/cartSlice";
import { ProductInfo } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
type Props = {};
const shippingCharge = 8.0;

function CartView({}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartList = useSelector(
    (state: RootState) => state.cartOrderReducer.cartList
  );
  const subTotal = cartList.reduce(
    (acc: number, item: ProductInfo) => acc + item.price,
    0
  );
  return cartList && cartList.length == 0 ? (
    <Image
      src="/empty-cart.png"
      alt="Empty Cart"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }} // optional
      className="mb-20"
    />
  ) : (
    <div className="rounded-3xl bg-white shadow-lg">
      <div className="px-4 py-6 sm:px-8 sm:py-10">
        <div className="flow-root">
          <ul className="-my-8">
            {cartList.map((product: ProductInfo) => (
              <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                <div className="shrink-0 relative">
                  <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                    1
                  </span>
                  <img
                    className="h-24 w-24 max-w-full rounded-lg object-cover"
                    src={product.image}
                    alt={product.title}
                  />
                </div>

                <div className="relative flex flex-1 flex-col justify-between">
                  <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                    <div className="pr-8 sm:pr-5">
                      <p className="text-base font-semibold text-gray-900">
                        {product.title}
                      </p>
                      <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                        {product.category}
                      </p>
                    </div>

                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                      <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                        AED {product.price}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                    <button
                      type="button"
                      className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                      onClick={() => {
                        if (product.cart_id)
                          dispatch(removeCart(product.cart_id));
                      }}
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                          className=""
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* <!-- <hr className="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" /> --> */}

        <div className="mt-6 space-y-3 border-t border-b py-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Subtotal</p>
            <p className="text-lg font-semibold text-gray-900">
              AED {subTotal}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Shipping</p>
            <p className="text-lg font-semibold text-gray-900">
              AED {shippingCharge}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            <span className="text-xs font-normal text-gray-400">AED</span>{" "}
            {subTotal + shippingCharge}
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
            onClick={() => {
              router.push("/");
              toast.success("Order Placed Successfully.");
              dispatch(emptyCart());
            }}
          >
            Place Order
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartView;
