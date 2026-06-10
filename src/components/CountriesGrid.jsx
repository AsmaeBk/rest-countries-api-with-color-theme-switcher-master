import {useEffect, useState} from 'react'
const API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca3,population,region,subregion,capital,flags,tld,currencies';
import './CountriesGrid.css'
import clsx from 'clsx';
import '../index.css'
import { Link } from 'react-router-dom';
export default function ContriesGrid({theme, loadRegions, region, searchTerm}) {

    const [countries, setCountries] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=>{
            
        async function fetchCountries() {
            setIsLoading(true);
            try {

                const response = await fetch(API_URL);
                
                if(!response.ok) {
                    throw new Error(`Http error, status : ${response.status}`);
                }
                const data = await response.json();
                setCountries(data)
                if(loadRegions) {
                    loadRegions(data)
                }
                
            } catch (err) {
                setError(err.message)
                console.log(err.message)   
            } finally {
                setIsLoading(false)
            }

        }
        fetchCountries();
    } , [])
 
    return (
        <section className="countries-container">
            { isLoading ? <h1>Loading...</h1>  : error !== null ?<h1
            >{error.message}</h1> :
                countries.filter(
                    (country)=> { 
                      const matchesRegion = region === 'all' || 
                           region === 'filterByRegion' || 
                           country.region === region;

                    const matchesSearch = searchTerm === '' || 
                        country.name.common.toLowerCase().includes(searchTerm.toLowerCase());

                    return matchesRegion && matchesSearch;
                    }
                )
                .map( 
                    (country)=> {
                      return( <Link key={country.cca3} to={`/country/${country.cca3}`} >
                            <article key={country.cca3}  className={clsx('countries-article', {
                                'dark-theme-element': theme === 'dark-theme',
                                'light-theme-element': theme === 'light-theme',
                                })} >
                                                            
                                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
                                    <h1>{country.name.common}</h1>
                                    <h2>Population: <span>{country.population.toLocaleString()}</span></h2>
                                    <h2>Region: <span>{country.region}</span></h2>
                                    <h2>Capital: <span>{country.capital?.[0] || 'N/A'}</span></h2>
                                </article> 
                        </Link> 
                            )
                        
                    }

                ) 
            }
        </section>

    )
    
}