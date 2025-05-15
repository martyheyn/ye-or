import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { offside } from './fonts'
import "./styles/globals.css";
import "./styles/animations.css";

export const metadata: Metadata = {
  title: "Or Hitler",
  description: "Who said it, Kanye or Hitler",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${offside.className} transition-colors duration-300 ease-in-out`} suppressHydrationWarning>
      <body className="transition-colors duration-300">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
