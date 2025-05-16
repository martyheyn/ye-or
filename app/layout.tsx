import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { offside } from './fonts'
import { Analytics } from "@vercel/analytics/next"
import "./styles/globals.css";
import "./styles/animations.css";

export const metadata: Metadata = {
  title: "Kanye or Hitler",
  description: "Who said it, Kanye or Hitler",
  openGraph: {
    title: 'Kanye or Hitler',
    description: 'Who said it, Kanye or Hitler',
    url: 'https://kanyeorhitler.xyz',
    siteName: 'kanyeOrHitler',
    images: [
      {
        url: 'https://dbzvyi28hj36i.cloudfront.net/kanye.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://dbzvyi28hj36i.cloudfront.net/kanye.png',
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
