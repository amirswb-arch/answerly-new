export default function AnswerCard({ question, answer, onExpand }){
  return (
    <div className="card my-3">
      <h3 className="font-semibold">Q: {question}</h3>
      <p className="mt-2">{answer}</p>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 bg-gray-100 rounded-md text-sm" onClick={onExpand}>Need more details? → Expand Answer</button>
      </div>
    </div>
  )
}
