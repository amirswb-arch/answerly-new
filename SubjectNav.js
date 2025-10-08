export default function SubjectNav(){
  const subjects = ['All','Math','Science','English','History','General Knowledge']
  return (
    <nav className="flex gap-3 my-4 overflow-x-auto">
      {subjects.map(s => (
        <button key={s} className="px-3 py-1 rounded-full bg-white card text-sm">{s}</button>
      ))}
    </nav>
  )
}
