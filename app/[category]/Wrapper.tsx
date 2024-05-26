"use client";
import { useRef, useState } from "react";
import ProductList from "../../Sections/ProductList";
export function CategoryView() {
  const ref = useRef<HTMLButtonElement>(null);
  const [filterType, setFilterType] = useState<string>("None");
  const toggleHiddenClass = () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  return (
    <main className="dark:bg-gray-500/5 w-screen">
      <div className="container bg-white px-2">
        <div className="flex flex-row-reverse  p-1 text-slate-800 font-semibold tracking-wide ">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="bg-gray-100  text-gray-600  focus:ring-1 focus:outline-none focus:ring-blue-300 font-normal  text-md mt-2 px-2 py-0.5 text-center inline-flex items-center border rounded-md"
            type="button"
            ref={ref}
          >
            {filterType === "NONE"
              ? "Filter"
              : filterType === "HTL"
              ? "HTL"
              : "LTH"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-2.5 h-2.5 ms-1"
              aria-hidden="true"
              width="10px"
              height="10px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                fill="rgb(75 85 99)"
                d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
              />
            </svg>
          </button>

          <div
            id="dropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li
                onClick={() => {
                  setFilterType("NONE");
                  toggleHiddenClass();
                }}
                key="NONE"
              >
                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                  None
                </div>
              </li>
              <li
                onClick={() => {
                  setFilterType("LTH");
                  toggleHiddenClass();
                }}
                key="LTH"
              >
                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                  low to high price
                </div>
              </li>
              <li
                onClick={() => {
                  setFilterType("HTL");
                  toggleHiddenClass();
                }}
                key="HTL"
              >
                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                  high to low price
                </div>
              </li>
            </ul>
          </div>
        </div>
        <ProductList filterType={filterType} />
      </div>
    </main>
  );
}
