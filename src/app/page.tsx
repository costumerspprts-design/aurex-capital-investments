import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-600">Bee Ai</h1>
        <p className="text-xl text-gray-600 mb-8">
          The AI-powered website builder that turns your ideas into reality.
        </p>
        <Link
          href="/builder"
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Start Building
        </Link>
      </div>
    </div>
  );
}
