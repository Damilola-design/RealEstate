import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBed, faCalendarDay, faCar, faPerson, faPlane, faTaxi} from "@fortawesome/free-solid-svg-icons";
import './header.css';
import { DateRange } from 'react-date-range' // Date function
import { useContext, useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns' // date format 
import {Link, useNavigate} from "react-router-dom"
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";


export const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false); // this function will make the date not to be opened in our application 
  const [dates, setDates] = useState([
    {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
    }
  ]);
  //Room selection function objects
  const [destination, setDestination] = useState("");
  const [openOptions, setopenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const navigate = useNavigate() // this is a react router dom function that is used to redirect link to a particular route 
  // making the adult, children and room to be dynamic after clicking the plus or minus sign, the function basically set the previouse value from the object then whenerver the plus is clicked it would be +1 and wehnever the minus is clicked it would be -1
  const handleOption = (name, operation) =>{
    setOptions(prev=>{return {
      ...prev, [name]: operation === "i" ? options[name] +1 : options[name] -1,
    };
  });
  };

  const {dispatch} = useContext(SearchContext)
  //search query, whenever they use the search button it should redierect them to hotel route then search fro destination, date and options
 const  handleSearch = ()=>{
   dispatch({type: "NEW_SEARCH", payload: {destination, dates, options }});
  navigate("/hotels", {state: {destination, dates, options}})
 }
  // calling the AuthContext so that once a user is authenticated the loging/register wont be showing in the navBar
  const {user} = useContext(AuthContext);
  return (
    <div className="header">
      {/* if type is list let the headerContainer be in listMode else normal header container  */}
     <div className={ type === "list" ? "headerContainer listMode" : "headerContainer" }> 
        <div className="headerList">
            <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Stays</span>
            </div>
        </div>
      {/* we're passing a condition that this items the we wrap inside fragment should not show in list route i.e /hotels */}
      { type !== "list" && <><h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
        <p className="headerDesc">Get rewarded for your travels -  unlock instant savings of 10% or more with a free ODbooking account</p>
        {!user && (
        <button className="headerBtn">
          <Link to="/login" style={{color:"inherit", textDecoration:"none"}}>Sign in / Register</Link>
          </button>
        )}
        <div className="headerSearch">
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faBed} className="headerIcon" />
          <input 
          type="text" 
          placeholder="where are you going" 
          className="headerSearchInput" 
          onChange={e=>setDestination(e.target.value)} />
          </div>
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDay} className="headerIcon"  />
          <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">
            {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
          {openDate && <DateRange 
          editableDateInputs={true}
          onChange={item => setDates([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dates}
          minDate={new Date()}
          className="date"
          />}
          </div>
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faPerson } className="headerIcon"  />
          <span onClick={()=>setopenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
         { openOptions && <div className="options">
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
              <button className="optionCounterButton" disabled={options.adult <= 1} onClick={()=>handleOption("adult", "d")}>-</button>
              <span className="optionCounterNumber">{options.adult}</span>
              <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
              <button className="optionCounterButton" disabled={options.children <= 0  } onClick={()=>handleOption("children", "d")}>-</button>
              <span className="optionCounterNumber">{options.children}</span>
              <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
              <button className="optionCounterButton" disabled={options.room <= 1} onClick={()=>handleOption("room", "d")}>-</button>
              <span className="optionCounterNumber">{options.room}</span>
              <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
              </div>
            </div>
          </div>}
          </div>
          <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div> </>}
     </div>
    </div>
  )
}
export default Header;