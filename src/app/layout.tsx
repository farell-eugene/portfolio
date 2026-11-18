import type { Metadata, Viewport } from "next";
import { Fira_Code, Fira_Sans, Instrument_Serif } from "next/font/google";
import { AmbientBackground } from "@/components/ambient-background";
import { GlassFilter } from "@/components/glass-filter";
import { MotionRoot } from "@/components/motion-root";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

/**
 * Runs before first paint:
 * - restores the visitor's accent (warm / blue)
 * - adds .motion so animated elements start hidden instead of flashing (skipped for reduced motion)
 * - adds .lite on weaker devices or data-saver mode (≤4 CPU threads, ≤4 GB RAM, Save-Data),
 *   or when the URL contains ?lite, so the heaviest effects switch off
 */
const motionInitScript = `try{var d=document.documentElement,n=navigator,c=n.connection;var a=localStorage.getItem('accent');d.dataset.accent=(a==='blue'||a==='warm')?a:'warm';if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion');if((n.hardwareConcurrency&&n.hardwareConcurrency<=4)||(n.deviceMemory&&n.deviceMemory<=4)||(c&&c.saveData)||location.search.indexOf('lite')>-1)d.classList.add('lite')}catch(e){document.documentElement.dataset.accent='warm'}`;

export const metadata: Metadata = {
  title: "Farell Eugene | Data Science, AI & Business Intelligence",
  description:
    "Portfolio of Farell Eugene, Information Systems student at Universitas Multimedia Nusantara focused on data science, machine learning, AI and business intelligence.",
  openGraph: {
    title: "Farell Eugene | Data Science, AI & Business Intelligence",
    description:
      "Machine learning, deep learning, BI dashboards and data engineering projects by Farell Eugene.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0c0a09" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-accent="warm"
      suppressHydrationWarning
      className={`${firaSans.variable} ${firaCode.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <GlassFilter />
        <ThemeProvider>
          <SmoothScroll />
          <ScrollProgress />
          {children}
          <MotionRoot />
        </ThemeProvider>
      </body>
    </html>
  );
}
