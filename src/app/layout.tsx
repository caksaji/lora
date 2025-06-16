import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./global.sass";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Lora",
  description: "Product purchase analyzer, built with next.js by https://linkedin.com/in/caksaji",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
