import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Pesan kosong.' }, { status: 400 });
    }

    const systemInstruction = `
Kamu adalah "SPENDASI AI ASSISTANT", asisten AI resmi dari SMP Negeri 2 Sidoarjo (SPENDASI).
Jawablah pertanyaan pengunjung mengenai profil, sejarah, visi-misi, fasilitas, ekstrakurikuler, dan informasi umum SMPN 2 Sidoarjo dengan sopan, ramah, dan informatif.

Informasi Sekolah:
- Nama: SMP Negeri 2 Sidoarjo (SPENDASI)
- Alamat: Jl. Ponti, Magersari, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61212
- Kontak: (031) 8921441
- Visi: "Terwujudnya lulusan yang berkarakter, unggul dalam prestasi, berwawasan global, dan berbudaya lingkungan (Adiwiyata)."

Jika informasi tidak ada, jawab:
"Maaf, informasi tersebut belum tersedia dalam basis pengetahuan resmi SMP Negeri 2 Sidoarjo. Silakan hubungi pihak sekolah melalui kontak resmi (031) 8921441."
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
      }
    });

    return NextResponse.json({ reply: response.text });

  } catch (error: unknown) {
    return NextResponse.json({ error: 'Gagal memproses AI.' }, { status: 500 });
  }
}

