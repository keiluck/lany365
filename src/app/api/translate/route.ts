// // API route for Google Translate
// import { NextRequest, NextResponse } from 'next/server';

// export async function handler(req: { method: string; body: { text: any; target: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; translatedText?: any; }): void; new(): any; }; }; }) {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }
  
//     const { text, target } = req.body;
  
//     try {
//       const response = await fetch(
//         `https://translation.googleapis.com/language/translate/v2`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
//           },
//           body: JSON.stringify({
//             q: text,
//             target,
//           }),
//         }
//       );
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch translation");
//       }
  
//       const data = await response.json();
//       res.status(200).json({ translatedText: data.data.translations[0].translatedText });
//     } catch (error) {
//       console.error("Translation error:", error);
//       res.status(500).json({ error: "Failed to translate text" });
//     }
//   }
  
import { NextResponse } from "next/server";

export async function POST(req: { json: () => any; }) {
  try {
    const body = await req.json();
    const { text, target } = body;

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
        },
        body: JSON.stringify({ q: text, target }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch translation" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ translatedText: data.data.translations[0].translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Failed to translate text" }, { status: 500 });
  }
}
