import "./list.scss"
import Sidebar from "../../components/profileSidebar/Sidebar"
import Navbar from "../../components/profileNavbar/Navbar"
import Datatable from "../../components/profileDatatable/Datatable"

const Lists = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Datatable columns={columns} />
      </div>
    </div>
  )
}

export default Lists