import { CategoryView } from "./Wrapper";

type Props = { params: { category: string } };

export async function generateMetadata({ params: { category } }: Props) {
  const decodedCategory = decodeURIComponent(category);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const description = `Find the best ${decodedCategory} products. We have a wide range of products to choose from.`

  return {
    title: decodedCategory,
    description: description,
    alternates: {
      canonical: `${baseUrl}/${category}`,
    },
    openGraph: { 
      title: decodedCategory,
      description: description,
      url: `${baseUrl}/${category}`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: decodedCategory,
      description: description,
    },
  };
}
function Page() {
  return <CategoryView />;
}

export default Page;
