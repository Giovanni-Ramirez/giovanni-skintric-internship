import { IoTriangleSharp } from 'react-icons/io5'
import './button.css'

export default function RightButton({text, onClick , isWhite}) {
    return (
        <>
            {isWhite === true ?
                (
                    <div onClick={onClick} className='landing__button_container_component right_text_container'>
                        <p className='landing__button_text white_text'>{text}</p>
                        <div className="landing__button right__button white__btn">
                            <IoTriangleSharp  className='landing__button_icon white__btn_icon'/>
                        </div>
                    </div>
                ) : (
                    <div onClick={onClick} className='landing__button_container_component right_text_container'>
                    <p className='landing__button_text'>{text}</p>
                    <div className="landing__button right__button">
                    <IoTriangleSharp  className='landing__button_icon'/>
                    </div>
                    </div>
                )
            }
        </>
    )
}