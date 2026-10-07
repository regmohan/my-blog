import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spark Commercial BI Dashboard | Case Study Analytics — Mohan Regmi",
  description: "Automotive Commercial & Financial Assessment, Marketing Funnel Analytics, Landed Cost Unit Economics, and Receivables Aging Schedule.",
};

export default function SparkDashboardPage() {
  return (
    <div className="w-full h-screen bg-slate-50 overflow-hidden">
      <iframe
        src="/spark/index.html"
        className="w-full h-full border-0"
        title="Spark Commercial BI Dashboard"
      />
    </div>
  );
}
