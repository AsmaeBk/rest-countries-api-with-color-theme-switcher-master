import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CountryDetails.css';

export default function CountryDetails({ theme }) {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
        
        if (!response.ok) {
          throw new Error(`Country not found (${response.status})`);
        }
        
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (cca3) fetchCountry();
  }, [cca3]);

  if (isLoading) return <h1>Loading country details...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (!country) return <h1>Country not found</h1>;

  return (
    <div className={`country-details ${theme}`}>
      <Link to="/" className={`back-button ${theme}-element`}>
        ← Back
      </Link>

      <div className="details-grid">
        <img 
          src={country.flags?.png} 
          alt={country.name?.common} 
        />

        <div className="details-info">
          <h1>{country.name?.common}</h1>

          <p><strong>Native Name:</strong> {country.name?.nativeName ? 
            Object.values(country.name.nativeName)[0]?.common || 'N/A' : 'N/A'}</p>
          
          <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Sub Region:</strong> {country.subregion}</p>
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          
          <p><strong>Top Level Domain:</strong> {country.tld?.join(', ')}</p>
          
          <p><strong>Currencies:</strong> {
            country.currencies ? 
            Object.values(country.currencies).map(c => c.name).join(', ') : 
            'N/A'
          }</p>
          
          <p><strong>Languages:</strong> {
            country.languages ? 
            Object.values(country.languages).join(', ') : 
            'N/A'
          }</p>

          {country.borders && country.borders.length > 0 && (
            <div>
              <strong>Border Countries:</strong>
              <div className="border-countries">
                {country.borders.map(border => (
                  <button 
                    key={border} 
                    className={`border-btn ${theme}-element`}
                  >
                    {border}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}