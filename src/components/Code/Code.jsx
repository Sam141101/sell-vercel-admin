import { useState } from 'react';
import './code.css';
import { BASE_URL_API } from '../../requestMethods';
import axios from 'axios';

export default function Code(props) {
    const { inputs, setInputs, token, type } = props;
    const [checkCode, setCheckCode] = useState();

    const generateRandomCode = (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime().toString();
        const datePart = currentTime.substring(currentTime.length - 6);
        const codePart = [...Array(4)]
            .map(() => (~~(Math.random() * 36)).toString(36))
            .join('')
            .toUpperCase()
            .substring(0, 4);
        const code = `${datePart}${codePart}`;
        console.log(datePart, codePart);
        setInputs((prev) => ({
            ...prev,
            coupon_code: code,
        }));

        setCheckCode()
    };

    const handleCheckCode = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(
                BASE_URL_API + `discounts/check-code/${inputs.coupon_code}`,
                {
                    headers: { token: `Bearer ${token}` },
                },
            );
            setCheckCode(res.data.message);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new-discount-creat-code">
            <div className="login_form">
                <label className="option-select-label">Mã code</label>
                <input
                    name="coupon_code"
                    value={inputs.coupon_code || ''}
                    type="text"
                    placeholder="Mã code"
                    className="login_input"
                    readOnly
                />

                <button
                    className="new-discount-check-user_id"
                    style={
                        // inputs.coupon_code !== ''
                        //     ?
                        {
                            backgroundColor: '#338dbc',
                            color: 'white',
                            cursor: 'pointer',
                        }
                        // : {}
                    }
                    onClick={generateRandomCode}
                >
                    {type === "changeCode" ? 'Đổi Code' : "Tạo Code" }
                </button>
            </div>

            <button
                className="new-discount-check-code"
                style={
                    inputs.coupon_code !== ''
                        ? {
                            backgroundColor: '#338dbc',
                            color: 'white',
                            cursor: 'pointer',
                        }
                        : {}
                }
                onClick={handleCheckCode}
            >
                Check mã Code
            </button>

            {checkCode && <span>{checkCode}</span>}
        </div> 
    );
}
