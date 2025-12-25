export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.json({ open: process.env.FORM_OPEN === "true" })
  }

  if (req.method !== "POST") {
    res.status(405).end()
    return
  }

  if (process.env.FORM_OPEN !== "true") {
    res.status(403).json({ error: "closed" })
    return
  }

  await fetch(process.env.WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "Novo Formulário - CyberCoders Studio",
        color: 9442302,
        fields: req.body.fields,
        footer: { text: "CyberCoders Studio - System by: Luscaa" }
      }]
    })
  })

  res.json({ success: true })
}
