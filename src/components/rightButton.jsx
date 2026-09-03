import { IoTriangleSharp } from 'react-icons/io5'
import './button.css'

export default function RightButton({text}) {
    return (
        <div to={'testing'} className='landing__button_container right_text_container'>
            <p className='landing__button_text'>{text}</p>
            <div className="landing__button right__button">
                <IoTriangleSharp  className='landing__button_icon'/>
            </div>
        </div>
    )
}