'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SkillItem {
  name: string;
  cat: 'tech' | 'competency' | 'achievement';
  icon: string;
  level: number;
}

interface PortfolioData {
  profilePic: string;
  name: string;
  title: string;
  subtitle: string;
  status: string;
  bio: string;
  stats: {
    stat1Val: string; stat1Lbl: string;
    stat2Val: string; stat2Lbl: string;
    stat3Val: string; stat3Lbl: string;
    stat4Val: string; stat4Lbl: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  skills: SkillItem[];
}

const DEFAULT_DATA: PortfolioData = {
  profilePic: "https://regmimohan.com.np/_next/image?url=%2Fprofile.jpg&w=640&q=75",
  name: "Mohan Regmi",
  title: "Executive Operations & MIS Professional",
  subtitle: "Strategic Operations Expert | Data Intelligence Specialist | Process Optimization Advocate",
  status: "Available for Executive Operations & MIS Consulting",
  bio: "With 8+ years of experience in executive operations and management information systems, I specialize in supporting C-level leadership with strategic insights, automated solutions, and data-driven decision-making frameworks.",
  stats: {
    stat1Val: "8+", stat1Lbl: "Years Experience",
    stat2Val: "3+", stat2Lbl: "Positions Held",
    stat3Val: "30%", stat3Lbl: "Time Saved",
    stat4Val: "100+", stat4Lbl: "C-Suite Reports"
  },
  contact: {
    email: "mohanregmi@email.com",
    phone: "+977 9842681302",
    location: "Kathmandu, Nepal",
    linkedin: "https://www.linkedin.com/in/rmohanegmi",
    facebook: "https://www.facebook.com/Rmohanegmi",
    instagram: "https://www.instagram.com/nahomohan/"
  },
  skills: [
    { name: "Advanced MS Excel & Macros", cat: "tech", icon: "💻", level: 95 },
    { name: "Python Process Automation", cat: "tech", icon: "🐍", level: 88 },
    { name: "PowerPoint & C-Suite Presentations", cat: "tech", icon: "📊", level: 92 },
    { name: "Executive KPI Dashboards", cat: "tech", icon: "📈", level: 94 },
    { name: "CRM Systems & Integrity", cat: "tech", icon: "🗄️", level: 90 },

    { name: "Executive Support & Briefings", cat: "competency", icon: "🎯", level: 95 },
    { name: "MIS Reporting Frameworks", cat: "competency", icon: "📌", level: 96 },
    { name: "Incentive Modeling & Analysis", cat: "competency", icon: "🧮", level: 90 },
    { name: "Strategic Operations Planning", cat: "competency", icon: "🧩", level: 91 },
    { name: "Workflow Process Automation", cat: "competency", icon: "⚡", level: 93 },

    { name: "30% Operational Time Saved", cat: "achievement", icon: "⭐", level: 98 },
    { name: "Subisu RSBU Executive Support", cat: "achievement", icon: "🏢", level: 95 },
    { name: "Nationwide Branch Coordination", cat: "achievement", icon: "🌐", level: 90 },
    { name: "Automated Reporting Pipelines", cat: "achievement", icon: "🔄", level: 94 },
    { name: "KPI & Data Precision Optimization", cat: "achievement", icon: "🏅", level: 92 }
  ]
};

export default function Home() {
  const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const [loginUser, setLoginUser] = useState("admin");
  const [loginPass, setLoginPass] = useState("admin123");
  const [loginError, setLoginError] = useState("");

  // Showcase state
  const [showcaseTab, setShowcaseTab] = useState<'analytics' | 'roi'>('analytics');
  const [chartType, setChartType] = useState<'reporting-hours' | 'accuracy-rate' | 'executive-decisions'>('reporting-hours');
  const [roiHours, setRoiHours] = useState(20);
  const [roiTeam, setRoiTeam] = useState(3);
  const [skillCategory, setSkillCategory] = useState<string>('all');
  const [copyToast, setCopyToast] = useState(false);
  const [formFeedback, setFormFeedback] = useState("");

  // Hydrate state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mohan_portfolio_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved portfolio data:", e);
      }
    }
  }, []);

  const saveToStorage = (updated: PortfolioData) => {
    setData(updated);
    localStorage.setItem('mohan_portfolio_data', JSON.stringify(updated));
  };

  const handleTextEdit = (keyPath: string, value: string) => {
    const next = JSON.parse(JSON.stringify(data));
    const parts = keyPath.split('.');
    let curr = next;
    for (let i = 0; i < parts.length - 1; i++) {
      curr = curr[parts[i]];
    }
    curr[parts[parts.length - 1]] = value;
    saveToStorage(next);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((loginUser === 'admin' || loginUser === 'mohanregmi@email.com') && loginPass === 'admin123') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password. Try 'admin' / 'admin123'");
    }
  };

  // Social-Media Style File Upload Handler (FileReader -> Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedFile(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUploadedPhoto = () => {
    if (selectedFile) {
      saveToStorage({ ...data, profilePic: selectedFile });
      setShowPhotoModal(false);
      setSelectedFile(null);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "mohan_regmi_portfolio_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetDefaults = () => {
    if (confirm("Reset portfolio data back to default values?")) {
      saveToStorage(DEFAULT_DATA);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.contact.email);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback("Thank you! Your message has been sent to Mohan Regmi.");
    setTimeout(() => setFormFeedback(""), 5000);
  };

  // Chart datasets
  const DATASETS = {
    'reporting-hours': {
      label: "Weekly Prep Hours (Before vs After)",
      before: [24, 26, 22, 25, 28, 25],
      after:  [ 7,  6,  5,  6,  5,  4]
    },
    'accuracy-rate': {
      label: "MIS Data Accuracy Rate (%)",
      before: [82, 85, 84, 88, 86, 89],
      after:  [98, 99, 99.5, 99.8, 99.9, 100]
    },
    'executive-decisions': {
      label: "C-Suite Strategic Briefings Delivered",
      before: [ 4,  5,  4,  6,  5,  5],
      after:  [12, 15, 14, 18, 16, 20]
    }
  };
  const activeDS = DATASETS[chartType];
  const maxVal = Math.max(...activeDS.before, ...activeDS.after) * 1.15;
  const months = ['Q1 Jul', 'Q1 Sep', 'Q2 Nov', 'Q2 Jan', 'Q3 Mar', 'Q4 May'];

  const annualHoursSaved = Math.round(roiHours * roiTeam * 52 * 0.30);

  const filteredSkills = skillCategory === 'all'
    ? data.skills
    : data.skills.filter(s => s.cat === skillCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      
      {/* Ambient Lighting FX */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-1/4 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Sticky Top Admin Toolbar (When Admin Logged In) */}
      {isAdmin && (
        <div className="sticky top-0 z-50 bg-blue-950/90 border-b border-blue-500/40 backdrop-blur-xl px-6 py-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold text-sm text-emerald-300">Admin Editing Mode Active — Double-click fields to edit!</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={() => setShowPhotoModal(true)} className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors flex items-center gap-1">
                📷 Change Photo
              </button>
              <button onClick={handleExportJSON} className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-600 transition-colors">
                📥 Export JSON
              </button>
              <button onClick={handleResetDefaults} className="px-3 py-1.5 rounded bg-rose-950/80 hover:bg-rose-900 text-xs font-semibold text-rose-300 border border-rose-700/50 transition-colors">
                🔄 Reset Defaults
              </button>
              <button onClick={() => setIsAdmin(false)} className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                MR
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">Mohan Regmi</span>
              <span className="text-xs text-slate-400 font-medium">Executive Operations & MIS</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-slate-300 hover:text-blue-400 font-medium text-sm transition-colors">About</a>
            <a href="#showcase" className="text-slate-300 hover:text-blue-400 font-medium text-sm transition-colors flex items-center gap-1.5">
              <span>MIS Showcase</span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Interactive</span>
            </a>
            <a href="#experience" className="text-slate-300 hover:text-blue-400 font-medium text-sm transition-colors">Experience</a>
            <a href="#skills" className="text-slate-300 hover:text-blue-400 font-medium text-sm transition-colors">Skills</a>
            <a href="#contact" className="text-slate-300 hover:text-blue-400 font-medium text-sm transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => isAdmin ? setIsAdmin(false) : setShowLoginModal(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500 transition-all"
            >
              🔒 {isAdmin ? "Admin Active" : "Admin Access"}
            </button>

            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 transition-all">
              <span>Get in Touch</span> →
            </a>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* Full-Screen Hero Section */}
        <section id="about" className="relative min-h-[calc(100vh-5rem)] flex items-center py-16 lg:py-24 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Hero Details */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span
                    contentEditable={isAdmin}
                    onBlur={(e) => handleTextEdit('status', e.currentTarget.textContent || "")}
                    className="text-xs font-semibold tracking-wide text-slate-300 uppercase"
                  >
                    {data.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <h1
                    contentEditable={isAdmin}
                    onBlur={(e) => handleTextEdit('name', e.currentTarget.textContent || "")}
                    className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
                  >
                    {data.name}
                  </h1>
                  <p
                    contentEditable={isAdmin}
                    onBlur={(e) => handleTextEdit('title', e.currentTarget.textContent || "")}
                    className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400"
                  >
                    {data.title}
                  </p>
                  <p
                    contentEditable={isAdmin}
                    onBlur={(e) => handleTextEdit('subtitle', e.currentTarget.textContent || "")}
                    className="text-base sm:text-lg text-slate-400 font-medium tracking-wide"
                  >
                    {data.subtitle}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-900/40 border-l-4 border-blue-500 border-y border-r border-slate-800/80 shadow-2xl">
                  <p
                    contentEditable={isAdmin}
                    onBlur={(e) => handleTextEdit('bio', e.currentTarget.textContent || "")}
                    className="text-slate-300 leading-relaxed text-base sm:text-lg"
                  >
                    {data.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="#showcase" className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2">
                    📊 Explore MIS Showcase
                  </a>
                  <a href="/cv.pdf" download className="px-7 py-3.5 rounded-xl font-semibold text-blue-300 bg-slate-900 border border-blue-500/40 hover:bg-blue-600/10 hover:text-white transition-all flex items-center gap-2">
                    📄 Download CV
                  </a>
                  <a href="#contact" className="px-7 py-3.5 rounded-xl font-semibold text-slate-300 bg-slate-900/60 border border-slate-700 hover:border-slate-500 hover:text-white transition-all flex items-center gap-2">
                    ✉️ Get in Touch
                  </a>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center hover:border-blue-500/50 transition-colors">
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('stats.stat1Val', e.currentTarget.textContent || "")} className="text-3xl font-extrabold text-blue-400">{data.stats.stat1Val}</div>
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('stats.stat1Lbl', e.currentTarget.textContent || "")} className="text-xs text-slate-400 mt-1 font-medium">{data.stats.stat1Lbl}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center hover:border-purple-500/50 transition-colors">
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('stats.stat2Val', e.currentTarget.textContent || "")} className="text-3xl font-extrabold text-purple-400">{data.stats.stat2Val}</div>
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('stats.stat2Lbl', e.currentTarget.textContent || "")} className="text-xs text-slate-400 mt-1 font-medium">{data.stats.stat2Lbl}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center hover:border-emerald-500/50 transition-colors">
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('stats.stat3Val', e.currentTarget.textContent || "")} className="text-3xl font-extrabold text-emerald-400">{data.stats.stat3Val}</div>
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('stats.stat3Lbl', e.currentTarget.textContent || "")} className="text-xs text-slate-400 mt-1 font-medium">{data.stats.stat3Lbl}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center hover:border-amber-500/50 transition-colors">
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('stats.stat4Val', e.currentTarget.textContent || "")} className="text-3xl font-extrabold text-amber-400">{data.stats.stat4Val}</div>
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('stats.stat4Lbl', e.currentTarget.textContent || "")} className="text-xs text-slate-400 mt-1 font-medium">{data.stats.stat4Lbl}</div>
                  </div>
                </div>

              </div>

              {/* Profile Card with Social-Media Camera Change Button */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-40 animate-pulse-slow"></div>
                  
                  <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-inner group">
                      <Image
                        src={data.profilePic}
                        alt="Mohan Regmi"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      
                      {/* Facebook / Instagram Style Camera Badge Button */}
                      <button
                        onClick={() => {
                          if (!isAdmin) {
                            setShowLoginModal(true);
                          } else {
                            setShowPhotoModal(true);
                          }
                        }}
                        className="absolute top-3 right-3 z-20 px-3.5 py-1.5 rounded-full bg-slate-950/90 hover:bg-blue-600 text-white text-xs font-semibold border border-slate-700 hover:border-blue-400 backdrop-blur-md shadow-xl transition-all flex items-center gap-1.5 transform hover:scale-105"
                        title="Change Profile Photo"
                      >
                        📷 <span>Change Photo</span>
                      </button>

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                      
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-700">
                          <span className="text-xs font-semibold text-white">Kathmandu, Nepal</span>
                        </div>
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg font-bold">
                          ✓
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                        <span className="flex items-center gap-1.5">🏢 Subisu - RSBU Unit</span>
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded font-semibold">Active Executive</span>
                      </div>
                      
                      <div className="flex items-center justify-around pt-1">
                        <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-blue-600 transition-all hover:scale-110">
                          💼 LinkedIn
                        </a>
                        <a href={data.contact.facebook} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-blue-600 transition-all hover:scale-110">
                          👍 Facebook
                        </a>
                        <a href={data.contact.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-purple-600 transition-all hover:scale-110">
                          📷 Instagram
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Interactive MIS Showcase */}
        <section id="showcase" className="py-20 bg-slate-900/40 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
                  📈 Interactive Intelligence Demo
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Management Information Systems Showcase
                </h2>
                <p className="text-slate-400 mt-2 text-base max-w-2xl">
                  Explore live executive dashboards and process automation models crafted by Mohan Regmi.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setShowcaseTab('analytics')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showcaseTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Executive KPI Dashboard
                </button>
                <button
                  onClick={() => setShowcaseTab('roi')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showcaseTab === 'roi' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Automation ROI Calculator
                </button>
              </div>
            </div>

            {showcaseTab === 'analytics' ? (
              <div className="p-6 lg:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <h3 className="font-bold text-white text-lg">Subisu RSBU Operational Efficiency Trends</h3>
                    <p className="text-xs text-slate-400">Monthly reporting throughput before & after automated Excel/Python pipelines</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Dataset View:</span>
                    <select
                      value={chartType}
                      onChange={(e) => setChartType(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
                    >
                      <option value="reporting-hours">Report Generation Time (Hours Saved)</option>
                      <option value="accuracy-rate">MIS Data Accuracy Rate (%)</option>
                      <option value="executive-decisions">C-Suite Briefing Output</option>
                    </select>
                  </div>
                </div>

                <div className="py-6">
                  <div className="relative w-full h-72 bg-slate-900/80 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between">
                    <svg className="w-full h-full relative z-10 overflow-visible" viewBox="0 0 800 220" preserveAspectRatio="none">
                      {months.map((m, i) => {
                        const xBase = 60 + i * (680 / (months.length - 1));
                        const bHeight = (activeDS.before[i] / maxVal) * 160;
                        const bY = 180 - bHeight;
                        const aHeight = (activeDS.after[i] / maxVal) * 160;
                        const aY = 180 - aHeight;

                        return (
                          <g key={m}>
                            <rect x={xBase - 18} y={bY} width={14} height={bHeight} rx={4} fill="#475569" opacity="0.6" />
                            <rect x={xBase + 4} y={aY} width={14} height={aHeight} rx={4} fill="#3b82f6" />
                            <text x={xBase + 4} y={aY - 6} fontSize={10} fontWeight="bold" fill="#60a5fa" textAnchor="middle">{activeDS.after[i]}</text>
                          </g>
                        );
                      })}
                    </svg>

                    <div className="flex justify-between text-xs text-slate-400 pt-2 px-2 border-t border-slate-800">
                      {months.map(m => <span key={m}>{m}</span>)}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded bg-emerald-500/20 text-emerald-400">📉</div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Efficiency Gain</div>
                      <div className="text-lg font-bold text-white">30% Overhead Reduced</div>
                      <div className="text-xs text-emerald-400 mt-0.5">Automated macros & template sync</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded bg-blue-500/20 text-blue-400">🛡️</div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Data Precision</div>
                      <div className="text-lg font-bold text-white">99.8% CRM Accuracy</div>
                      <div className="text-xs text-blue-400 mt-0.5">Standardized data validation rules</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded bg-purple-500/20 text-purple-400">⏱️</div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Turnaround Speed</div>
                      <div className="text-lg font-bold text-white">Same-Day Executive Insights</div>
                      <div className="text-xs text-purple-400 mt-0.5">Instant incentive & sales modeling</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 lg:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-white">Process Automation ROI Calculator</h3>
                    <p className="text-sm text-slate-400">Calculate how much executive operational time Mohan's MIS workflow optimization saves your organization.</p>
                  </div>

                  <div className="space-y-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-300">Weekly Hours spent preparing manual reports:</span>
                        <span className="font-bold text-blue-400">{roiHours} Hours/week</span>
                      </div>
                      <input
                        type="range" min="5" max="60" value={roiHours}
                        onChange={(e) => setRoiHours(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-300">Team Size / Executive Analysts:</span>
                        <span className="font-bold text-purple-400">{roiTeam} Analysts</span>
                      </div>
                      <input
                        type="range" min="1" max="15" value={roiTeam}
                        onChange={(e) => setRoiTeam(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 text-center">
                      <div className="text-xs uppercase tracking-wider text-blue-300 font-bold mb-1">Annual Hours Saved</div>
                      <div className="text-4xl font-extrabold text-white">{annualHoursSaved.toLocaleString()} Hours</div>
                      <div className="text-xs text-slate-400 mt-2">Freeing analysts for high-level strategy</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/30 text-center">
                      <div className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-1">Productivity Efficiency Boost</div>
                      <div className="text-4xl font-extrabold text-white">+30% Gain</div>
                      <div className="text-xs text-slate-400 mt-2">Accelerated C-suite decision pipeline</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-3">
                💼 Work History
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Professional Journey
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full mt-4"></div>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-slate-800">
              {/* Job 1 */}
              <div className="group relative grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">Jul 2023 - Present</span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Executive Operations & MIS Coordinator</h3>
                  <p className="text-blue-400 font-semibold text-sm">Subisu - RSBU Unit</p>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-slate-950 shadow-lg shadow-blue-500/50 z-10"></div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/60 transition-all shadow-xl">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Supporting COO/AVP with executive presentations, incentive modeling, and automated reporting solutions. Reduced preparation time by 30% through Excel automation and process optimization.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-slate-300">Executive Support</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-slate-300">Excel Automation</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-slate-300">Incentive Modeling</span>
                  </div>
                </div>
              </div>

              {/* Job 2 */}
              <div className="group relative grid md:grid-cols-2 gap-8 items-center">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/60 transition-all shadow-xl md:order-1 order-2">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Managed nationwide branding coordination and market research. Supported sales planning and strategic marketing initiatives across multiple branches.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-slate-300">Market Research</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-slate-300">Sales Planning</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-slate-300">Branding</span>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-500 border-4 border-slate-950 shadow-lg shadow-purple-500/50 z-10"></div>
                <div className="space-y-2 md:order-2 order-1">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">Nov 2021 - Jul 2023</span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Sales & Marketing Officer</h3>
                  <p className="text-purple-400 font-semibold text-sm">Subisu - Branch Business Unit</p>
                </div>
              </div>

              {/* Job 3 */}
              <div className="group relative grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">Aug 2018 - Oct 2021</span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-slate-300 transition-colors">Marketing Supervisor</h3>
                  <p className="text-slate-400 font-semibold text-sm">Subisu Cable Net Ltd.</p>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-600 border-4 border-slate-950 shadow-lg z-10"></div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-600 transition-all shadow-xl">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Led daily marketing operations and team management. Maintained CRM data accuracy and coordinated departmental initiatives.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-slate-300">Operations Leadership</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-slate-300">CRM Systems</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Skills Matrix */}
        <section id="skills" className="py-24 bg-slate-900/30 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
                  ⚙️ Core Capabilities
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Skills & Expertise Matrix
                </h2>
              </div>

              <div className="flex flex-wrap bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {['all', 'tech', 'competency', 'achievement'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSkillCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all capitalize ${skillCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((s, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl">
                      {s.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-400">{s.level}% Mastery</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-base">{s.name}</h4>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${s.level}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Let's Connect
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-4"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl">✉️</div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Email Direct</div>
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('contact.email', e.currentTarget.textContent || "")} className="text-slate-200 font-bold text-base">{data.contact.email}</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-2xl">📞</div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Phone / WhatsApp</div>
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('contact.phone', e.currentTarget.textContent || "")} className="text-slate-200 font-bold text-base">{data.contact.phone}</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl">📍</div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Location</div>
                    <div contentEditable={isAdmin} onBlur={(e) => handleTextEdit('contact.location', e.currentTarget.textContent || "")} className="text-slate-200 font-bold text-base">{data.contact.location}</div>
                  </div>
                </div>

                <button onClick={handleCopyEmail} className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2">
                  📋 <span>{copyToast ? "Copied to Clipboard! ✓" : "Copy Email Address"}</span>
                </button>
              </div>

              <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300">Your Name</label>
                      <input type="text" required placeholder="e.g. Executive Partner" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300">Your Email</label>
                      <input type="email" required placeholder="name@company.com" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Inquiry Topic</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-blue-500 focus:outline-none">
                      <option>Executive Operations Consulting</option>
                      <option>MIS & Report Automation Setup</option>
                      <option>Career Opportunity / Executive Role</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Message</label>
                    <textarea rows={4} required placeholder="How can Mohan assist your team?" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-blue-500 focus:outline-none"></textarea>
                  </div>

                  <button type="submit" className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl transition-all">
                    Send Message ✈️
                  </button>

                  {formFeedback && (
                    <div className="text-center p-3 rounded-lg text-sm font-semibold bg-emerald-500/20 border border-emerald-500 text-emerald-300">
                      {formFeedback}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800/80 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm">
            © 2026 Mohan Regmi. All Rights Reserved.
          </div>
          <div className="text-slate-500 text-xs flex items-center gap-2">
            <span>Executive Operations Portfolio</span>
            <span>•</span>
            <span>Powered by Next.js & Vercel</span>
          </div>
        </div>
      </footer>

      {/* Social-Media Style Photo Selector Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative">
            <button onClick={() => { setShowPhotoModal(false); setSelectedFile(null); }} className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl font-bold">
              ✕
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto text-3xl">
                📷
              </div>
              <h3 className="text-2xl font-bold text-white">Update Profile Picture</h3>
              <p className="text-xs text-slate-400">Select a new photo directly from your device or phone (just like Facebook & Instagram).</p>
            </div>

            {/* Photo Preview Box */}
            <div className="flex flex-col items-center space-y-4 py-2">
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-blue-500/80 shadow-2xl bg-slate-950">
                <Image
                  src={selectedFile || data.profilePic}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Upload Button */}
              <label className="cursor-pointer px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-xl flex items-center gap-2 transform hover:scale-105">
                📁 <span>Choose Photo from Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-[11px] text-slate-400">Supports JPG, PNG, WEBP, or GIF images</span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  if (confirm("Reset to default profile photo?")) {
                    saveToStorage({ ...data, profilePic: DEFAULT_DATA.profilePic });
                    setShowPhotoModal(false);
                    setSelectedFile(null);
                  }
                }}
                className="text-xs text-rose-400 hover:underline"
              >
                Reset Default Photo
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setShowPhotoModal(false); setSelectedFile(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUploadedPhoto}
                  disabled={!selectedFile}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg transition-all ${
                    selectedFile
                      ? 'bg-blue-600 hover:bg-blue-500 cursor-pointer shadow-blue-500/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Save Profile Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl">
              ✕
            </button>

            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto text-2xl">
                🔒
              </div>
              <h3 className="text-2xl font-bold text-white">Admin Authentication</h3>
              <p className="text-xs text-slate-400">Enter admin credentials to activate live editing mode.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Username / Email</label>
                <input
                  type="text" required value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <input
                  type="password" required value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {loginError && (
                <div className="text-xs text-rose-400 font-semibold text-center">{loginError}</div>
              )}

              <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-sm transition-colors shadow-lg shadow-blue-500/20">
                Sign In & Activate Editor
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
