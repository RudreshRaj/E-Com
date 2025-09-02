import { getProductById, Product } from "@/utils/apis";
import ProductPage from "./ProductPage";

type Props = { 
  params: { product: string } 
};

// This function remains the same. Next.js will cache this data request.
export async function generateMetadata({ params }: Props) {
  const indexName = '91182be9-9446-4e29-9ade-b0312b238668';
  const product = await getProductById(params.product, indexName);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `${baseUrl}/products/${product.id}`,
    },
    openGraph: { 
      title: product.name,
      description: product.description,
      images: [{ url: product.imageUrl }],
      url: `${baseUrl}/products/${product.id}`,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      images: [{ url: product.imageUrl }],
      title: product.name,
      description: product.description,
    },
  };
}

// The main Page component now fetches the data and passes it to the child.
async function Page({ params }: Props) {
  const indexName = '91182be9-9446-4e29-9ade-b0312b238668';
  const product = await getProductById(params.product, indexName);

  return (
    <main className="dark:bg-slate-900">
      <ProductPage product={product} />
    </main>
  );
}

export default Page;