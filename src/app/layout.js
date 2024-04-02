import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import QueryString from "qs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PT. Putera Instrumenindo",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="top-0 absolute w-full">{children}</div>
      </body>
    </html>
  );
}
