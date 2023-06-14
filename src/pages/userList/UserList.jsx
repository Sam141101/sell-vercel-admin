import './userList.css';
import { DeleteOutline } from '@material-ui/icons';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/apiCalls';

export default function UserList({ admin, dispatch, axiosJWT }) {
    const token = admin.token;
    const users = useSelector((state) => state.users?.users);

    const handleDelete = (id) => {
        deleteUser(id, dispatch, token, axiosJWT);
    };

    useEffect(() => {
        getUsers(dispatch, token, axiosJWT);
    }, [token, dispatch]);

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },

        {
            field: 'user',
            headerName: 'User',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.img} alt="" />
                        {params.row.username}
                    </div>
                );
            },
        },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 160,
        },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            className="userListActionLink"
                            to={'/user/' + params.row._id}
                        >
                            <button className="userListEdit">Chỉnh sửa</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    console.log(users);
    return (
        <div className="userList">
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={users}
                    disableSelectionOnClick
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection={true}
                />
            </Box>
        </div>
    );
}
