import { FaRegMoon } from "react-icons/fa";
import './Header.css';
export default function Header({toggleTheme, theme}){
    
    return(
        <header className={`${theme}-element`} >
            <h1>Where in the world?</h1>
            <button className={`${theme}-element`} onClick={toggleTheme}>
                <FaRegMoon />
                <span>Dark Mode</span>
                </button>
        </header>
    )
}