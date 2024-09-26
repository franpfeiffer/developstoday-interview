import Link from 'next/link'

async function getCountries() {
  const res = await fetch('http://localhost:3000/api/countries')
  if (!res.ok) {
    throw new Error('Failed to fetch countries')
  }
  return res.json()
}

export default async function Home() {
  const countries = await getCountries()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Countries</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country: { code: string; name: string }) => (
          <li key={country.code} className="bg-white shadow rounded-lg p-4">
            <Link href={`/country/${country.code}`} className="text-blue-600 hover:underline">
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
