import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";

export default function UserList() {
  const admin = useSelector((state) => state.user?.currentUser);
  const token = admin.token;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users?.users);

  const [data, setData] = useState(userRows);
  // const [data, setData] = useState([]);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const handleDelete = (id) => {
    console.log(id);
    deleteUser(id, dispatch, token);
  };

  useEffect(() => {
    getUsers(dispatch, token);
  }, [token, dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },

    {
      field: "user",
      headerName: "User",
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
    { field: "email", headerName: "Email", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    {
      field: "phone",
      headerName: "Phone",
      width: 160,
    },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 120,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
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
      <DataGrid
        rows={users}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
