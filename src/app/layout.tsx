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
  title: "Muditya Raghav - Full Stack Developer & International Relations Analyst",
  description: "Full Stack Developer passionate about creating innovative digital solutions with modern technologies. Specializing in Next.js, React, TypeScript, and Node.js. Also an International Relations analyst with expertise in geopolitical analysis.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Muditya Raghav", "International Relations", "Geopolitics", "Web Development", "Software Engineer"],
  authors: [{ name: "Muditya Raghav" }],
  creator: "Muditya Raghav",
  publisher: "Muditya Raghav",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Muditya Raghav - Full Stack Developer & International Relations Analyst",
    description: "Full Stack Developer passionate about creating innovative digital solutions with modern technologies. Specializing in Next.js, React, TypeScript, and Node.js. Also an International Relations analyst with expertise in geopolitical analysis.",
    type: "website",
    url: "https://mudityadev.com",
    siteName: "Muditya Raghav Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Muditya Raghav - Full Stack Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muditya Raghav - Full Stack Developer & International Relations Analyst",
    description: "Full Stack Developer passionate about creating innovative digital solutions with modern technologies. Specializing in Next.js, React, TypeScript, and Node.js.",
    creator: "@Mudityadev",
    site: "@Mudityadev",
    images: ["/profile.jpg"],
  },
  other: {
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          defaultTheme="dark"
          storageKey="ui-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
