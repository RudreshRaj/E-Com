"use client";

import { getCategoryList, getFullProductList } from "@/utils/apis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchList from "./SearchList";
import { ProductInfo } from "@/utils/types";

function SearchBar() {
  const [categoryList, setCategoryList] = useState<string[] | null>(null);
  const pathName = usePathname();
  const currentCategory = decodeURIComponent(pathName.split("/").slice(-1)[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState<string>("");
  const ref = useRef<HTMLButtonElement>(null);
  const [totalList, setTotalList] = useState<ProductInfo[]>([]);
  const [filteredList, setFilteredList] = useState<ProductInfo[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      let {
        props: { data },
      } = await getCategoryList();
      setCategoryList(data);
      setIsLoaded(true);
    }
    setIsLoaded(false);
    getData();
  }, [pathName]);
  useEffect(() => {
    async function getData() {
      let {
        props: { data },
      } = await getFullProductList();
      setTotalList(data);
    }
    getData();
  }, []);

  const toggleHiddenClass = () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  function filterProductsByTitle(
    products: ProductInfo[],
    searchString: string
  ): ProductInfo[] {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchString.toLowerCase())
    );
  }
  return (
    <form
      className="max-w-lg mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Your Category
        </label>
        <button
          id="dropdown-button1"
          data-dropdown-toggle="dropdown1"
          className="flex-shrink-0 capitalize z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
          disabled={!isLoaded}
          ref={ref}
        >
          {pathName !== "/" &&
          pathName !== "/cart" &&
          pathName.split("/").length == 2
            ? currentCategory
            : "All"}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown1"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button1"
          >
            {categoryList &&
              categoryList.map((name: string, index: number) => (
                <li key={name + index}>
                  <Link
                    href={`/${name}`}
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white  capitalize"
                    onClick={toggleHiddenClass}
                  >
                    {name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos, Design Templates..."
            required
            value={search}
            autoComplete="off"
            onChange={(e) => {
              setSearch(e.target.value);
              const filteredProducts = filterProductsByTitle(
                totalList,
                e.target.value
              );
              setFilteredList(filteredProducts);
              setIsSelected(false);
            }}
          />
          {search.length > 0 && (
            <SearchList
              filteredList={filteredList}
              setSearch={setSearch}
              search={search}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
          )}
          <button
            type="submit"
            id="dropdown-button2"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
