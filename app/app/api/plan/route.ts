import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { destination, period, travelType, purpose, departure } = body;

  const systemPrompt = `あなたは、利用者の旅行計画を支援するAI旅行プランナーです。
予算30万円以内（航空券・宿泊・食費込み）で現実的な国内・海外旅行を提案してください。
ユーザーの条件は以下の通りです。
- 出発地: ${departure}
- 旅行期間: ${period}
- 旅行タイプ: ${travelType}
- 旅の目的: ${purpose}
- 希望地: ${destination}

それぞれのプランには以下を含めてください：
1. おすすめポイント
2. 予算内での想定旅程（移動・宿泊・観光の概要）
3. 参考予約サイトリンク（楽天トラベル、じゃらん、Expedia、Trip.comなど）

最後に「この中で興味があるものがあれば予約リンクをご案内します」と記載してください。
回答は日本語と英語の両方でお願いします。`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: '旅行プランをお願いします。',
        },
      ],
    }),
  });

  const data = await res.json();

  return NextResponse.json({ result: data.choices?.[0]?.message?.content ?? 'No response' });
}
