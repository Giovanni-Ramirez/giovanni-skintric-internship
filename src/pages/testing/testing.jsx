import { useState } from "react"
import './testing.css'
import { GoDotFill } from "react-icons/go";
import LeftButton from "../../components/leftButton";
import RightButton from '../../components/rightButton';
import { Link } from "react-router-dom";
import Navbar from '../../components/navbar';

export default function Testing() {    
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const lettersAndSpacesOnly = value.replace(/[^\p{L}\s]/gu, '');
        setFormData((prev) => ({ ...prev, [name]: lettersAndSpacesOnly }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (step === 1 && formData.name.trim()) {
                setStep(2);
            } else if (step === 2 && formData.location.trim()) {
                handleSubmit(e);
            }
        }
    };

    // Submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userNameLocation', JSON.stringify(formData));
        setStep(3); // Show loading state

        fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
        .then(res => res.json())
        .then(data => {
            console.log(data.success);
            setStep(4); // Show success state
        })
        .catch(err => {
            console.error('Error:', err);
            setStep(1); // Reset on error
        });
    };

    return (
        <>
        <Navbar />
        <div className="form-box">

            <div className="background__boxes">
                <div className="background__box_inner"></div>
                <div className="background__box_middle"></div>
                <div className="background__box_outer"></div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Step 1: Name */}
                {step === 1 && (
                <div className="step_content">
                    <p>click to type</p>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Introduce Yourself"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ ]+"
                    required
                    />
                </div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                <div className="step_content">
                    <p>click to type</p>
                    <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Where are you from?"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ ]+"
                    required
                    />
                </div>
                )}
            </form>

            {step === 3 && (
                <div className="step_content">
                    <p>Processing Submission</p>
                    <div className="loading__dots">
                        <GoDotFill />
                        <GoDotFill />
                        <GoDotFill />
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="step_content">
                    <p className="step_title">Thank You!</p>
                    <p className="step_text">Proceed for the next step</p>
                </div>
            )}

            <div className="bottom__control_bar">
                <LeftButton text={'BACK'}/>
                
                {step === 4 && (
                    <Link to={'/result'}>
                        <RightButton text={'PROCEED'}/>
                    </Link>
                )}
            </div>
        </div>
        </>
    );
}