import { getProductById } from "@/utils/apis";
import { ProductInfo } from "@/utils/types";
import Ratting from "@/Sections/Components/Ratting";
import GoBack from "@/Sections/Components/GoBack";
import AddCartButton from "@/Sections/Components/AddCartButton";
type Props = { params: string };

async function ProductPage({ params }: Props) {
  let {
    props: { data },
  } = (await getProductById(params)) as {
    props: { data: ProductInfo };
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <GoBack />
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full rounded-xl"
                src={data.image}
                alt="Product Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {data.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {data.description}
            </p>
            <div className="flex mb-1">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-200 font-semibold">
                  {" "}
                  AED {data.price}
                </span>
              </div>
            </div>
            {data && (
              <div className="flex items-center mb-2">
                <Ratting ratting={data.rating.rate} />
                &nbsp;
                <span className="text-white text-xs">
                  {" "}
                  ({data.rating.count})
                </span>
              </div>
            )}
            <AddCartButton data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
