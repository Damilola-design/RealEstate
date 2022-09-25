import './searchItem.css'
import { Link } from 'react-router-dom'

// Parsing item to the SearchItem component the item iscoming from List component cause search item is only rendered in list 
const MyListings = ({item}) => {
  return (
    <div className="searchItem">
        <img src={item.photos[0]} alt="" className="siImg" />
    <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport</span>
        <span className="siSubtitle">Studio Apartment with Air conditioning</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">You can cancel later, so look in this great price today!</span>
    </div>
    <div className="siDetails">
        {item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
        </div>}
        <div className="siDetailsTexts">
            <span className="siPrice">${item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default MyListings