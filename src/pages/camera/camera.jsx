import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useCamera } from '../../CameraContext';
import cameraIcon from '../../assets/camera-icon.webp';
import './camera.css'

const styles = {
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    }
};

export default function Camera() {
    const { stream, startCamera } = useCamera();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');

    useEffect(() => {
        if (stream && stream.active) {
            if (location.pathname === '/camera') {
                navigate('/camera/capture', { replace: true });
            }
            return;
        }

        startCamera()
            .then(() => {
                navigate('/camera/capture', { replace: true });
            })
            .catch((err) => {
                console.error(err);
                setError('Camera permission denied or device unavailable.');
            });
    }, [stream, startCamera, navigate, location.pathname]);

    const isSetupRoute = location.pathname === '/camera';

    if (error) {
        return (
            <div style={styles.center}>
                <p style={{ color: 'red' }}>{error}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
        );
    }

    if (isSetupRoute) {
        return (
            <div className='camera_page'>
                <div className='bg_boxes'>
                    <div className="bg_innner box"></div>
                    <div className="bg_middle box" ></div>
                    <div className="bg_outer box"></div>
                </div>

                <div className='camera__loading_info'>
                    <img className='camera__loading_img' src={cameraIcon}></img>
                    <p className='camera__loading_text'>SETTING UP CAMERA ...</p>
                </div>

                <div className='camera_requirements'>
                    <div className='camera__requirements_title'>TO GET BETTER RESULTS MAKE SURE TO HAVE</div>
                    <div className='camera__requirements_container'>
                        <div className="camera__requirments">
                            <div className='camera__requirements_icon'></div>
                            <div className='camera__requirements_text'>NEUTRAL EXPRESSION</div>
                        </div>
                        <div className="camera__requirments">
                            <div className='camera__requirements_icon'></div>
                            <div className='camera__requirements_text'>FRONTAL POSE</div>
                        </div>
                        <div className="camera__requirments">
                            <div className='camera__requirements_icon'></div>
                            <div className='camera__requirements_text'>ADEQUATE LIGHTING</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <Outlet />;
}    