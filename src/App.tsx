import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

import { BrowserRouter,Routes,Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<UserList />} />
        <Route path="/user:id" element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
    // <>
    //   <UserList/>
    // </>
  );
}

export default App;
