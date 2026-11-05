import React from 'react';
import ChatWidget from '@/components/ai/ChatWidget';
import { School, Award, Users, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="sticky top-0 bg-blue-950 text-white p-4 shadow-md z-40 flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="bg-amber-400 text-blue-950 p-2 rounded-lg font-black">S2</div>
          <span className="font-bold text-sm">SMP NEGERI 2 SIDOARJO</span>
        </div>
      </nav>

      <section className="bg-blue-900 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full font-semibold">Portal Resmi Berbasis AI</span>
          <h1 className="text-3xl md:text-5xl font-extrabold">SELAMAT DATANG DI SMP NEGERI 2 SIDOARJO</h1>
          <p className="text-blue-100 text-sm md:text-base">Berkarakter, Unggul, Berwawasan Global, dan Berbudaya Lingkungan.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto -mt-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {[
          { icon: Users, title: "1000+", desc: "Siswa Aktif" },
          { icon: School, title: "32", desc: "Rombel" },
          { icon: Award, title: "Akreditasi A", desc: "Unggul" },
          { icon: BookOpen, title: "Adiwiyata", desc: "Lingkungan" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow border text-center space-y-1">
            <item.icon className="w-6 h-6 text-blue-900 mx-auto" />
            <h3 className="font-bold text-base">{item.title}</h3>
            <p className="text-[11px] text-slate-500">{item.desc}</p>
          </div>
        ))}
      </section>

      <footer className="bg-blue-950 text-blue-200 py-6 px-6 text-center text-xs mt-16 space-y-1">
        <p className="font-semibold text-white">SMP NEGERI 2 SIDOARJO</p>
        <p>Jl. Ponti, Magersari, Sidoarjo | Telp: (031) 8921441</p>
      </footer>

      <ChatWidget />
    </main>
  );
}

