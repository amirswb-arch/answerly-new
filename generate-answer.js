import axios from 'axios'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { question, detailed } = req.body
  if(!question) return res.status(400).json({ error: 'Missing question' })

  const OPENAI_KEY = process.env.OPENAI_API_KEY || ''
  try{
    let answer = ''
    if(!OPENAI_KEY){
      answer = `Short answer (demo): This is a concise student-style answer for: ${question}.` + (detailed? ' Detailed part: expand more here...':'')
    } else {
      const prompt = `You are a friendly student tutor. Answer the question in ${detailed? 'detailed':'short student-style 2-3 paragraphs'} tone. Question: ${question}`
      const apiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: 'You are a friendly student tutor.' }, { role: 'user', content: prompt }],
        max_tokens: detailed? 700: 250,
      }, {
        headers: { Authorization: `Bearer ${OPENAI_KEY}` }
      })
      answer = apiRes.data.choices[0].message.content
    }

    return res.status(200).json({ question, answer })
  }catch(err){
    console.error(err.response?.data || err.message)
    return res.status(500).json({ error: 'AI generation failed' })
  }
}
