import React from 'react';
import './ProfilePage.css';
//import { attendActivity } from '../utils/api';
import Navbar from '../components/navbar/Navbar';

interface BlockProps {
  label: string;
  value: string | number | React.ReactNode;
}

const values = {
  fullname: 'John Doe',
  username: 'johndoe',
  email: 'yunusemre@gmail.com',
  imageUrl: 'https://lh3.googleusercontent.com/a/ACg8ocKnugXnXxsuBHWgU8dmlVTE5xsOKP3J_hZCvg5-lGUGmm_FBA=s96-c',
  attendActivity: 5,
  createdActivity: 3,
  upcomingActivity: 2,
  reliablilityScore: 95,
}
const ProfilePage: React.FC = () => {
  return <>
    <Navbar />
    <div className="profile-page">
      <div className="profile-header">

        <div className="left">
          <img src={values.imageUrl} alt="Profile" className="profile-image" />
        </div>

        <div className="center">
          <h1 className="profile-username">{values.username}</h1>
          <h2 className="profile-email">{values.email}</h2>
          <h2 className="profile-username">{values.username}</h2>
        </div>

        <div className="right">
          <div className="stat-item">
            <p> <span id="val">
              {values.attendActivity}
            </span> etkinliğe katıldın</p>
          </div>

          <div className="stat-item">
            <p> <span id="val">{values.createdActivity}
            </span> etkinlik oluşturdun</p>
          </div>

          <div className="stat-item">
            <p> <span id="val">
              {values.upcomingActivity}
            </span>katılacağınız etkinlik var</p>
          </div>

          <div className="stat-item">
            <p> <span id="val">
              {values.reliablilityScore}
            </span> % güvenilirlik skoruna sahipsiniz</p>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default ProfilePage;