import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Close, Check } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getUsers, deleteUser } from "../../context/userContext/apiCalls";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "username",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "isAdmin",
      headerName: "Is admin?",
      width: 150,
      renderCell: (params) => {
        return params.row.isAdmin ? (
          <Check className="true" />
        ) : (
          <Close className="false" />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/user/" + params.row._id, user: params.row }}
            >
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

  return (
    <div className="userList">
      <Link to="/newUser">
        <button className="userAddButton">Create</button>
      </Link>
      <DataGrid
        getRowId={(row) => row._id}
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
