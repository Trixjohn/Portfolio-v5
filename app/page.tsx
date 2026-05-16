"use client";

const skills = ["Html", "Css", "Laravel", "JavaScript",];

const projects = [
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
];

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen relative">
      {/* SUBTLE GLOW */}
      <div className="absolute top-[-300px] left-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-20 space-y-32">

        {/* HEADER / PROFILE */}
        <div className="border-b border-white/10 pb-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
              <img
                src="/TrixProfile.jpeg"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Trix Villaceran</h1>
              <p className="text-sm text-gray-400 mt-1">trixjohn1234@gmail.com</p>
              <p className="text-sm text-gray-500 mt-2">future Fullstack Dev</p>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about">
          <h2 className="text-xl font-bold text-gray-300 mb-6">about me</h2>
          <p className="text-gray-400 leading-relaxed">
            I am currently studying at the University of Science and Technology of Southern Philippines (USTP), pursuing my journey in Information Technology. I am passionate about building modern and interactive digital experiences, especially in web and mobile development.
          </p>
          <p className="text-gray-400 leading-relaxed mt-6">
            I enjoy learning new technologies and improving my skills in frontend and backend development. Right now, I am focused on growing my knowledge in frameworks like Next.js, Laravel, and Flutter while working on personal and academic projects.
            
          </p>
          <p className="text-gray-400 leading-relaxed mt-6">
           My goal is to become a full-stack developer who creates meaningful, efficient, and user-friendly applications that solve real-world problems.
          </p>
        </section>

        {/* FEATURED WORK */}
        <section id="projects">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-300">featured work</h2>
            <a href="/projects" className="text-sm text-gray-500 hover:text-gray-300">view all →</a>
          </div>
          
          <div className="space-y-8">
            {projects.map((p) => (
              <div
                key={p.title}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 group-hover:bg-white/10 group-hover:border-blue-500/30 transition">
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
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
        </section>

        {/* SKILLS */}
        <section id="skills">
          <h2 className="text-xl font-bold text-gray-300 mb-6">skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full text-sm text-gray-400 border border-white/10">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-white/10 pt-12">
          <h2 className="text-xl font-bold text-gray-300 mb-6">contact</h2>
          <p className="text-gray-400 mb-4">
            Interested in working together? Feel free to reach out.
          </p>
          <div className="flex gap-4">
            <a href="trixjohn0830@gmail.com
            " className="text-blue-400 hover:underline">Email</a>
            <a href="https://github.com/Trixjohn" className="text-blue-400 hover:underline">GitHub</a>
            <a href="https://www.linkedin.com/in/trix-john-726833198/" className="text-blue-400 hover:underline">LinkedIn</a>
          </div>
        </section>

      </div>
    </main>
  );
}