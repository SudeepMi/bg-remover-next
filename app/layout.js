import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAdsense from "@/components/GoogleAds";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Backgroundg Remover",
  description: "Image background remover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <GoogleAdsense pId={process.env.PID}/>
        {children}
        </body>
    </html>
  );
}
