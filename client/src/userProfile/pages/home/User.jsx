import Sidebar from "../../components/profileSidebar/Sidebar";
import Navbar from "../../components/profileNavbar/Navbar";
import "./home.scss";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";


const User = () => {
  const {user} = useContext(AuthContext);
  const id = user._id;
  const {data, loading, error } = useFetch(`/users/${id}`)
  // console.log(data)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div>
        <div className="top">
          <div className="left">
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">Hello {data.fullname}</h1>
                <div className="detailItem">
                  <span className="itemKey">0</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sep Leads</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="top">
          <div className="left">
          <Link to="/user/update" style={{ textDecoration: "none" }}>
            <div className="editButton">
              Edit
              </div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              {!data.img ? <img
                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                alt=""
                className="itemImg"
              /> :(
                <img
                src={data.img}
                alt=""
                className="itemImg"
              />
              )}
              <div className="details">
                <h1 className="itemTitle">{data.fullname}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {data.city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
