import "./globals.css";
import { Sora } from "next/font/google";
import CustomCursor from "./CustomCursor";

const sora = Sora({ subsets: ["latin"] });

export const metadata = {
  title: "Trix Portfolio",
  description: "Student Dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}