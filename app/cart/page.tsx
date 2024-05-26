import CartView from "@/Sections/CartView";
import GoBack from "@/Sections/Components/GoBack";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My Cart | E-COM",
};
type Props = {};
function page({}: Props) {
  return (
    <main className="dark:bg-gray-500/5 w-screen">
      <section className="h-full bg-gray-100 py-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-2 max-w-md ">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <GoBack fill="black" />
              <div className="mb-2"> Your Cart</div>
            </h1>
            <CartView />
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
