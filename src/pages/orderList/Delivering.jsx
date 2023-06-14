import { Link } from 'react-router-dom';
import './orderList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useState, useEffect } from 'react';

export default function Delivering({ admin, dispatch, axiosJWT, BASE_URL_API }) {
    const token = admin.token;
    const [show, setShow] = useState(false);
    const [orderList, setOrderList] = useState([]);

    // data grid
    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },

        {
            field: 'amount',
            headerName: 'Price',
            width: 120,
            renderCell: (params) => {
                return <div className="total-price-order">{params.row.amount}₫</div>;
            },
        },

        {
            field: 'method',
            headerName: 'Method',
            width: 160,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="order-status">
                        <button className={`widgetLgButton ${params.row.status}`}>
                            {params.row.status}
                        </button>
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
                        <Link to={`/order/delivering/${params.row._id}`}>
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

    // Action
    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(BASE_URL_API + `orders/${id}`, {
                headers: { token: `Bearer ${token}` },
            });

            const newListDiscount = orderList.filter((item) => item._id !== id);
            setOrderList(newListDiscount);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axiosJWT.get(
                    BASE_URL_API + 'orders/list-status-order/delivery',
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );

                if (res.data.length > 0) {
                    setShow(true);
                }
                setOrderList(res.data);
            } catch (err) {}
        };
        getOrders();
    }, [token]);
    return (
        <>
            {show ? (
                <div className="wait-purchase-container">
                    <DataGrid
                        rows={orderList}
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
