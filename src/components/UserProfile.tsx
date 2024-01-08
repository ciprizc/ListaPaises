import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const id  = useParams();
    console.log(id);
    useEffect(() => {
        console.log(id);
    }, []);

  return (
    <>
      <h1>User Profile</h1>
      <div>
        {/* <p>User ID: {id}</p> */}
      </div>
    </>
  );
};

export default UserProfile;
