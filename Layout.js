import Head from 'next/head'
import SubjectNav from './SubjectNav'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Answerly — your AI study buddy</title>
        <meta name="description" content="Ask anything — your AI study buddy gives smart answers instantly!" />
      </Head>
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-blue-600">Answerly</h1>
          <p className="text-sm text-gray-600">Ask anything — your AI study buddy gives smart answers instantly!</p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4"> 
        <SubjectNav />
        {children}
      </main>
      <footer className="max-w-4xl mx-auto p-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Answerly — Demo. Ads ready.
      </footer>
    </div>
  )
}
