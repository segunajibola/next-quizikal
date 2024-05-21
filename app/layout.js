"use client";

import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <title>Quiz</title>
          <meta name="description" content="Test your knowledge" />
        </head>
        <body
          className={`${inter.className} flex flex-col justify-between min-h-screen`}
        >
          <NavBar />
          <div className="flex flex-col justify-center items-center min-h-[85vh]">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </QueryClientProvider>
  );
}
