import { useRouter } from 'next/router'

export default function QuestionPage(){
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="card">
      <h2 className="font-semibold">Question: {id}</h2>
      <p className="mt-2">This is a placeholder question page. In full deployment, Q&A are stored in DB and each gets its own URL for SEO.</p>
    </div>
  )
}
