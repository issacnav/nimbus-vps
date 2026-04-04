import "./globals.css";

import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";

import { ThemeProvider } from "@/components/theme/ThemeProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

// Plus Jakarta Sans — publicly available near-identical match to Google Sans
const googleSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-google-sans",
  preload: true,
});

export const metadata: Metadata = {
  title: "NimbusVPS — Deploy Cloud Servers in Seconds",
  description:
    "High-performance VPS hosting with global reach. Deploy SSD cloud servers, manage networking, and scale instantly with NimbusVPS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.className} ${googleSans.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('nimbusvps-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();",
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
