import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CameraIcon from '../../assets/camera-icon.webp';
import GalleryIcon from '../../assets/gallery-icon.webp';
import lineIcon from '../../assets/ResGalleryLine.webp';
import './result.css';
import LeftButton from "../../components/leftButton";
import Navbar from "../../components/navbar";

export default function Result() {
    const [photoBase64, setPhotoBase64] = useState();
    const navigate = useNavigate();

    const photoProcess = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                setPhotoBase64(base64String);
                navigate('/analysis', { state: { photoBase64: base64String } });
            }
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="result__page">
            <div className="preview__img_container">
                <div className="preview__img_wrapper">
                    {photoBase64 && (
                        <img className="preview__img" src={photoBase64} alt="your photo selected"/>
                    )}
                </div>
            </div>
            
            {/* CENTER BUTTONS */}
            <div className="result__options_container">
                <Navbar className='navbar'/>
                <div className="result__options_wrapper">
                    <div className="option__container camera__btn">
                        <label htmlFor="" style={{ display: 'inline-block', cursor: 'pointer' }}>
                            <img className="option__icon" src={CameraIcon} alt="Choose a photo from gallery"  />
                        </label>
                        <img className="line_icon_camera" src={lineIcon} alt="" />
                        <p className="option__text camera__text">ALLOW A.I.<br/>TO SCAN YOUR FACE</p>

                        {/* background boxes */}
                            <div className="box__inner box"></div>
                            <div className="box__middle box"></div>
                            <div className="box__outer box"></div>
                    </div>

                    <div className="option__container gallery__btn">
                        <label htmlFor="photo-upload" style={{ display: 'inline-block', cursor: 'pointer' }}>
                            <img className="option__icon" src={GalleryIcon} alt="Choose a photo"  />
                        </label>
                        <input id="photo-upload" type="file" accept="image/*" onChange={photoProcess} style={{ display: 'none' }} />
                        <img className="line_icon_gallery" src={lineIcon} alt="" />
                        <p className="option__text gallery__text">ALLOW A.I.<br/>ACCESS GALLERY</p>


                        {/* background boxes */}
                            <div className="box__inner box"></div>
                            <div className="box__middle box"></div>
                            <div className="box__outer box"></div>
                    </div>
                </div>
                <div className="bottom__bar">
                    <LeftButton text={'BACK'}/>
                </div>
            </div>
        </div>
    )
}