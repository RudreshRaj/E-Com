import { getNewProductList } from "@/utils/apis";
import Product from "./Components/Product";
import { ProductInfo } from "@/utils/types";

async function Trending() {
  let {
    props: { data },
  } = (await getNewProductList()) as { props: { data: ProductInfo[] } };
  if (data.length == 0) return;
  return (
    <div className="container bg-white pb-2">
      <div className="text-3xl px-4 text-slate-800 font-semibold tracking-wide">
        Latest products
      </div>
      <div className="flex overflow-x-scroll mt-4 gap-4 pb-4">
        {data.map((product: ProductInfo) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Trending;
