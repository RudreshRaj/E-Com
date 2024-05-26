import { getProductById } from "@/utils/apis";
import ProductPage from "./ProductPage";
import { ProductInfo } from "@/utils/types";

type Props = { params: { product: string } };
export async function generateMetadata({ params: { product } }: Props) {
  let {
    props: { data },
  } = (await getProductById(product)) as {
    props: { data: ProductInfo };
  };

  return {
    title: data.title,
    description: data.description,
    openGraph: { images: [{ url: data.image }] },
    twitter: {
      images: [{ url: data.image }],
      title: data.title,
      description: data.description,
    },
  };
}
async function Page({ params: { product } }: { params: { product: string } }) {
  return (
    <main className="dark:bg-gray-500/5 w-screen">
      <ProductPage params={product} />
    </main>
  );
}

export default Page;
