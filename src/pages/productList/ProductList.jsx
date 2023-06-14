import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/apiCalls';

export default function ProductList({ admin, dispatch, axiosJWT }) {
    const token = admin.token;
    console.log(token);
    const products = useSelector((state) => state.product.products);

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
            headerName: 'Hành động',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={'/product/' + params.row._id}>
                            <button className="productListEdit">Chỉnh sửa</button>
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
