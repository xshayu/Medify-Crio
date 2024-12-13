import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const PoppinsFont = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Medify Crio",
  description: "This is a takehome assignment for Crio, done by Ayush Wardhan (Xylar)",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={PoppinsFont.className}
      >

        <div className="text-center bg-primary text-white h-[40px] text-[14px] hidden md:flex items-center justify-center"> {/* Hidden in mobile because text is too long */}
          The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.
        </div>

        {children}

        

      </body>
    </html>
  );
}
