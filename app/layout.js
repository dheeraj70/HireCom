import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import { Roboto } from 'next/font/google';
import Provider from "@/components/Provider";

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

export const metadata = {
  title: "HireCom",
  description: "Find jobs at ease!",
};



const  parkinsans =  Roboto({
  subsets: ['latin'], // Customize subsets as needed
  weight: ['300','400'], // Specify font weights
});

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      
      <body
        className={`${parkinsans.className} antialiased`}
      >
        <Provider>
        <Nav />
        {children}
        <script src="https://kit.fontawesome.com/7ebdac75d5.js" crossOrigin="anonymous"></script>
      </Provider>
      </body>
      
    </html>
    
  );
}
