import CategoryList from "@/Sections/CategoryList";
import HeroSection from "@/Sections/HeroSection";
import Trending from "@/Sections/Trending";

export default function Home() {
  return (
    <main className="dark:bg-gray-100 w-screen">
      <CategoryList />
      <HeroSection />
      <Trending />
    </main>
  );
}
