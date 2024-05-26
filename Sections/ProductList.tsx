"use client";
import Spinner from "@/Sections/Components/Spinner";
import HorizontalProduct from "@/Sections/HorizontalProduct";
import { getCategoryProductList } from "@/utils/apis";
import { ProductInfo } from "@/utils/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  filterType: string;
};

function ProductList({ filterType }: Props) {
  const pathname = usePathname();
  const [productData, setProductData] = useState<ProductInfo[] | null>(null);
  const [viewData, setViewData] = useState<ProductInfo[] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function getProduct() {
      let {
        props: { data },
      } = (await getCategoryProductList(pathname.replace("/", ""))) as {
        props: { data: ProductInfo[] };
      };
      setProductData(data);
      setIsLoaded(true);
    }
    setIsLoaded(false);
    getProduct();
  }, [pathname]);
  useEffect(() => {
    if (productData) {
      let sortedData = productData.map((e) => e); // Create a copy of the array
      if (filterType === "LTH") {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (filterType === "HTL") {
        sortedData.sort((a, b) => b.price - a.price);
      } else {
        sortedData = productData.map((e) => e); // If filterType is NONE or any other value, reset to original data
      }
      setViewData(sortedData);
    }
  }, [filterType, productData]);

  if (!isLoaded) return <Spinner />;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center">
      {viewData &&
        viewData.map((product: ProductInfo, i: number) => (
          <HorizontalProduct
            product={product}
            key={product.id + product.cart_id + i}
          />
        ))}
    </div>
  );
}

export default ProductList;
