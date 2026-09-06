import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  REST_COUNTRIES_BASE_URL,
  COUNTRY_FIELDS,
  REQUEST_OPTIONS,
  extractCountries,
} from '../api/restCountries'

import './CountryDetails.css'

export default function CountryDetails({ theme }) {
  const { cca3 } = useParams()

  const [country, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCountry() {
      setIsLoading(true)
      setError(null)
      setCountry(null)

      try {
        const url =
          `${REST_COUNTRIES_BASE_URL}/codes.alpha_3/` +
          `${encodeURIComponent(cca3)}` +
          `?response_fields=${COUNTRY_FIELDS}`

        const response = await fetch(url, {
          ...REQUEST_OPTIONS,
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(
            `Country not found. HTTP status: ${response.status}`
          )
        }

        const result = await response.json()
        const countryData = extractCountries(result)[0]

        if (!countryData) {
          throw new Error('Country not found')
        }

        setCountry(countryData)
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

    if (cca3) {
      fetchCountry()
    }

    return () => {
      controller.abort()
    }
  }, [cca3])

  if (isLoading) {
    return (
      <main className={`country-details ${theme}`}>
        <h1>Loading country details...</h1>
      </main>
    )
  }

  if (error) {
    return (
      <main className={`country-details ${theme}`}>
        <Link to="/" className={`back-button ${theme}-element`}>
          ← Back
        </Link>

        <h1>Error: {error}</h1>
      </main>
    )
  }

  if (!country) {
    return (
      <main className={`country-details ${theme}`}>
        <h1>Country not found</h1>
      </main>
    )
  }

  const countryName = country.names?.common ?? 'Unknown country'

  const nativeName = country.names?.native
    ? Object.values(country.names.native)[0]?.common
    : null

  const currencies =
    country.currencies
      ?.map((currency) => currency.name)
      .join(', ') || 'N/A'

  const languages =
    country.languages
      ?.map((language) => language.name)
      .join(', ') || 'N/A'

  return (
    <main className={`country-details ${theme}`}>
      <Link
        to="/"
        className={`back-button ${theme}-element`}
      >
        ← Back
      </Link>

      <div className="details-grid">
        <img
          src={country.flag?.url_png}
          alt={`Flag of ${countryName}`}
        />

        <div className="details-info">
          <h1>{countryName}</h1>

          <p>
            <strong>Native Name:</strong>{' '}
            {nativeName || 'N/A'}
          </p>

          <p>
            <strong>Population:</strong>{' '}
            {country.population?.toLocaleString() || 'N/A'}
          </p>

          <p>
            <strong>Region:</strong>{' '}
            {country.region || 'N/A'}
          </p>

          <p>
            <strong>Sub Region:</strong>{' '}
            {country.subregion || 'N/A'}
          </p>

          <p>
            <strong>Capital:</strong>{' '}
            {country.capitals?.[0]?.name || 'N/A'}
          </p>

          <p>
            <strong>Top Level Domain:</strong>{' '}
            {country.tlds?.join(', ') || 'N/A'}
          </p>

          <p>
            <strong>Currencies:</strong> {currencies}
          </p>

          <p>
            <strong>Languages:</strong> {languages}
          </p>

          {country.borders?.length > 0 && (
            <div className="borders-section">
              <strong>Border Countries:</strong>

              <div className="border-countries">
                {country.borders.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className={`border-btn ${theme}-element`}
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}