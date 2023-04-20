import { useState } from 'react';
import './optionSelect.css';

export default function OptionSelect(props) {
    const {
        page,
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
                                id={value1.toString()}
                                value={value1}
                                checked={page === 'change' ? inputs == value1 : null}
                                onChange={handleChangeSelect}
                            />
                            <label htmlFor={value1.toString()}>{text1}</label>
                            <input
                                type="radio"
                                name={name}
                                id={value2.toString()}
                                value={value2}
                                checked={page === 'change' ? inputs == value2 : null}
                                onChange={handleChangeSelect}
                            />
                            <label htmlFor={value2.toString()}>{text2}</label>
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
                            // value={page === 'change' ? inputs || '' : null}
                            // value={page === 'change' ? inputs || '' : ''}'
                            value={page === 'change' ? inputs || '' : undefined}
                        />
                    </div>
                )}
            </>
        </div>
    );
}
