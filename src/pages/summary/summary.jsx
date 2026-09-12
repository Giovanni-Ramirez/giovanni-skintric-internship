import { useMemo, useState } from "react";
import Navbar from "../../components/navbar";
import './summary.css'
import LeftButton from '../../components/leftButton';
import { Link } from "react-router-dom";


export default function Summary() {
    const [selectedCatagory, setSelectedCatagory] = useState('race');

    const [data] = useState(() => {
        const savedValue = localStorage.getItem('resultsSummary');
        const parsed = savedValue ? JSON.parse(savedValue) : { data: {} };
        const data = parsed.data;
        data.sex = data.gender;
        delete data.gender;
        return data ?? {};
    });

    const [usersSelectedValues, setUsersSelectedValues] = useState(() => {
        const defaults = {};

        Object.keys(data ?? {}).forEach((categoryName) => {
            const subData = data[categoryName];
            const entries = Object.entries(subData ?? {});
            if (!entries.length) return;

            const [highestKey] = entries.reduce((max, current) => {
                return current[1] > max[1] ? current : max;
            }, entries[0]);

            defaults[categoryName] = highestKey;
        });

        return defaults;
    });

    // highest value set of each catagory
    const currentValueSet = useMemo(() => {
        const currentCatagoryArray = data[selectedCatagory];
        if (!currentCatagoryArray) return { key: '', value: 0 };

        const entries = Object.entries(currentCatagoryArray);
        if (!entries.length) return { key: '', value: 0 };

        const [highestKey, highestValue] = entries.reduce((max, current) => {
            return current[1] > max[1] ? current : max;
        }, entries[0]);

        if (usersSelectedValues[selectedCatagory]) {
            const selectedLabel = usersSelectedValues[selectedCatagory];
            const selectedValue = data[selectedCatagory]?.[selectedLabel] ?? 0;

            return {
                key: selectedLabel,
                value: selectedValue
            };
        } else {
            return { key: highestKey, value: highestValue };
        }

    }, [data, selectedCatagory, usersSelectedValues]);
    
    const displayValueSet = useMemo(() => {
        const userSelectedValue = usersSelectedValues[selectedCatagory];

        if (userSelectedValue) {
            const selectedValue = data[selectedCatagory]?.[userSelectedValue];

            return {
                key: userSelectedValue,
                value: selectedValue ?? 0
            };
        }

        return currentValueSet;
    }, [currentValueSet, data, selectedCatagory, usersSelectedValues]);

      // SVG Circle math
    const percentage = useMemo(() => {
        return Math.floor(displayValueSet.value * 100);
    }, [displayValueSet]);
    const radius = 65;
    const strokeWidth = 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const sortEntriesForCategory = (entries, selectedCatagory) => {
        const sorted = [...entries];

        if (selectedCatagory === 'race') {
            // highest confidence first
            return sorted.sort(([, confidenceA], [, confidenceB]) => confidenceB - confidenceA);
        }

        if (selectedCatagory === 'age') {
            // label lowest to highest
            return sorted.sort(([labelA], [labelB]) => {
                const startA = Number(String(labelA).match(/\d+/)?.[0] ?? 0);
                const startB = Number(String(labelB).match(/\d+/)?.[0] ?? 0);
                return startA - startB;
            });
        }

        // sex = no sorting
        return sorted;
    };

    const categoryEntries = sortEntriesForCategory(
        Object.entries(data[selectedCatagory] ?? {}),
        selectedCatagory
    );

    // this is the one that should be driven by the selected label
    const selectedLabel = usersSelectedValues[selectedCatagory];

    return (
        <>
            <Navbar />
            <div className="summary__page">

                <div className="summary__title_container">
                    <div className="summary__title_ai">A.I. ANALYSIS</div>
                    <div className="summary__title">DEMOGRAPHICS</div>
                    <div className="summary__sub_title">PREDICTED RACE & AGE</div>
                </div>

                <div className="summary__details_container">
                    <div className="summary__catagories">
                        {Object.keys(data).map((categoryName) => {
                            const subData = data[categoryName];
                            const entries = Object.entries(subData);
                            const [highestKey] = entries.reduce((max, current) => {
                                return current[1] > max[1] ? current : max;
                            }, entries[0]);

                            const isSelected = selectedCatagory === categoryName;

                            return (
                                <div
                                    className={isSelected
                                        ? "summary__catagory age__catagory selected"
                                        : "summary__catagory age__catagory"
                                    }
                                    key={categoryName}
                                    onClick={() => {
                                        // if (isSelected) return;
                                        setSelectedCatagory(categoryName);
                                    }}>
                                    <div className="summary__catatory_selection">
                                        {usersSelectedValues[categoryName]
                                            ? usersSelectedValues[categoryName].toUpperCase()
                                            : highestKey.toUpperCase()}
                                    </div>
                                    <div className="summary__catagory_title">{categoryName.toUpperCase()}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="summary__main_information">
                        <div className="summary__main_title">{displayValueSet.key}</div>
                        <div style={{ position: 'relative', width: '380px', height: '380px' }}>
                            <svg
                                width="380"
                                height="380"
                                viewBox="0 0 150 150"
                                style={{ transform: 'rotate(-90deg)' }} // Rotates SVG so progress starts at the top
                            >
                                {/* Gray Background Circle */}
                                <circle
                                    cx="75"
                                    cy="75"
                                    r={radius}
                                    stroke="#d3d3d3"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                />

                                {/* Dynamic Black Progress Circle */}
                                <circle
                                    cx="75"
                                    cy="75"
                                    r={radius}
                                    stroke="#000000"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    style={{
                                        transition: 'stroke-dashoffset 1s ease'
                                    }}
                                />
                            </svg>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '40px',
                                fontWeight: '400'
                            }}>
                                {percentage}<span className="cirle_percent">%</span>
                            </div>
                        </div>
                        <div className="Summary__main_sub_text"></div>
                    </div>

                    <div className="summary__results_options_container">
                            <div className="summary__results_title_bar">
                                <div className="summary__results_title">{selectedCatagory.toUpperCase()}</div>
                                <div className="summary__results_ai_confidence">A.I. CONFIDENCE</div>
                            </div>

                            {categoryEntries.map(([label, value]) => {
                                const isSelected = (label === selectedLabel);
                                // if (usersSelectedValues.selectedCatagory) {
                                //     const highlightThisValue = usersSelectedValues.selectedCatagory ===  label
                                    return(                                        
                                        <div
                                            className="summary__results_options"
                                            key={label}
                                            onClick={() => {
                                                setUsersSelectedValues(prev => ({
                                                    ...prev,
                                                    [selectedCatagory]: label
                                                }));
                                            }}
                                        >
                                            <div className={isSelected
                                                ? "summary__result_option selected"
                                                : "summary__result_option"
                                            }>
                                                <div className="summary__results_option_title">
                                                    <div className={isSelected
                                                        ? "summary__result_option_icon selected_icon"
                                                        : "summary__result_option_icon"
                                                    }>
                                                        <div className={isSelected
                                                            ? "summary__result_icon_dot selected_icon_dot"
                                                            : "summary__result_icon_dot"
                                                        }></div>
                                                    </div>
                                                    <div className="summary__result_option_title">{label}</div>
                                                </div>
                                                <div className="summary__result_option_percentage">
                                                    {Math.floor(value * 100)}%
                                                </div>
                                            </div>
                                        </div>
                                    )
                                // } else {
                                //     return (
                                //         <div
                                //             className="summary__results_options"
                                //             key={label}
                                //             onClick={() => {
                                //                 setUsersSelectedValues(prev => ({
                                //                     ...prev,
                                //                     [selectedCatagory]: label
                                //                 }));
                                //             }}
                                //         >
                                //             <div className={isSelected
                                //                 ? "summary__result_option selected"
                                //                 : "summary__result_option"
                                //             }>
                                //                 <div className="summary__results_option_title">
                                //                     <div className={isSelected
                                //                         ? "summary__result_option_icon selected_icon"
                                //                         : "summary__result_option_icon"
                                //                     }>
                                //                         <div className={isSelected
                                //                             ? "summary__result_icon_dot selected_icon_dot"
                                //                             : "summary__result_icon_dot"
                                //                         }></div>
                                //                     </div>
                                //                     <div className="summary__result_option_title">{label}</div>
                                //                 </div>
                                //                 <div className="summary__result_option_percentage">
                                //                     {Math.round(value * 100)}%
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     );
                                // }

                            })}
                    </div>
                </div>

                <div className="bottom__btn_bar"></div>
            </div>
            <div className="bottom__bar_summary">
                <Link to={-1}>
                    <LeftButton  text={'back'}/>
                </Link>

                <div className="bottom__bar_text">If A.I. estimate is wrong, select the correct one.</div>

                <div className="btn__container">
                    <button className="btn white_btn">RESET</button>
                    <Link to={'/'}>
                        <button className="btn">CONFIRM</button>
                    </Link>
                </div>
            </div>
        </>
    )
}