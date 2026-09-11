import { Link, useLocation } from 'react-router-dom';
import '../assets/css/navbar.css'

export default function Nabar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className='left_nav_container'>
                <Link to="/" className='nav_font'><p>SKINSTRIC</p></Link>
                <p className='nav_font faded'>[<span className='span_spacing'>INTRO</span>]</p>
            </div>
            <div>
                {location.pathname === '/' && (
                    <button className='nav__btn'>
                        ENTER CODE
                    </button>
                )}
            </div> 
        </nav>
    );
}