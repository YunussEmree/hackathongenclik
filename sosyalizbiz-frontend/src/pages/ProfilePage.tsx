import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import Navbar from '../components/navbar/Navbar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { FaAward } from "react-icons/fa";
import type { Activity } from '../types/api';
import { getUserActivities } from '../utils/api';
import { FiAlertTriangle } from "react-icons/fi";

function BasicRating() {
  const starNumber = 4;

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating name="disabled" value={starNumber} disabled />

    </Box>
  );
}


const values = {
  fullname: 'Emir Enes Akalın',
  email: 'emirenes@gmail.com',
  imageUrl: 'https://lh3.googleusercontent.com/a/ACg8ocKnugXnXxsuBHWgU8dmlVTE5xsOKP3J_hZCvg5-lGUGmm_FBA=s96-c',
  attendActivity: 5,
  createdActivity: 3,
  upcomingActivity: 2,
  reliablilityScore: 95,
}
const ProfilePage: React.FC = () => {
  const [hover, setHover] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const fetchUserActivities = async () => {
    try {
      const data = await getUserActivities();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchUserActivities();
  }, []);

    const handleEvaluateClick = (activity: Activity) => {
        setSelectedActivity(activity);
        setShowPopup(true);
    };

    const handleRatingChange = (activityId: string, participantName: string, newRating: number) => {
        const key = `${activityId}-${participantName}`;
        setRatings(prev => ({...prev, [key]: newRating}));
        console.log(`Etkinlik ID: ${activityId}, Katılımcı: ${participantName}, Yıldız: ${newRating}`);
    };


    return <>
        <Navbar/>
        <div className="profile-page">
            <div className="profile-header">

                <div className="left">
                    <img src={values.imageUrl} alt="Profile" className="profile-image"/>
                </div>

                <div className="center">
                    <h1 className="profile-username">{values.fullname}</h1>
                    <div className="rating">
                        <BasicRating/>
                        <p className="percentage">8.5/10</p>
                    </div>

                    <h2 className="profile-email">{values.email}</h2>

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
                </div>

                <div className="hobbies-and-rosets">
                    <div className="hobbies">
                        <h3>Hobiler</h3>


                        <div className="hobby " onMouseEnter={() => setHover(true)}
                             onMouseLeave={() => setHover(false)}>
                            <span className="hobby-tag">Kitap Okuma</span>
                            {/* <button className={`close ${hover ? "Show" : ""}`}>
                                <IoCloseSharp className='closeikon'/>
                            </button> */} 
                            {/*//TODO: buton hoverlanmamışken bile yer kapladığı için kötü gözüküyor bu yüzden kapatıldı.
                                */}
                        </div>
                        <div className="hobby">
                            <span className="hobby-tag">Yüzme</span>
                        </div>
                        <div className="hobby">
                            <span className="hobby-tag">Yemek Yapma</span>
                        </div>
                        <div className="hobby">
                            <span className="hobby-tag">Kitap Okuma</span>
                        </div>
                        <div className="hobby">
                            <span className="hobby-tag">Futbol</span>
                        </div>
                        <div className="hobby">
                            <span className="hobby-tag">Basketbol</span>
                        </div>
                        <div className="hobby">
                            <span className="hobby-tag">Tenis</span>
                        </div>
                        <div className="hobby">
                            <span className="hobby-tag">Triathlon</span>
                        </div>
                        <div className="hobby">
                            <span className="hobby-tag">Oyun Oynamak</span>
                        </div>
                    </div>

                    <div className="rosets">
                        <h3>Rozetler</h3>
                        <div className="items">
                            <div className="roset-item">
                                <FaAward/>
                                <span className="roset-tag">Voleybolcu</span>
                            </div>
                            <div className="roset-item">
                                <FaAward/>
                                <span className="roset-tag">Stratejist</span>
                            </div>
                            <div className="roset-item">
                                <FaAward/>
                                <span className="roset-tag">Köpekbalığı</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div className="historyPart">
            <h2 style={{color: "red", marginLeft: "30px"}}>Geçmiş Etkinlikler</h2>
            <hr/>
            <div className="history-cards">


                {activities.map(activity => (<div className='history-card' key={activity.id}>
                    <h3>{activity.title}</h3>
                    <p>{activity.location}</p>
                    <p>{new Date(activity.activityDate).toLocaleDateString()}</p>
                    <p>{activity.currentAttendees} / {activity.maxAttendees}</p>
                    <button className='evaluatebtn' onClick={() => handleEvaluateClick(activity)}>
                        Katılımcıları Değerlendir
                    </button>
                </div>))}
            </div>
        </div>

        {showPopup && selectedActivity && (<div className="popup-overlay" onClick={() => setShowPopup(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>{selectedActivity.title} - Katılımcılar</h2>
                <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
                <div className="participants-list">
                    {['Emir Enes Akalın', 'Göktuğ Berke Güngören', 'Yunus Emre Şenyiğit'].map((participant) => {
                        const ratingKey = `${selectedActivity.id}-${participant}`;
                        return (<div key={participant} className="participant-item">
                            <span>{participant}</span>
                            <div className="participant-rating-group">
                                <FiAlertTriangle className="report-icon" />
                                <Rating
                                    value={ratings[ratingKey] || 0}
                                    onChange={(_, newValue) => handleRatingChange(selectedActivity.id, participant, newValue || 0)}
                                    size="large"
                                />
                            </div>
                        </div>);
                    })}
                </div>
            </div>
        </div>)}
    </>;
};

export default ProfilePage;