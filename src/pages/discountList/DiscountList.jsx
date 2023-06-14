import './discountList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const changDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

export default function DiscountList({ admin, dispatch, axiosJWT, BASE_URL_API }) {
    const token = admin.token;
    const location = useLocation();
    const select = location.pathname.split('/')[2];
    const [show, setShow] = useState(false);
    const [discountList, setDiscountList] = useState([]);

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(BASE_URL_API + `discounts/delete/${id}`, {
                headers: { token: `Bearer ${token}` },
            });
            const newListDiscount = discountList.filter((item) => item._id !== id);
            setDiscountList(newListDiscount);
        } catch (err) {
            console.log(err);
        }
    };

    const columns = [
        { field: 'coupon_code', headerName: 'Mã code', width: 150 },

        {
            field: 'discount_type',
            headerName: 'Kiểu',
            width: 150,
        },

        {
            field: 'discount_amount',
            headerName: 'Số lượng',
            width: 120,
        },

        {
            field: 'type_user',
            headerName: 'Đối tượng',
            width: 130,
        },

        {
            field: 'expiration_date',
            headerName: 'Ngày hết hạn',
            width: 220,
            renderCell: (params) => {
                return (
                    <div className="order-status">
                        {params.row.expiration_date === null
                            ? 'Không giới hạn'
                            : `${changDate(params.row.expiration_date)}`}
                    </div>
                );
            },
        },

        {
            field: 'action',
            headerName: 'Action',

            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/discount-code/${params.row._id}`}>
                            <button className="productListEdit">Xem</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axiosJWT.get(
                    BASE_URL_API + `discounts/list/${select}`,
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );

                if (res.data.length > 0) {
                    setShow(true);
                }
                setDiscountList(res.data);
            } catch (err) {}
        };
        getOrders();
    }, [token, select]);

    return (
        <>
            {show ? (
                <div className="wait-purchase-container">
                    <DataGrid
                        rows={discountList}
                        // disableSelectionOnClick
                        getRowId={(row) => row._id}
                        columns={columns}
                        pageSize={8}
                        checkboxSelection={true}
                    />
                </div>
            ) : (
                <div className="wait-for-frame-block">
                    <img
                        src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                        alt="imag"
                        className="wait-for-product"
                    />
                </div>
            )}
        </>
    );
}
