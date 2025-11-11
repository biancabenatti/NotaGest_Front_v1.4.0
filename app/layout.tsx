'use client';

import { ReactNode, useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { NotificationProvider } from "../context/NotificationContext";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
    
      const script = document.createElement("script");
      script.src = "https://www.clarity.ms/tag/u4fzzhzwow"; 
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-jakarta antialiased">
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
