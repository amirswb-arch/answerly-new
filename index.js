import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import AnswerCard from '../components/AnswerCard'
import axios from 'axios'

export default function Home(){
  const [result, setResult] = useState(null)
  const [question, setQuestion] = useState('')

  async function handleResult(data){
    setQuestion(data.question)
    setResult(data.answer)
  }

  async function expand(){
    if(!question) return
    const res = await axios.post('/api/generate-answer', { question, detailed: true })
    setResult(res.data.answer)
  }

  return (
    <div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Ask anything — your AI study buddy gives smart answers instantly!</h2>
        <SearchBar onResult={handleResult} />
      </div>

      {result && (
        <AnswerCard question={question} answer={result} onExpand={expand} />
      )}

      <div className="my-4 card">
        <h3 className="font-semibold">Submit your own answer</h3>
        <p className="text-sm text-gray-600">Type the question and your answer below — AI will check it and give feedback.</p>
        <AskForm />
      </div>
    </div>
  )
}

function AskForm(){
  const [q,setQ] = useState('')
  const [a,setA] = useState('')
  const [res,setRes] = useState(null)
  const [loading,setLoading]=useState(false)

  async function handleCheck(e){
    e.preventDefault()
    if(!q||!a) return alert('Please enter both question and your answer')
    setLoading(true)
    try{
      const r = await axios.post('/api/validate-answer', { question: q, studentAnswer: a })
      setRes(r.data)
    }catch(err){
      console.error(err)
      alert('Error validating answer')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleCheck} className="mt-3">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Question" className="w-full p-2 rounded-md mb-2" />
      <textarea value={a} onChange={e=>setA(e.target.value)} placeholder="Your answer" className="w-full p-2 rounded-md mb-2" rows={4} />
      <div className="flex gap-2">
        <button className="px-3 py-2 bg-blue-600 text-white rounded-md" disabled={loading}>{loading? 'Checking...':'Check Answer'}</button>
        <button type="button" className="px-3 py-2 bg-gray-100 rounded-md" onClick={()=>{setQ('');setA('');setRes(null)}}>Clear</button>
      </div>

      {res && (
        <div className="mt-3 card">
          <h4 className="font-semibold">AI Feedback: {res.verdict}</h4>
          <p className="mt-2">{res.feedback}</p>
        </div>
      )}
    </form>
  )
}
