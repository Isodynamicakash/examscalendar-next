import "./globals.css";

// Site-wide defaults. Every page can override title/description via its
// own generateMetadata() — this is just the fallback (huge upgrade from
// your current single static <title>ExamsCalendar.PYQ</title>).
export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://www.examscalendar.com"),
  title: {
    default: "ExamsCalendar — Free JEE, NEET & SSC CGL Previous Year Questions",
    template: "%s | ExamsCalendar",
  },
  description:
    "Chapter-wise and year-wise previous year questions for JEE Main, JEE Advanced, NEET and SSC CGL — with detailed solutions, free.",
  openGraph: {
    siteName: "ExamsCalendar",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0a0d14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics — same tag you already use */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TBZZSLN2TK"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TBZZSLN2TK');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
