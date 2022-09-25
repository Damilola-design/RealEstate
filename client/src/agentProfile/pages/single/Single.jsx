import "./single.scss";
import Sidebar from "../../components/profileSidebar/Sidebar";
import Navbar from "../../components/profileNavbar/Navbar";
import Chart from "../../components/profileChart/Chart";
import List from "../../components/profileTable/Table";
import Widget from "../../components/profileWidget/Widget";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const Single = () => {
  const {user} = useContext(AuthContext);
  const id = user._id;
  const {data, loading, error } = useFetch(`/users/${id}`)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <Link to="/agent/update" style={{ textDecoration: "none" }}>
            <div className="editButton">Edit</div>
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
                  <span className="itemKey">City:</span>
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
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
