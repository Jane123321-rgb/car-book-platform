// Vercel Serverless Function - API 代理
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { provider, apiKey, model, messages } = req.body;

    let apiUrl;
    if (provider === 'groq') {
      apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    } else {
      apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ success: false, error: data.error?.message || 'API 调用失败' });
    }

    return res.json({ success: true, content: data.choices[0].message.content });
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
}