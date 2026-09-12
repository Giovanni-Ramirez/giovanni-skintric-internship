import { useRef, useEffect, useState } from 'react';
import { useCamera, } from '../../../CameraContext';
import { useNavigate } from 'react-router-dom';
import './capture.css';
import cameraIcon from '../../../assets/camera-icon.png'
import LeftButton from '../../../components/leftButton';
import RightButton from '../../../components/rightButton';

export default function Capture() {
    const { stream, stopCamera } = useCamera();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [base64Image, setBase64Image] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }

        return () => {
            stopCamera();
        };
    }, [stream, stopCamera]);

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext('2d');
            // Match canvas dimensions to the incoming video resolution
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Draw the current video frame onto the canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // set it to a base64 image
            const photoDataUrl = canvas.toDataURL('image/jpeg');
            setBase64Image(photoDataUrl);
        }
    };

    const useThisPhoto = () => {
        stopCamera();
        navigate('/analysis', { state: { photoBase64: base64Image } });
    }

    return (
    <div className='capture__page'>
        {!base64Image && (
            <div className='shutter__btn_contaier' onClick={takePhoto}>
                <div className='shutter__btn_text'>TAKE PICTURE</div>
                <div className='shutter__btn_wrapper'>
                    <div className='shutter__btn_icon_wrapper'>
                        <img className='shutter__btn_icon' src={cameraIcon} alt="" />
                    </div>
                </div>
            </div>
        )}

        {base64Image && (
            <>
            <img className='captured_photo' src={base64Image}></img>
            </>
        )}

        <div className="great_shot">Great Shot!</div>

        <div className="bottom__bar">
            {base64Image ?
                    <LeftButton  text={'RETAKE'} onClick={() => setBase64Image('')} isWhite={true}/>
                :
                <div></div>
            }
            {!base64Image && (
                <div className='photo_requirements'>
                    <div className='photo__requirements_title'>TO GET BETTER RESULTS MAKE SURE TO HAVE</div>
                    <div className='photo__requirements_container'>
                        <div className="photo__requirments">
                            <div className='photo__requirements_icon'></div>
                            <div className='photo__requirements_text'>NEUTRAL EXPRESSION</div>
                        </div>
                        <div className="photo__requirments">
                            <div className='photo__requirements_icon'></div>
                            <div className='photo__requirements_text'>FRONTAL POSE</div>
                        </div>
                        <div className="photo__requirments">
                            <div className='photo__requirements_icon'></div>
                            <div className='photo__requirements_text'>ADEQUATE LIGHTING</div>
                        </div>
                    </div>
                </div>
            )}
            {base64Image ? 
                <RightButton text={'PROCEED'} onClick={useThisPhoto} isWhite={true}/>
                :
                <div></div>
            }
        </div>



        <div className='video__wrapper'>
            <video
            ref={videoRef}
            autoPlay
            playsInline /* Crucial for mobile safari/chrome */
            className='video__feed'
            />
        </div>
        

        {/* Hidden canvas used solely for rendering the snapshot image file */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

    </div>
    )
}