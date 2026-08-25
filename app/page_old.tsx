import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 pt-20 pb-32 relative overflow-hidden">
        {/* Gradient Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400 to-transparent rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400 to-transparent rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 relative z-10">
          <div className="flex flex-col sm:flex-row gap-12 items-center">
            {/* Profile Photo */}
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Image
                src="/profile.jpg"
                alt="Mohan Regmi"
                width={240}
                height={240}
                className="relative rounded-2xl object-cover w-60 h-60 shadow-2xl ring-4 ring-white dark:ring-slate-900"
                priority
              />
            </div>

            {/* Bio Section */}
            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                  Mohan Regmi
                </h1>
                <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold">
                  Executive Operations & MIS Professional
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Data-Driven Decision Support Specialist
                </p>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                Highly organized executive support professional with 8+ years of expertise in management reporting, incentive modeling, and operational excellence. Proven track record of supporting C-suite leadership with strategic insights and automated solutions.
              </p>

              <div className="flex gap-4 pt-4 flex-wrap">
                <a
                  href="/blog"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  📖 Read Blog
                </a>
                <a
                  href="/gallery"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  🎨 Gallery
                </a>
                <a
                  href="/cv.pdf"
                  download
                  className="px-8 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-all"
                >
                  📄 Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Overview */}
      <section className="w-full bg-white dark:bg-slate-900 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Professional Profile
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
              Executive expertise across operations, MIS, and strategic planning
            </p>
            <div className="grid md:grid-cols-3 gap-8">
            {/* Core Competencies */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-8 rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">🎯 Core Competencies</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex gap-2"><span className="text-blue-600">✓</span> Executive Liaison Support</li>
                <li className="flex gap-2"><span className="text-blue-600">✓</span> MIS & Dashboard Reporting</li>
                <li className="flex gap-2"><span className="text-blue-600">✓</span> Incentive Analysis</li>
                <li className="flex gap-2"><span className="text-blue-600">✓</span> Strategic Planning</li>
                <li className="flex gap-2"><span className="text-blue-600">✓</span> Process Automation</li>
              </ul>
            </div>

            {/* Technical Skills */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-8 rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-4">💻 Technical Skills</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex gap-2"><span className="text-purple-600">✓</span> Advanced MS Excel</li>
                <li className="flex gap-2"><span className="text-purple-600">✓</span> Python & Automation</li>
                <li className="flex gap-2"><span className="text-purple-600">✓</span> PowerPoint & Presentations</li>
                <li className="flex gap-2"><span className="text-purple-600">✓</span> KPI Dashboards</li>
                <li className="flex gap-2"><span className="text-purple-600">✓</span> CRM Systems</li>
              </ul>
            </div>

            {/* Experience */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-8 rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">⭐ Highlights</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex gap-2"><span className="text-slate-600 dark:text-slate-400">📌</span> 8+ years experience</li>
                <li className="flex gap-2"><span className="text-slate-600 dark:text-slate-400">📌</span> C-suite support</li>
                <li className="flex gap-2"><span className="text-slate-600 dark:text-slate-400">📌</span> 30% efficiency gains</li>
                <li className="flex gap-2"><span className="text-slate-600 dark:text-slate-400">📌</span> Multi-branch management</li>
                <li className="flex gap-2"><span className="text-slate-600 dark:text-slate-400">📌</span> Strategic advisor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Professional Journey
            </h2>

            <div className="space-y-8">
            {/* Job 1 */}
            <div className="relative pl-8 border-l-4 border-blue-600">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full ring-4 ring-white dark:ring-slate-900"></div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">Executive Operations & MIS Coordinator</h3>
                <p className="text-purple-600 dark:text-purple-400 font-semibold mt-1">Subisu - RSBU Unit | July 2023 - Present</p>
                <p className="text-slate-600 dark:text-slate-400 mt-3">Supporting COO/AVP with executive presentations, incentive modeling, and automated reporting solutions. Reduced preparation time by 30% through Excel automation.</p>
              </div>
            </div>

            {/* Job 2 */}
            <div className="relative pl-8 border-l-4 border-purple-600">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full ring-4 ring-white dark:ring-slate-900"></div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">Sales & Marketing Officer</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">Subisu - Branch Business Unit | November 2021 - July 2023</p>
                <p className="text-slate-600 dark:text-slate-400 mt-3">Managed nationwide branding coordination and market research. Supported sales planning and strategic marketing initiatives.</p>
              </div>
            </div>

            {/* Job 3 */}
            <div className="relative pl-8 border-l-4 border-slate-400">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-400 rounded-full ring-4 ring-white dark:ring-slate-900"></div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">Marketing Supervisor</h3>
                <p className="text-slate-600 dark:text-slate-400 font-semibold mt-1">Subisu Cable Net Ltd. | August 2018 - October 2021</p>
                <p className="text-slate-600 dark:text-slate-400 mt-3">Led daily marketing operations and team management. Maintained CRM data accuracy and coordinated departmental initiatives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-blue-100 text-lg mb-8">Interested in collaboration or have questions? Reach out through my social media or download my CV.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://www.linkedin.com/in/rmohanegmi" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
                💼 Connect on LinkedIn
              </a>
              <a href="/cv.pdf" download className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg">
                📥 Get My CV
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
