import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import NotFound from "./NotFound";

import { BrowserRouter,Routes,Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<UserList />} />
        <Route path="/:id" element={<UserProfile/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   <UserList/>
    // </>
  );
}

export default App;
