import './userList.css';
// import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/apiCalls';
import { createAxiosInstance } from '../../useAxiosJWT';

export default function UserList() {
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users?.users);

    const axiosJWT = createAxiosInstance(admin, dispatch);

    const handleDelete = (id) => {
        // console.log(id);
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
