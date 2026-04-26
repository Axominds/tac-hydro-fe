import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../src/tailwind.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TAC Hydro Consultancy",
  description: "Premium Hydroelectric Consultancy Services",
  icons: [
    {
      url: "/favicon-64x64.png",
      sizes: "64x64",
      type: "image/png",
    },
    {
      url: "/tac-logo.png",
      sizes: "192x192",
      type: "image/png",
    },
  ],
};

import Providers from "../src/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
