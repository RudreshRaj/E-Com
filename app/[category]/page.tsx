import { CategoryView } from "./Wrapper";

type Props = { params: { category: string } };

export async function generateMetadata({ params: { category } }: Props) {
  return {
    title: decodeURIComponent(category),
  };
}
function Page() {
  return <CategoryView />;
}

export default Page;
