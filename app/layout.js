import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz",
  description: "Test your knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col justify-between h-[100vh]`}
      >
        <NavBar />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
