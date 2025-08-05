'use client';
import ReactQueryProvider from "@/utils/providers/reactQuery";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner"; // Ensure this is the correct import
import { Poppins } from 'next/font/google'
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
 
import "./globals.css";
import { useProjects } from "@/reactQuery/mutation/home";
import { AuthProvider } from "@/contexts/authContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-gray-100">
        <AuthProvider>
        <ReactQueryProvider>
        <ProgressBar
        height={"4px"}
        color="#78bf2b"
        options={{ showSpinner: false }}
        shallowRouting
        stopDelay={200}
        startPosition={0.3}
        nonce="nonce"
      />
            <Header />
            <Toaster />
            {children}
            <Footer />
        </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}