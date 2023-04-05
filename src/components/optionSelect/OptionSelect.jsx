import { useState } from 'react';
import './optionSelect.css';

export default function OptionSelect(props) {
    const {
        inputs,
        type,
        placeholder,
        label,
        name,
        value1,
        text1,
        value2,
        text2,
        handleChange,
    } = props;

    const handleChangeSelect = (e) => {
        if (handleChange) {
            handleChange(e);
        }
    };

    return (
        <div className="new-dicount-item">
            <>
                {type === 'radio' ? (
                    <>
                        <label className="option-select-label">{label}</label>
                        <div className="newUserGender" style={{ display: 'flex' }}>
                            <input
                                type="radio"
                                name={name}
                                id={value1}
                                value={value1}
                                checked={inputs === `${value1}`}
                                onChange={handleChangeSelect}
                            />
                            <label htmlFor={value1}>{text1}</label>
                            <input
                                type="radio"
                                name={name}
                                id={value2}
                                value={value2}
                                checked={inputs === `${value2}`}
                                onChange={handleChangeSelect}
                            />
                            <label htmlFor={value2}>{text2}</label>
                        </div>
                    </>
                ) : (
                    <div className="login_form">
                        <label className="option-select-label">{label}</label>
                        <input
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            onChange={handleChange}
                            className="login_input"
                            // value={inputs}
                            value={inputs || ''}
                        />
                    </div>
                )}
            </>
        </div>
    );
}
