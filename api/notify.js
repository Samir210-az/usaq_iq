const ALLOWED = ['https://usaqiq.aze-ai.az', 'https://samir210-az.github.io'];
const hits = new Map();

function clean(v, n) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f<>]/g, ' ').trim().slice(0, n);
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  if (!ALLOWED.includes(origin)) return res.status(403).json({ ok: false });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 600000);
  if (recent.length >= 5) return res.status(429).json({ ok: false });
  recent.push(now);
  hits.set(ip, recent);

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const phone = clean(b.phone, 12);
  if (!/^994[0-9]{9}$/.test(phone)) return res.status(400).json({ ok: false });

  const text = [
    'Yeni UşaqIQ müraciəti',
    'Valideyn: ' + clean(b.name, 60),
    'Uşaq: ' + (clean(b.child, 60) || '—') + ' (' + clean(b.age, 10) + ' yaş)',
    'Telefon: +' + phone,
    'Plan: ' + (b.plan === 'month' ? 'Aylıq' : 'Həftəlik'),
    'Ümumi nəticə: ' + clean(b.overall, 4) + '%',
    'Admin panel: https://usaqiq.aze-ai.az (loqoya 5 dəfə toxunun)'
  ].join('\n');

  const r = await fetch('https://api.telegram.org/bot' + process.env.TG_TOKEN + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: process.env.TG_CHAT, text })
  });
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
};
