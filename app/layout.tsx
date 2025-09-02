import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import Footer from "@/Sections/Footer";
import Navbar from "@/Sections/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "E-COM ",
    template: "%s | E-COM",
  },
  description: "E-commerce website for business in UAE.",
  openGraph: {
    title: "E-COM",
    description: "E-commerce website for business in UAE.",
    url: "https://e-com-keyur-gondaliya.vercel.app",
    siteName: "e-com-keyur-gondaliya.vercel.app",
    images: [
      {
        url: "https://e-com-keyur-gondaliya.vercel.app/og.png",
        width: 2322,
        height: 1306,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "E-COM",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
            style: {
              backgroundColor: "white",
              opacity: 0.7,
              color: "black",
              border: "0.5px solid rgba(192, 192, 192, 0.4)",
              fontWeight: 700,
              fontSize: "14px",
            },
          }}
        />
        
      </body>
    </html>
  );
}
