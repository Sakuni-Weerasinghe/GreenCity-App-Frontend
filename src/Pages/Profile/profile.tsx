import React from "react";
import { getCurrentUser, getLoginStatus } from "../../services/auth.service";

const Profile = () => {
  const currentUser = getCurrentUser();

  console.log(getLoginStatus());

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
      </ul>
      Profile Page
    </div>
  );
};

export default Profile;