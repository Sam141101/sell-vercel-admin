import { useState } from 'react';
import './newDiscountCode.css';
import OptionSelect from '../../components/optionSelect/OptionSelect';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL_API } from '../../requestMethods';
import Code from '../../components/Code/Code';
import { createAxiosInstance } from '../../useAxiosJWT';

export default function NewDiscountCode() {
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;

    const [checkUser, setCheckUser] = useState();
    const [checkCode, setCheckCode] = useState();
    const [inputs, setInputs] = useState({
        is_single_use: '',
        is_redeemed: '',
        expireAt: null,
        used_by: '',
        // categories: [],
        coupon_code: '',
    });

    const dispatch = useDispatch();
    const axiosJWT = createAxiosInstance(admin, dispatch);

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosJWT.post(
                BASE_URL_API +
                    `discounts/${
                        inputs.type_user === 'person'
                            ? `person-use/${inputs.used_by}`
                            : 'everybody-use'
                    }`,
                inputs,
                {
                    headers: { token: `Bearer ${token}` },
                },
            );
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCheck = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosJWT.get(
                BASE_URL_API + `users/check-user/${inputs.used_by}`,
                {
                    headers: { token: `Bearer ${token}` },
                },
            );
            setCheckUser(res.data.message);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new-discount">
            <h1 className="addProductTitle">Mã giảm giá mới</h1>
            <form className="add-discount-form">
                <Code
                    type="newCode"
                    token={token}
                    setInputs={setInputs}
                    inputs={inputs}
                    check="code"
                />

                <OptionSelect
                    page="new"
                    type="radio"
                    label="Mô tả"
                    name="descCoupon"
                    value1="Mã giảm giá"
                    text1="Mã giảm giá"
                    value2="Mã vận chuyển"
                    text2="Mã vận chuyển"
                    handleChange={handleChange}
                />
                <OptionSelect
                    page="new"
                    type="radio"
                    label="Giảm giá theo"
                    name="discount_type"
                    value1="percentage"
                    text1="Tỉ lệ phần trăm"
                    value2="amount"
                    text2="Số lượng"
                    handleChange={handleChange}
                />

                <OptionSelect
                    type="number"
                    placeholder="Số tiền (phần trăm) muốn giảm"
                    label="Mức giảm"
                    name="discount_amount"
                    handleChange={handleChange}
                />

                <OptionSelect
                    // type="number"
                    // placeholder="Số giờ giới hạn"
                    // label="Thời hạn sử dụng"
                    // name="expireAt"
                    // handleChange={handleChange}

                    type="number"
                    placeholder="Số giờ giới hạn"
                    label="Thời hạn sử dụng"
                    name="expireAt"
                    handleChange={handleChange}
                    inputs={inputs.expireAt || ''} // đặt giá trị mặc định cho inputs
                />

                <OptionSelect
                    type="number"
                    placeholder="Số tiền tối thiểu để sử dụng voucher"
                    label="Giá trị đơn hàng tối thiểu"
                    name="minimum_purchase_amount"
                    handleChange={handleChange}
                />

                <OptionSelect
                    type="number"
                    placeholder="Số người tối đa sử dụng voucher"
                    label="Số lượng người có thể sử dụng đơn hàng"
                    name="maximum_uses"
                    handleChange={handleChange}
                />

                <OptionSelect
                    type="text"
                    placeholder="Áp dụng cho các loại sản phẩm"
                    label="Loại sản phẩm"
                    name="categories"
                    handleChange={handleChange}
                />

                <OptionSelect
                    page="new"
                    type="radio"
                    label="Voucher dành cho"
                    name="type_user"
                    value1="people"
                    text1="Mọi người"
                    value2="person"
                    text2="Cá nhân"
                    handleChange={handleChange}
                />

                <div
                    className={`new-discount-type-person ${
                        inputs.type_user && inputs.type_user === 'person' ? 'block' : ''
                    }`}
                >
                    <OptionSelect
                        type="text"
                        placeholder="_id người sử dụng"
                        label="Thêm người dùng"
                        name="used_by"
                        handleChange={handleChange}
                    />

                    <button
                        className="new-discount-check-user_id"
                        style={
                            inputs.used_by && inputs.used_by !== ''
                                ? {
                                      backgroundColor: '#338dbc',
                                      color: 'white',
                                      cursor: 'pointer',
                                  }
                                : {}
                        }
                        onClick={handleCheck}
                    >
                        Kiểm tra
                    </button>
                    {checkUser && <span>{checkUser}</span>}
                </div>

                {/* <Code
                    check="user"
                    token={token}
                    handleChange={handleChange}
                    inputs={inputs}
                /> */}

                <OptionSelect
                    page="new"
                    type="radio"
                    label="Sử dụng 1 hay nhiều lần"
                    name="is_single_use"
                    value1="single_use"
                    text1="1 lần"
                    value2="multi_use"
                    text2="Nhiều lần"
                    // inputs={inputs.is_single_use}
                    handleChange={handleChange}
                />

                <OptionSelect
                    page="new"
                    type="radio"
                    label="Đã được sử dụng chưa"
                    name="is_redeemed"
                    value1="true"
                    text1="Đã dùng"
                    value2="false"
                    text2="Chưa dùng"
                    handleChange={handleChange}
                />
                <button onClick={handleClick} className="add-discount-button">
                    Tạo mã
                </button>
            </form>
        </div>
    );
}
