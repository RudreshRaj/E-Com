import CategoryList from "@/Sections/CategoryList";
import HeroSection from "@/Sections/HeroSection";
import Trending from "@/Sections/Trending";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "E-COM - Your One-Stop Shop",
  description: "Discover a wide range of products at E-COM. We offer the best deals on electronics, fashion, and more.",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "E-COM - Your One-Stop Shop",
    description: "Discover a wide range of products at E-COM. We offer the best deals on electronics, fashion, and more.",
    url: baseUrl,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: "E-COM - Your One-Stop Shop",
    description: "Discover a wide range of products at E-COM. We offer the best deals on electronics, fashion, and more.",
  },
};

export default function Home() {
  return (
    <main className="dark:bg-slate-900">
      <CategoryList />
      <HeroSection />
      <Trending />
    </main>
  );
}
