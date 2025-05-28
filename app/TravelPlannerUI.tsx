"use client";

import { useState } from "react";

const labels = {
  ja: {
    title: "🧳 Budget Travel Planner",
    departure: "出発地",
    period: "旅行期間 (例: 6月10日〜6月16日)",
    travelType: "旅行タイプ (自然・文化・食など)",
    destination: "国内 or 海外",
    purpose: "目的 (例: リフレッシュ、家族旅行)",
    other: "その他の希望",
    button: "旅行プランを生成",
    loading: "生成中…"
  },
  en: {
    title: "🧳 Budget Travel Planner",
    departure: "Departure",
    period: "Travel Period (e.g., June 10–16)",
    travelType: "Travel Type (Nature, Culture, Food, etc.)",
    destination: "Domestic or International",
    purpose: "Purpose (e.g., Refresh, Family Trip)",
    other: "Other Preferences",
    button: "Generate Plan",
    loading: "Generating…"
  },
  zh: {
    title: "🧳 预算旅行规划师",
    departure: "出发地",
    period: "旅行时间 (例如: 6月10日–16日)",
    travelType: "旅行类型 (自然、文化、美食等)",
    destination: "国内或海外",
    purpose: "旅行目的 (例如: 放松、家庭旅行)",
    other: "其他要求",
    button: "生成旅行计划",
    loading: "生成中…"
  },
  ko: {
    title: "🧳 예산 여행 플래너",
    departure: "출발지",
    period: "여행 기간 (예: 6월 10일–16일)",
    travelType: "여행 유형 (자연, 문화, 음식 등)",
    destination: "국내 또는 해외",
    purpose: "여행 목적 (예: 휴식, 가족 여행)",
    other: "기타 희망사항",
    button: "여행 계획 생성",
    loading: "생성 중…"
  }
};

export default function TravelPlannerUI() {
  const [departure, setDeparture] = useState("");
  const [period, setPeriod] = useState("");
  const [travelType, setTravelType] = useState("");
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [other, setOther] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<"ja" | "en" | "zh" | "ko">("ja");

  const t = labels[lang];

  const generatePlan = async () => {
    setLoading(true);
    setResult("");

    const response = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departure, period, travelType, destination, purpose, other })
    });

    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex gap-2 justify-end mb-2">
        <button onClick={() => setLang("ja")}>🇯🇵</button>
        <button onClick={() => setLang("en")}>🇬🇧</button>
        <button onClick={() => setLang("zh")}>🇨🇳</button>
        <button onClick={() => setLang("ko")}>🇰🇷</button>
      </div>

      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>

      <div className="space-y-3 mb-6">
        <input className="w-full p-2 border" placeholder={t.departure} value={departure} onChange={(e) => setDeparture(e.target.value)} />
        <input className="w-full p-2 border" placeholder={t.period} value={period} onChange={(e) => setPeriod(e.target.value)} />
        <input className="w-full p-2 border" placeholder={t.travelType} value={travelType} onChange={(e) => setTravelType(e.target.value)} />
        <input className="w-full p-2 border" placeholder={t.destination} value={destination} onChange={(e) => setDestination(e.target.value)} />
        <input className="w-full p-2 border" placeholder={t.purpose} value={purpose} onChange={(e) => setPurpose(e.target.value)} />
        <input className="w-full p-2 border" placeholder={t.other} value={other} onChange={(e) => setOther(e.target.value)} />
      </div>

      <button onClick={generatePlan} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" disabled={loading}>
        {loading ? t.loading : t.button}
      </button>

      {result && <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded">{result}</div>}
    </div>
  );
}
