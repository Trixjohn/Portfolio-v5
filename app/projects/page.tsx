"use client";

import Link from "next/link";

const allProjects = [
  {
    title: "SkyTrack",
    desc: "Weather app with real-time API using Flutter + Laravel.",
    tech: ["Flutter", "Laravel", "API"],
  },
  {
    title: "Data Warehouse",
    desc: "Analytics system with dashboards and reporting tools.",
    tech: ["SQL", "Dashboard", "Analytics"],
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio showcasing skills and projects.",
    tech: ["Next.js", "Tailwind CSS", "React"],
  },
  {
    title: "Task Manager",
    desc: "Full-stack task management application with real-time updates.",
    tech: ["Laravel", "JavaScript", "Database"],
  },
];

export default function Projects() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen relative">
      {/* SUBTLE GLOW */}
      <div className="absolute top-[-300px] left-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        {/* HEADER */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-blue-400 transition mb-6 inline-block"
          >
            ← back
          </Link>
          <h1 className="text-4xl font-bold">All Projects</h1>
          <p className="text-gray-400 mt-3">A collection of my recent work and experiments</p>
        </div>

        {/* PROJECTS GRID */}
        <div className="space-y-8">
          {allProjects.map((p) => (
            <div
              key={p.title}
              className="group cursor-pointer"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 group-hover:bg-white/10 group-hover:border-blue-500/30 transition">
                <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                <p className="text-gray-400 mt-3">{p.desc}</p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded text-gray-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
