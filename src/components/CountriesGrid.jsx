import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import {
  REST_COUNTRIES_BASE_URL,
  COUNTRY_FIELDS,
  REQUEST_OPTIONS,
  extractCountries,
} from '../api/restCountries'

import './CountriesGrid.css'
import '../index.css'

const API_URL =
  `${REST_COUNTRIES_BASE_URL}?response_fields=${COUNTRY_FIELDS}`

export default function CountriesGrid({
  theme,
  loadRegions,
  region,
  searchTerm,
}) {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCountries() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(API_URL, {
          ...REQUEST_OPTIONS,
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(
            `Unable to load countries. HTTP status: ${response.status}`
          )
        }

        const result = await response.json()
        const countriesData = extractCountries(result)

        setCountries(countriesData)

        if (loadRegions) {
          loadRegions(countriesData)
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
          console.error(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchCountries()

    return () => {
      controller.abort()
    }
  }, [])

  const filteredCountries = countries.filter((country) => {
    const matchesRegion =
      region === 'all' ||
      region === 'filterByRegion' ||
      country.region === region

    const countryName = country.names?.common ?? ''

    const matchesSearch =
      searchTerm === '' ||
      countryName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    return matchesRegion && matchesSearch
  })

  if (isLoading) {
    return (
      <section className="countries-container">
        <h1>Loading...</h1>
      </section>
    )
  }

  if (error) {
    return (
      <section className="countries-container">
        <h1>Error: {error}</h1>
      </section>
    )
  }

  return (
    <section className="countries-container">
      {filteredCountries.map((country) => {
        const countryCode = country.codes?.alpha_3
        const countryName = country.names?.common ?? 'Unknown country'

        return (
          <Link
            key={countryCode}
            to={`/country/${countryCode}`}
            className="country-link"
          >
            <article
              className={clsx('countries-article', {
                'dark-theme-element': theme === 'dark-theme',
                'light-theme-element': theme === 'light-theme',
              })}
            >
              <img
                src={country.flag?.url_png}
                alt={`Flag of ${countryName}`}
              />

              <h1>{countryName}</h1>

              <h2>
                Population:{' '}
                <span>
                  {country.population?.toLocaleString() ?? 'N/A'}
                </span>
              </h2>

              <h2>
                Region: <span>{country.region || 'N/A'}</span>
              </h2>

              <h2>
                Capital:{' '}
                <span>
                  {country.capitals?.[0]?.name || 'N/A'}
                </span>
              </h2>
            </article>
          </Link>
        )
      })}

      {!isLoading && filteredCountries.length === 0 && (
        <h1>No countries found.</h1>
      )}
    </section>
  )
}