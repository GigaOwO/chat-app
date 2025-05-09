import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConfigureAmplifyClientSide from "./_lib/amplify/ConfigureAmplifyClientSide";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aurora - チャットアプリ",
  description: "コミュニケーションをもっと便利に",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigureAmplifyClientSide />
        {children}
      </body>
    </html>
  );
}