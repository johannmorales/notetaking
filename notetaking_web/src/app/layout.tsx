"use client";

import { Inria_Serif, Inter } from "next/font/google";
import { AuthProvider } from "@/context/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { GlobalLoadingBar } from "@/components/GlobalLoadingBar";
import "./globals.css";

const queryClient = new QueryClient();

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const inriaSerif = Inria_Serif({
  variable: "--font-inria",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${inriaSerif.variable} antialiased bg-[#FAF1E3] p-4 h-screen`}
      >
        <App>{children}</App>
      </body>
    </html>
  );
}

export const App = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalLoadingBar />
        <Toaster />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};
