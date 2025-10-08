import { useState } from 'react'
import axios from 'axios'

export default function SearchBar({ onResult }){
  const [q,setQ] = useState('')
  const [loading,setLoading] = useState(false)

  async function handleAsk(e){
    e.preventDefault()
    if(!q) return
    setLoading(true)
    try{
      const res = await axios.post('/api/generate-answer', { question: q })
      onResult(res.data)
    }catch(err){
      console.error(err)
      alert('Error generating answer. Check console.')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleAsk} className="mb-4">
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Type your question..." className="flex-1 p-3 rounded-xl" />
        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" disabled={loading}>{loading? 'Thinking...':'Ask'}</button>
      </div>
    </form>
  )
}
