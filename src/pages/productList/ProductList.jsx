import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
// import { DataGrid } from '@mui/x-data-grid';
// import Box from '@mui/material/Box';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/apiCalls';

export default function ProductList() {
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;
    console.log(token);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteProduct(id, dispatch, token);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: 'product',
            headerName: 'Product',
            width: 320,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: 'inStock', headerName: 'Stock', width: 90 },

        {
            field: 'price',
            headerName: 'Price',
            width: 160,
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
