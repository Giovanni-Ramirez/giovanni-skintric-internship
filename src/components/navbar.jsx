import { Link } from 'react-router-dom';
import '../assets/css/navbar.css'

function nabar() {
    return (
        <nav className="navbar">
            <div className='left_nav_container'>
                <Link to="/idk" className='nav_font'><p>sKINsTRIC</p></Link>
                <p className='nav_font faded'>[<span className='span_spacing'>INTRO</span>]</p>
            </div>
            <div>
                <button className='nav__btn'>
                    ENTER CODE
                </button>
            </div>
        </nav>
    );
}

export default nabar;