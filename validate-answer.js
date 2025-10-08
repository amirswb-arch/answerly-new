import axios from 'axios'

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { question, studentAnswer } = req.body
  if(!question || !studentAnswer) return res.status(400).json({ error: 'Missing fields' })

  const OPENAI_KEY = process.env.OPENAI_API_KEY || ''
  try{
    let feedback = { verdict: 'Unknown', feedback: 'API key not configured in demo mode. Provide OPENAI_API_KEY to enable real validation.' }
    if(OPENAI_KEY){
      const prompt = `You are an educational assistant. Determine if the student's answer is correct, partially correct, or incorrect. Provide a short verdict (Correct / Partially correct / Incorrect) and a brief feedback paragraph explaining why and how to improve.\nQuestion: ${question}\nStudent Answer: ${studentAnswer}`
      const apiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: 'You are an educational assistant that grades short answers.' }, { role: 'user', content: prompt }],
        max_tokens: 300,
      }, { headers: { Authorization: `Bearer ${OPENAI_KEY}` }})

      const out = apiRes.data.choices[0].message.content
      feedback = { verdict: 'See below', feedback: out }
    }

    return res.status(200).json(feedback)
  }catch(err){
    console.error(err.response?.data || err.message)
    return res.status(500).json({ error: 'Validation failed' })
  }
}
