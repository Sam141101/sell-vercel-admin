import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
// import { DataGrid } from '@mui/x-data-grid';
// import Box from '@mui/material/Box';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/apiCalls';
import { createAxiosInstance } from '../../useAxiosJWT';

export default function ProductList() {
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;
    console.log(token);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    const axiosJWT = createAxiosInstance(admin, dispatch);

    useEffect(() => {
        getProducts(dispatch, axiosJWT);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteProduct(id, dispatch, token, axiosJWT);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'product',
            headerName: 'Sản phẩm',
            width: 320,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        <div className="title-name-product">{params.row.title}</div>
                    </div>
                );
            },
        },
        {
            field: 'categories',
            headerName: 'Loại hình',
            width: 150,
        },

        {
            field: 'price',
            headerName: 'Giá cả',
            width: 120,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={'/product/' + params.row._id}>
                            <button className="productListEdit">Edit</button>
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

    return (
        <div className="productList">
            {/* <Box sx={{ height: 500, width: '100%' }}> */}
            <DataGrid
                rows={products}
                // disableSelectionOnClick
                getRowId={(row) => row._id}
                columns={columns}
                pageSize={8}
                checkboxSelection={true}
            />
            {/* </Box> */}
        </div>
    );
}
