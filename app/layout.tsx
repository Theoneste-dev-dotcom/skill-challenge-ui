"use client"
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { AppStore, makeStore } from "@/lib/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import dynamic from 'next/dynamic';

const ToastContainerWithNoSSR = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false }
);

const work_Sans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "100", "400", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <html lang="en">
      <body className={`${work_Sans.className} antialiased`}>
        <Provider store={storeRef.current}>
          <ToastContainerWithNoSSR
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnHover
            draggable
            theme="dark"
          />
          {children}
        </Provider>
      </body>
    </html>
  );
}