import {FaSearch} from "react-icons/fa";
import './SearchBar.css'
import clsx from 'clsx';
import '../index.css'
export default function SearchBar({theme}) {

    return (
        <div className={clsx('search-bar ',`${theme}-element`,{
            'box-shadow-dark': theme == 'dark-theme'
        })}>  
            <FaSearch className='search-icont' />
            <input 
                type="search"
                placeholder="Search for a country..."
                className={`${theme}-element`}
            />
        </div>
    )
}