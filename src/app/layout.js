import { Inter } from "next/font/google";
import "./globals.css";
import FooterSection from "./components/footerSection";
import Header from "./components/header";
import QueryString from "qs";

const inter = Inter({ subsets: ["latin"] });

const FetchData = async () => {
  const params = () =>
    QueryString.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/about?${params()}`
  );
  const jsonResponse = await response.json();
  return {
    id: jsonResponse.data.id,
    title: jsonResponse.data.attributes.title,
    address: jsonResponse.data.attributes.address,
    websiteLink: jsonResponse.data.attributes.websiteLink,
    websiteName: jsonResponse.data.attributes.websiteName,
    email: jsonResponse.data.attributes.email,
    phone: jsonResponse.data.attributes.phone,
  };
};

export const metadata = {
  title: "PT. Putera Instrumenindo",
};

export default async function RootLayout({ children }) {
  const fetchedData = await FetchData();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="top-0 absolute w-full">
          {children}
          <FooterSection>{fetchedData}</FooterSection>
        </div>
      </body>
    </html>
  );
}
