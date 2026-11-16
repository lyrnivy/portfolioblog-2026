import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Ivy Ocampo — Developer, Content Creator &Photographer",
  description:
    "Portfolio of Ivy Ocampo — React developer, content creator and photographer. Development work, travel blogs, and UGC.",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "XkQZGSLLHYIVLCh4fBI4fDfdrBf3XkgelCXQzHUkMdU",
  },
};

// No stored choice -> pick by the device's local clock: dark at night (19:00-06:59),
// light during the day. An explicit toggle ('light' | 'dark') always wins.
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var h=new Date().getHours();var night=h<7||h>=19;if(t==='dark'||(!t&&night)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
