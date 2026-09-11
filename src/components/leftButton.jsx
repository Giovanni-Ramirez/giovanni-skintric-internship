import { IoTriangleSharp } from 'react-icons/io5'
import './button.css'

export default function LeftButton({text , onClick , isWhite}) {
    return (
        <>
            {isWhite === true ? (
                <div onClick={onClick} className='landing__button_container_component left_text_container'>
                    <div className="landing__button left__button white__btn">
                        <IoTriangleSharp  className='landing__button_icon white__btn_icon'/>
                    </div>
                    <p className='landing__button_text white_text'>{text}</p>
                </div>
            ) : (
                <div onClick={onClick} className='landing__button_container_component left_text_container'>
                    <div className="landing__button left__button">
                        <IoTriangleSharp  className='landing__button_icon'/>
                    </div>
                    <p className='landing__button_text'>{text}</p>
                </div>
            )}
        </>
    )
}