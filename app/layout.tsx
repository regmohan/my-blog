import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://regmimohan.com.np'),
  title: {
    default: "Mohan Regmi — Executive Operations & MIS Professional | Kathmandu, Nepal",
    template: "%s | Mohan Regmi"
  },
  description: "Official portfolio of Mohan Regmi, Executive Operations & MIS Coordinator specializing in C-suite decision support, data intelligence, and process automation in Nepal.",
  keywords: [
    "Mohan Regmi",
    "Executive Operations",
    "MIS Professional",
    "Subisu Operations Coordinator",
    "Management Information Systems Nepal",
    "Kathmandu Operations Specialist",
    "Process Automation Expert",
    "C-Suite Reporting",
    "Data Intelligence Specialist"
  ],
  authors: [{ name: "Mohan Regmi", url: "https://regmimohan.com.np" }],
  creator: "Mohan Regmi",
  publisher: "Mohan Regmi",
  alternates: {
    canonical: "https://regmimohan.com.np",
  },
  openGraph: {
    title: "Mohan Regmi — Executive Operations & MIS Professional",
    description: "Supporting C-level leadership with strategic insights, automated reporting, and data-driven decision-making frameworks.",
    url: "https://regmimohan.com.np",
    siteName: "Mohan Regmi Portfolio",
    images: [
      {
        url: "https://regmimohan.com.np/_next/image?url=%2Fprofile.jpg&w=640&q=75",
        width: 1200,
        height: 630,
        alt: "Mohan Regmi — Executive Operations & MIS Professional",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohan Regmi — Executive Operations & MIS Professional",
    description: "Supporting C-level leadership with strategic insights, automated reporting, and data-driven decision-making frameworks.",
    images: ["https://regmimohan.com.np/_next/image?url=%2Fprofile.jpg&w=640&q=75"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'google-site-verification-placeholder',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohan Regmi",
    "url": "https://regmimohan.com.np",
    "image": "https://regmimohan.com.np/_next/image?url=%2Fprofile.jpg&w=640&q=75",
    "jobTitle": "Executive Operations & MIS Coordinator",
    "worksFor": {
      "@type": "Organization",
      "name": "Subisu Cable Net Ltd."
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressCountry": "Nepal"
    },
    "sameAs": [
      "https://www.linkedin.com/in/rmohanegmi",
      "https://www.facebook.com/Rmohanegmi",
      "https://www.instagram.com/nahomohan/"
    ],
    "description": "Executive Operations & Management Information Systems (MIS) Professional based in Kathmandu, Nepal."
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
