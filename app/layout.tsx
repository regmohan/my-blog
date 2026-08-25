import "./globals.css";

export const metadata = {
  title: "Mohan Regmi — Executive Operations & MIS Professional",
  description: "Portfolio of Mohan Regmi, Executive Operations & Management Information Systems (MIS) Professional based in Kathmandu, Nepal."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
