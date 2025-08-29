import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Minu',
  description: '건강한 디지털 라이프를 위한 스크린타임 관리 및 생산성 향상 서비스',
  icons: {
    icon: '/images/logos/MinuCharacter.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className=''>
          <div className='mx-auto min-w-mobile max-w-tablet'>{children}</div>
        </div>
      </body>
    </html>
  );
}
