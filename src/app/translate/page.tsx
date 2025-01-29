'use client'
import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TranslatePage = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("ja");

  const handleTranslate = async () => {
    if (!inputText) return;

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          target: targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);

      // Save the translation to the database
      await prisma.translation.create({
        data: {
          originalText: inputText,
          translatedText: data.translatedText,
          targetLanguage,
        },
      });
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Google Translate Demo</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter text to translate"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <select
        className="w-full p-2 border rounded mb-4"
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="ja">Japanese</option>
        <option value="zh">Chinese</option>
        <option value="en">English</option>
      </select>
      <button
        className="w-full bg-blue-500 text-white p-2 rounded"
        onClick={handleTranslate}
      >
        Translate
      </button>
      {translatedText && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-semibold mb-2">Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslatePage;

