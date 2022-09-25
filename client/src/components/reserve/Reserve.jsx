import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router"
import "./reserve.css"


//Note: anywhere they're using mapping(map) it means for each
// the setOpen and hotelId is coming from the Hotel.jsx file cause we're redering this file there(Reserve.jsx)
const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms ] = useState([]);
    const {data, loading, error } = useFetch(`/hotels/room/${hotelId}`);

      // import function thats gonna pick data in the search qurey, here we want to make use of dates
  const {dates} = useContext(SearchContext);

  // Getting the date 
  const getDatesInRange = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      const date = new Date(start.getTime());

      const dates = [];

      while(date <= end){
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }
      return dates;
  };
// Get the start and stop date, checking and check out function
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  // checking if the room is available, if it not avalaible the checkbox in the html will be disabled
  const isAvailable = (roomNumber) =>{
    const isFound = roomNumber.unavailableDates.some(date => alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  }
  const navigate = useNavigate();
    const handleSelect = (e)=>{
        const checked = e.target.checked;
        const value = e.target.value;
        // if selectedRooms is checked take the previouse rooom id, else if its nt checked we're going to filter 
        // for each item is not equal to value(i.e our room id)
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))
    }
    const handleClick = async () => {
        try{
            await Promise.all(
                selectedRooms.map(roomId =>{
                const res = axios.put(`/rooms/availability/${roomId}`, {dates:alldates});
                return res.data
            })
            );
            setOpen(false);
            navigate("/")
        }catch(err){

        }
    }
  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon 
            icon={faCircleXmark} 
            className="rClose" 
            onClick={() =>setOpen(false)} 
            />
            <span>Select your rooms:</span>
            {data.map(item=>(
                <div className="rItem">
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
                        <div className="rPrice">{item.price}</div>
                    </div>
                    <div className="rSelectRoom">
                    {item.roomNumbers.map((roomNumber)=>(
                        <div className="room">
                            <label>{roomNumber.number}</label>
                            <input 
                            type="checkbox"  
                            value={roomNumber._id} 
                            onChange={handleSelect} 
                            disabled={!isAvailable(roomNumber)}
                            />
                        </div>
                    ))}
                    </div>
                </div>
                 ))}
                 <button onClick={handleClick} className="eButton">Reserve Now!</button>
        </div>
    </div>
  );
};

export default Reserve;