import axios from 'axios';
import { useContext, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
import {useNavigate} from "react-router-dom"
import './register.css'
import { AuthContext } from '../../context/AuthContext';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import NavBar from '../../components/navbar/NavBar';

const Register = () => {
    //creating variables for the inputs and declearing undefined 
    const [ credentials, setCredentials ] = useState({
        fullname: undefined,
        email: undefined,
        username: undefined,
        password: undefined,
        country: undefined,
        city: undefined,
        phone: undefined,
        isAgent: undefined,
    });
    //vairaibles from our authContext file
    const { user, loading, error, dispatch} = useContext(AuthContext);
//Function to navigate to another route once the login is successfull
    const navigate = useNavigate()

    // this function should check etries in the input giving the id for each inputs weather it match the varables created
    const handleChange = (e) =>{
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }));
    }

     //once the submit button is clicked it should verify all this conditions 
     const handleClick =async (e) =>{
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try{
            //connecting to the login api route from backend using axios
            const res = await axios.post("/auth/register", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            if(res.data.details.isAgent === true) {
                navigate("/profile/agent")
            }else{
                navigate("/profile/user")
            }
        }catch(err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
    //  console.log(user);
  return (
    <div>
    <NavBar />
    <div className="login">
        <div className="lContainer">
        <input 
            type="text" 
            placeholder="John Adam" 
            id="fullname" 
            onChange={handleChange} 
            className="lInput" />
        <input 
            type="text" 
            placeholder="email" 
            id="email" 
            onChange={handleChange} 
            className="lInput" />
            <input 
            type="text" 
            placeholder="username" 
            id="username" 
            onChange={handleChange} 
            className="lInput" />
            <input 
            type="text" 
            placeholder="country" 
            id="country" 
            onChange={handleChange} 
            className="lInput" />
            <input 
            type="text" 
            placeholder="city" 
            id="city" 
            onChange={handleChange} 
            className="lInput" />
            <input 
            type="number" 
            placeholder="phone number" 
            id="phone" 
            onChange={handleChange} 
            className="lInput" />
            <input 
            type="password" 
            placeholder="password" 
            id="password" 
            onChange={handleChange} 
            className="lInput" />
            <div className="formInput">
                <label>Account Type : </label>
                <select className="selectBtn" id="isAgent" onChange={handleChange}>
                  <option value={false}>User</option>
                  <option value={true}>Agent</option>
                </select>
                </div>
            <button disabled={loading} onClick={handleClick} className="lButton">Register</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
    <div className="rwrap">
    <MailList/>
    <Footer />
    </div>
    </div>
  );
}

export default Register;