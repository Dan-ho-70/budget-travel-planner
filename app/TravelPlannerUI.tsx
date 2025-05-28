"use client";

import { useState } from "react";

export default function TravelPlannerUI() {
  const [departure, setDeparture] = useState("");
  const [period, setPeriod] = useState("");
  const [travelType, setTravelType] = useState("");
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [other, setOther] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    setResult("");

    const response = await fetch("/api/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ departure, period, travelType, destination, purpose, other }),
    });

    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧳 Budget Travel Planner</h1>

      <div className="space-y-3 mb-6">
        <input className="w-full p-2 border" placeholder="出発地 / Departure" value={departure} onChange={(e) => setDeparture(e.target.value)} />
        <input className="w-full p-2 border" placeholder="旅行期間 / Travel Period (例: 6月10日〜6月16日)" value={period} onChange={(e) => setPeriod(e.target.value)} />
        <input className="w-full p-2 border" placeholder="旅行タイプ / Travel Type (自然・文化・食など)" value={travelType} onChange={(e) => setTravelType(e.target.value)} />
        <input className="w-full p-2 border" placeholder="国内 or 海外 / Domestic or International" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <input className="w-full p-2 border" placeholder="目的 / Purpose (例: リフレッシュ、家族旅行)" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
        <input className="w-full p-2 border" placeholder="その他の希望 / Other preferences" value={other} onChange={(e) => setOther(e.target.value)} />
      </div>

      <button onClick={generatePlan} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" disabled={loading}>
        {loading ? "生成中…" : "旅行プランを生成 / Generate Plan"}
      </button>

      {result && (
        <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded">
          {result}
        </div>
      )}
    </div>
  );
}
