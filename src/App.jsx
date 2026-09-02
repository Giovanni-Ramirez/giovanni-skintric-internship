import './App.css'
import Navbar from './components/navbar';
import { IoTriangleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';


function App() {

  return (
    <>
      <Navbar />
      <div className="landing__container">
        {/* left button */}
        <div className="outer_sqaure left_square"></div>
        <div className='landing__button_container left_text_container'>
          <div className="landing__button left__button">
            <IoTriangleSharp  className='landing__button_icon'/>
          </div>
          <p className='landing__button_text'>DISCOVER A.I.</p>
        </div>

        {/* right button */}
        <div className="outer_sqaure right_square"></div>
        <Link to={'testing'} className='landing__button_container right_text_container'>
          <p className='landing__button_text'>TAKE TEST</p>
          <div className="landing__button right__button">
            <IoTriangleSharp  className='landing__button_icon'/>
          </div>
        </Link>

        <div className="spacer_left"></div>
        <div className="landing__heading_text">
          <h1>
            Sophisticated
            <br />
            <span className='landing__heading_span'>skincare</span>
          </h1>
        </div>
        <div className="spacer_right"></div>
      </div>
    </>
  )
}

export default App
