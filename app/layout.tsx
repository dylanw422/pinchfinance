import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Pinch",
  description: "A new way to manage personal finances.",
  openGraph: {
    type: "website",
    title: "Pinch",
    description: "A new way to manage personal finances.",
    url: "https://pinch-topaz.vercel.app",
    siteName: "Pinch",
    images: [
      {
        url: "https://pinch-topaz.vercel.app/pinchLogoColor.webp",
        width: 500,
        height: 500,
        alt: "Pinch",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
