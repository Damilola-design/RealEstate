import './navbar.css';
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
  // calling the AuthContext so that once a user is authenticated the loging/register wont be showing in the navBar
  const {user} = useContext(AuthContext);
  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
            <span>ODbooking</span>
            </Link>
            {/* if the user is not authenticated it should show the this div, but the user is authenticated this div should disappair */}
        {user ? user.username : (<div className="navItem">
            <button className="navButton">
              <Link to="/register" style={{color:"inherit", textDecoration:"none"}}>Register</Link>
            </button>
            <button className="navButton">
              <Link to="/login" style={{color:"inherit", textDecoration:"none"}}>Login</Link>
              </button>
        </div>)}
        </div>
    </div>
  )
}

export default NavBar