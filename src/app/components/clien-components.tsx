"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function MyClientComponent() {
  const t = useTranslations("skateparktest");
  const [count, setCount] = useState(0);

  console.log("Client component rendered");

  return (
    <div className="max-w-md mx-auto mt-10 bg-blue-50 rounded-lg shadow-lg border-2 border-blue-300">
      <div className="p-8">
        <p className="text-xl font-bold text-blue-700 text-center">
          This is a client component
        </p>
        <p className="text-lg font-semibold text-gray-800 text-center">
          {t("some phrase")}
        </p>
      </div>
      <div className="mt-4 flex flex-col items-center p-4">
        <p className="text-lg text-gray-700 mb-2">{count} clicks</p>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Click me
        </button>
      </div>
    </div>
  );
}
