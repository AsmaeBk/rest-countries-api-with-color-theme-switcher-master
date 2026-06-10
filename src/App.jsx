import './App.css'
import {useState} from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import Countries from './components/CountriesGrid'
import FilterByRegion from './components/FilterByRegion';

function App() {
  const [theme, setTheme] = useState("light-theme");
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("filterByRegion");
  function toggleTheme(){
  
    setTheme(prev => prev ==="light-theme"?"dark-theme" :"light-theme")

  }

  function chooseFilter(region){
    setRegion(region);
  }
  function loadRegions(data){
    setRegions([...new Set(data.map((country=>country.region)))])
  }
  return (
    <>
      <main className={`${theme} main-container`} >
        <Header toggleTheme={toggleTheme} theme ={theme}/>
        <section className='search-filter'>
          <SearchBar theme ={theme}/>
          <FilterByRegion regions={regions} theme ={theme} chooseFilter={chooseFilter}/>
        </section>
        <Countries theme ={theme} loadRegions={loadRegions} region={region}/>
      </main>
    </>
  )
}

export default App
