import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Muditya Raghav - Full Stack Developer",
  description: "Full Stack Developer passionate about creating innovative digital solutions with modern technologies.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Muditya Raghav"],
  authors: [{ name: "Muditya Raghav" }],
  creator: "Muditya Raghav",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Muditya Raghav - Full Stack Developer",
    description: "Full Stack Developer passionate about creating innovative digital solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muditya Raghav - Full Stack Developer",
    description: "Full Stack Developer passionate about creating innovative digital solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          defaultTheme="system"
          storageKey="ui-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
