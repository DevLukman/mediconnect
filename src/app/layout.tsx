import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
const inter = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mediconnect",
  description: "Connecting You to Quality Healthcare",
  keywords: [
    "healthcare",
    "medical appointments",
    "online doctor booking",
    "telemedicine",
    "health specialists",
    "medical consultation",
    "book doctor online",
    "healthcare platform",
    "patient portal",
    "doctor appointments Nigeria",
  ],
  creator: "MediConnect",
  publisher: "MediConnect",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${inter.variable} font-inter antialiased text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
