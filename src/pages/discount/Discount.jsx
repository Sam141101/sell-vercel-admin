import { Link, useLocation } from 'react-router-dom';
import './discount.css';
import { Publish } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';
import Code from '../../components/Code/Code';
import OptionSelect from '../../components/optionSelect/OptionSelect';
import { createAxiosInstance } from '../../useAxiosJWT';
// import NewCode from '../../components/NewCode/NewCode';

function changeTime(expirationDate) {
    if (!expirationDate instanceof Date) {
        // Nếu tham số 'expirationDate' không phải là đối tượng Date, trả về 0
        return 0;
    }

    // Chuyển đổi expirationDate từ đối tượng Date sang thời gian Unix
    const expireTimeUnix = expirationDate.getTime();

    // Tính toán giá trị của expireAt
    const now = Date.now();
    const expireAt = Math.round((expireTimeUnix - now) / (60 * 60 * 1000));

    return expireAt;
}

export default function Discount() {
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;
    const location = useLocation();
    const discountId = location.pathname.split('/')[2];

    // const [discount, setDiscount] = useState([]);
    const [inputs, setInputs] = useState({});

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
            const res = await axiosJWT.put(
                BASE_URL_API + `discounts/${discountId}`,
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

    useEffect(() => {
        const getDiscount = async () => {
            try {
                const res = await axiosJWT.get(
                    BASE_URL_API + `discounts/find/${discountId}`,
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );
                // setDiscount(res.data);
                setInputs(res.data);
            } catch (err) {}
        };
        getDiscount();
    }, [token, discountId]);

    console.log(inputs);
    console.log(inputs.expiration_date);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Thông tin Mã giảm giá</h1>
                <Link className="discount-block-title-new" to="/new-discounts">
                    Tạo mới
                </Link>
            </div>

            <div className="productBottom">
                <form className="add-discount-form">
                    <Code
                        check="code"
                        type="changeCode"
                        token={token}
                        setInputs={setInputs}
                        inputs={inputs}
                    />

                    <OptionSelect
                        type="radio"
                        page="change"
                        label="Mô tả"
                        name="descCoupon"
                        value1="Mã giảm giá"
                        text1="Mã giảm giá"
                        value2="Mã vận chuyển"
                        text2="Mã vận chuyển"
                        handleChange={handleChange}
                        inputs={inputs.descCoupon}
                    />

                    <OptionSelect
                        type="radio"
                        page="change"
                        label="Giảm giá theo"
                        name="discount_type"
                        value1="percentage"
                        text1="Tỉ lệ phần trăm"
                        value2="amount"
                        text2="Số lượng"
                        handleChange={handleChange}
                        inputs={inputs.discount_type}
                    />

                    <OptionSelect
                        page="change"
                        type="number"
                        placeholder="Số tiền (phần trăm) muốn giảm"
                        label="Mức giảm"
                        name="discount_amount"
                        handleChange={handleChange}
                        inputs={inputs.discount_amount}
                    />

                    <OptionSelect
                        page="change"
                        type="number"
                        placeholder="Số giờ giới hạn"
                        label="Thời hạn sử dụng"
                        name="expiration_date"
                        handleChange={handleChange}
                        // inputs={changeTime(new Date(inputs.expiration_date))}
                        inputs={inputs && inputs.expiration_date}
                    />

                    <OptionSelect
                        type="number"
                        placeholder="Số tiền tối thiểu để sử dụng voucher"
                        page="change"
                        label="Giá trị đơn hàng tối thiểu"
                        name="minimum_purchase_amount"
                        handleChange={handleChange}
                        inputs={inputs.minimum_purchase_amount}
                    />

                    <OptionSelect
                        type="number"
                        page="change"
                        placeholder="Số người tối đa sử dụng voucher"
                        label="Số lượng người có thể sử dụng đơn hàng"
                        name="maximum_uses"
                        handleChange={handleChange}
                        inputs={inputs.maximum_uses}
                    />

                    <OptionSelect
                        type="text"
                        page="change"
                        placeholder="Áp dụng cho các loại sản phẩm"
                        label="Loại sản phẩm"
                        name="categories"
                        handleChange={handleChange}
                        inputs={inputs.categories}
                    />

                    <OptionSelect
                        type="radio"
                        page="change"
                        label="Voucher dành cho"
                        name="type_user"
                        value1="people"
                        text1="Mọi người"
                        value2="person"
                        text2="Cá nhân"
                        handleChange={handleChange}
                        inputs={inputs.type_user}
                    />

                    <div
                        className={`new-discount-type-person ${
                            inputs.type_user === 'person' ? 'block' : ''
                        }`}
                    >
                        <OptionSelect
                            type="text"
                            placeholder="_id người sử dụng"
                            label="Thêm người dùng"
                            name="used_by"
                            handleChange={handleChange}
                            page="change"
                            // inputs={ && }
                            inputs={
                                inputs.used_by && inputs.used_by.length > 0
                                    ? inputs.used_by[0]._id.toString()
                                    : ''
                            }
                        />

                        <button
                            className="new-discount-check-user_id"
                            style={
                                inputs.used_by !== ''
                                    ? {
                                          backgroundColor: '#338dbc',
                                          color: 'white',
                                          cursor: 'pointer',
                                      }
                                    : {}
                            }
                            // onClick={handleCheck}
                        >
                            Kiểm tra
                        </button>
                        {/* {checkUser && <span>{checkUser}</span>} */}
                    </div>

                    <OptionSelect
                        type="radio"
                        label="Sử dụng 1 hay nhiều lần"
                        name="is_single_use"
                        value1="single_use"
                        text1="1 lần"
                        value2="multi_use"
                        page="change"
                        text2="Nhiều lần"
                        inputs={inputs.is_single_use}
                        handleChange={handleChange}
                    />

                    <OptionSelect
                        type="radio"
                        page="change"
                        label="Đã được sử dụng chưa"
                        name="is_redeemed"
                        value1={true}
                        text1="Đã dùng"
                        value2={false}
                        text2="Chưa dùng"
                        handleChange={handleChange}
                        inputs={inputs.is_redeemed}
                    />
                    <button onClick={handleClick} className="add-discount-button">
                        Cập nhật
                    </button>
                </form>
            </div>
        </div>
    );
}
