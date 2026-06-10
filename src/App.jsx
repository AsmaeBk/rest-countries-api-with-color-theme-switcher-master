import './App.css'
import {useState} from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import Countries from './components/CountriesGrid'
import FilterByRegion from './components/FilterByRegion';
import CountryDetails from './components/CountryDetails';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [theme, setTheme] = useState("light-theme");
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("filterByRegion");
  const [searchTerm, setSearchTerm] = useState("");
  function toggleTheme(){
  
    setTheme(prev => prev === "light-theme" ? "dark-theme" : "dark-theme")

  }

  function chooseFilter(selectedRegion){
    setRegion(selectedRegion);
  }
  function loadRegions(data){
    setRegions([...new Set(data.map((country=>country.region)))])
  }

  function handleSearch(term) {
    setSearchTerm(term);
  }
  return (
    <>
    <Header toggleTheme={toggleTheme} theme ={theme}/>
    <Router>
      <main className={`${theme} main-container`} >
        <Routes>
          <Route path='/' element={
            <>
              <section className='search-filter'>
                <SearchBar theme ={theme} onSearch={handleSearch}/>
                <FilterByRegion regions={regions} theme ={theme} chooseFilter={chooseFilter}/>
              </section>
              <Countries theme ={theme} loadRegions={loadRegions} region={region} searchTerm={searchTerm}/>
            </>
          }/>
          <Route path='/country/:cca3' element={
            <CountryDetails theme ={theme} loadRegions={loadRegions} region={region}/>
          }/>

        </Routes>
      
        
       
      </main>
    </Router>
    </>
  )
}

export default App
