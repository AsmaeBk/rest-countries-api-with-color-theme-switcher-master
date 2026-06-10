import './FilterByRegion.css'
import clsx from 'clsx';
export default function FilterByRegion({regions, theme, chooseFilter}) {

    return (
        <div className={clsx('filter',`${theme}-element`,{
            'box-shadow-dark': theme === 'dark-theme'
        })}>  
            <select 
                defaultValue="filterByRegion" 
                onChange={(event)=>chooseFilter(event.target.value)} 
                className={`${theme}-element`} 
                aria-label="Filter by region"
            >
                
                <option value="filterByRegion" hidden>Filter By Region</option>
                {
                    regions.map(region =>
                    <option 
                        key={region} 
                        value={region} 
                    >
                        {region}
                    </option>)
                }
               <option value="all">Show All</option>
            </select>
        </div>
    )
}