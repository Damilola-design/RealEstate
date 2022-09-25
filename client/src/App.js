import React, { useContext } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Navigate} from "react-router-dom"
import Single from './agentProfile/pages/single/Single';
import { AuthContext } from './context/AuthContext';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UserHome from './agentProfile/pages/home/UserHome';
import New from './agentProfile/pages/new/New';
import NewVerify from './agentProfile/pages/newVerify/NewVerify';
import { hotelInputs, productInputs, userInputs, verifyInputs } from './formSource';
import { DarkModeContext } from './agentProfile/context/darkModeContext';
import Lists from './agentProfile/pages/list/Lists';
import User from './userProfile/pages/home/User';
import UpdateUser from './userProfile/pages/updateUser/UpdateUser';
import UpdateAgent from './agentProfile/pages/updateAgent/UpdateAgent';
import { hotelColumns } from './datatablesource';

function App() {
  const { darkMode } = useContext(DarkModeContext);
   //setting retriction for our route, so that any user thats not admin wont be able to access the routes
   const ProtectedRoute = ({children}) =>{
    const {user} = useContext(AuthContext);
// is user is not present in the local storage redierect back to login
    if(!user) {
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
    <div className={darkMode ? "app dark" : "app"}>
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/hotels" element={<List/>}/>
              <Route path="/hotels/:id" element={<Hotel/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              {/* agent profile */}
              <Route path="/profile/agent" element={
               <ProtectedRoute>
                 <UserHome/>
                 </ProtectedRoute>
                }/>
                
             <Route path="users">
              <Route index element={<ProtectedRoute><Lists /></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>}
              />
            </Route>
            <Route path="property">
              <Route
                path="new"
                element={<ProtectedRoute>
                  <New inputs={hotelInputs} title="Add New Property" />
                  </ProtectedRoute>}
              />
            </Route>
            <Route path="verify">
              <Route
                path="new"
                element={<ProtectedRoute>
                  <NewVerify inputs={verifyInputs} title="Verify Account" />
                  </ProtectedRoute>}
              />
            </Route>
            <Route path="properties">
              <Route index element={<ProtectedRoute><Lists columns={hotelColumns} /></ProtectedRoute>} />
              <Route path=":productId" element={
                <ProtectedRoute> 
                <Single />
                </ProtectedRoute> 
              } />
              <Route
                path="new"
                element={
                <ProtectedRoute> 
                
                </ProtectedRoute> 
                }
              />
            </Route>
            <Route path="agent">
              <Route
                path="update"
                element={<ProtectedRoute>
                  <UpdateAgent 
                  inputs={userInputs} 
                  title="Update Profile" />
                  </ProtectedRoute>}
              />
            </Route>
           {/* user profile */}
            <Route path="/profile/user" element={
               <ProtectedRoute>
                 <User/>
                 </ProtectedRoute>
                }/>
            <Route path="user">
              <Route
                path="update"
                element={
                <ProtectedRoute>
                  <UpdateUser 
                  inputs={userInputs} 
                  title="Update Profile" />
                  </ProtectedRoute>
                  }
              />
            </Route>
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
