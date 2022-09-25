import Sidebar from "../../components/profileSidebar/Sidebar";
import Navbar from "../../components/profileNavbar/Navbar";
import "./home.scss";
import Widget from "../../components/profileWidget/Widget";
import Featured from "../../components/profileFeatured/Featured";
import Chart from "../../components/profileChart/Chart";
import Table from "../../components/profileTable/Table";
import List from "../../components/profileTable/Table";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";


const UserHome = () => {
  const {user} = useContext(AuthContext);
  const id = user._id;
  const {data, loading, error } = useFetch(`/users/${id}`)
 
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
      { data.verified === "Pending" && (
        <div className="ReviewBage">
          <small className="headerB">Your documents is under review.<br/>Please wait for our customer management team to review your documents.</small>
          </div>
        )}
        { data.verified === "Rejected" && (
        <div className="RejectBage">
          <small className="itemR">Your documents were declined.<br/>Please upload your real Govt. Issued ID, Utility Bill and Business CAC Document.</small>
          </div>
        )}
         { data.verified === "Approved" && (
        <div className="ApprovedBage">
          <small className="itemR">Verified Account</small>
          </div>
        )}
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
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        </div>
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
                  <span className="itemKey">city:</span>
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

export default UserHome;
