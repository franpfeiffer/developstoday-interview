import Image from 'next/image'
import Link from 'next/link'
import PopulationChart from '@/components/PopulationChart'

async function getCountryInfo(countryCode: string) {
  const res = await fetch(`http://localhost:3000/api/country/${countryCode}`)
  if (!res.ok) {
    throw new Error('Failed to fetch country info')
  }
  return res.json()
}

export default async function CountryInfo({ params }: { params: { countryCode: string } }) {
  const { borderCountries, populationData, flagUrl, name } = await getCountryInfo(params.countryCode)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Image src={flagUrl} alt={`${name} Flag`} width={100} height={60} className="mr-4" />
        <h1 className="text-3xl font-bold">{name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Border Countries</h2>
          <ul className="bg-white shadow rounded-lg p-4">
            {borderCountries.map((country: { code: string; name: string }) => (
              <li key={country.code} className="mb-2">
                <Link href={`/country/${country.code}`} className="text-blue-600 hover:underline">
                  {country.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Population Over Time</h2>
          <div className="bg-white shadow rounded-lg p-4">
            <PopulationChart data={populationData} />
          </div>
        </div>
      </div>
    </div>
  )
}
