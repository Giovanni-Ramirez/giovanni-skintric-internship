import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import LeftButton from "../../components/leftButton";
import RightButton from "../../components/rightButton";
import './analysis.css'

export default function Analysis() {
    const [isLoading, setIsLoading] = useState(true);
    const [summary, setSummary] = useState('');

    const { state } = useLocation();
    const base64Image = state?.photoBase64;
    const navigate = useNavigate();

    useEffect(() => {
        if (!base64Image) {
            return;
        }

        const postImage = async () => {
        try {
            const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Image })
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const result = await response.json();
            setIsLoading(false);
            setSummary(result);
            localStorage.setItem('resultsSummary', JSON.stringify(result));
            // console.log(result);
        } catch (error) {
            console.error('Error sending photo:', error);
        }
        };

        postImage();
    }, [base64Image]);

    return (
        <div className="anaylsis__page">
            {!isLoading && (
                <Navbar />
            )}


            {isLoading ? 
                <div className="analysing__container">
                    <p>PREPARING YOUR ANALYSIS ...</p>
                    <div className="loading_bg_box inner__box"></div>
                    <div className="loading_bg_box middle__box"></div>
                    <div className="loading_bg_box outer__box"></div>
                </div>
            :
                <div className="options__container">
                    <div className="options skin_type_btn"><span className="rotated__text">SKIN TYPE<br/>DETAILS</span></div>
                    <Link className="options demographics_btn" to={'/summary'}>
                        <div><span className="rotated__text ">DEMOGRAPHICS</span></div>
                    </Link>
                    <div className="options weather_btn"><span className="rotated__text">WEATHER</span></div>
                    <div className="options cosmetic_btn"><span className="rotated__text">COSMETIC<br/>CONCERNS</span></div>

                    <div className="bg_box bg_box_inner"></div>
                    <div className="bg_box bg_box_middle"></div>
                    <div className="bg_box bg_box_outer"></div>
                </div>
            }

            {!isLoading && (
                <div className="bottom__bar_container">
                    <Link to={'/result'}>
                        <LeftButton  text={'BACK'}/>
                    </Link>
                    <Link to={'/summary'}>
                        <RightButton text={'GET SUMMARY '}/>
                    </Link>
                </div>
            )}
        </div>
    )
}