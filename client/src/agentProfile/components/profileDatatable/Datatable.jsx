import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router"
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const Datatable = ({columns}) => {
  // calling user data from the database 
  //useLocation  this function is to pick routh path 
  // const location = useLocation();
  // console.log(location)
  //selecting the second array item in the location path
  // const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const [datas, setDatas] = useState(userRows);
  const {user} = useContext(AuthContext);
  const user_id = user._id;
  const {data, loading, error} = useFetch(`/hotels?user_id=${user_id}`)
  console.log(data)
    useEffect(()=>{
      setList(data)
    }, [data])

   // deleting user data from the database
   const handleDelete = async (id) => {
    try{
      await axios.delete(`/hotels/${id}`);
      setList(data.filter((item) => item._id !== id));
    }catch(err){}
  };

//  const id = getRowId={row._id};

//     // deleting user data from the database
//     const handleClick = async (id) => {
//       try{
//         await axios.get(`/hotels/find/${id}`);
//         setList(data.filter((item) => item._id !== id));
//       }catch(err){}
//     };

  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/hotels/find/${params.row._id}`}  style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to="/users/test" style={{ textDecoration: "none"}}>
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Property
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
