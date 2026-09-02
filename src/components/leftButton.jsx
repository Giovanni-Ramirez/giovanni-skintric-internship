import { IoTriangleSharp } from 'react-icons/io5'
import './button.css'

export default function LeftButton({text}) {
    return (
        <div className='landing__button_container left_text_container'>
            <div className="landing__button left__button">
            <IoTriangleSharp  className='landing__button_icon'/>
            </div>
            <p className='landing__button_text'>{text}</p>
        </div>
    )
}