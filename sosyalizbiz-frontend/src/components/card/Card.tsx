import { useState } from 'react';
import './Card.css';
import { attendActivity, getCurrentUser, getLocation } from '../../utils/api';
import { FaLocationArrow } from "react-icons/fa";
import ErrorToast from '../errortoast/ErrorToast';


interface CardProps {
    id: string;
    title: string;
    personName: string;
    currentAttendees: number;
    maxAttendees: number;
    date: Date;
    createdAt: Date;
    content: string;
    place: string;
    onAttend: () => void;
}
const Card: React.FC<CardProps> = ({ id, title, content, personName, currentAttendees, maxAttendees, date, createdAt, place, onAttend }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLocation = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
        window.open(url, '_blank');
    };

    const handleAttend = () => {
        setErrorMessage(null);
        getCurrentUser().then(currentuser => {
            attendActivity(id, currentuser.id.toString()).then(() => {
                onAttend();
            }).catch(error => {
                setErrorMessage(error instanceof Error ? error.message : "Etkinlige katilirken bir sorun olustu.");
            });
        });
    };


    return (
        <>
            {errorMessage ? (
                <ErrorToast message={errorMessage} onClose={() => setErrorMessage(null)} />
            ) : null}
            <div className="card" >
                <div className="card-header">
                    <h2>{title}</h2>
                    <h3>{personName}</h3>
                </div>
                <div className="card-content">
                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Kontenjan</h4>
                        </div>
                        <div className="card-value">
                            <p>{currentAttendees} / {maxAttendees}</p>
                        </div>
                    </div>

                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Etkinlik Tarihi</h4>
                        </div>
                        <div className="card-value">
                            <p>{date.toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Açıklama</h4>
                        </div>
                        <div className="card-value">
                            <p>{content}</p>
                        </div>
                    </div>

                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Oluşturulma Tarihi</h4>
                        </div>
                        <div className="card-value">
                            <p>{createdAt.toLocaleTimeString()}</p>
                        </div>
                    </div>

                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Yer</h4>
                        </div>
                        <div className="card-value">
                            <p >{place}</p>
                            <FaLocationArrow className='loc' onClick={handleLocation} />
                        </div>
                    </div>


                </div>
                <div className="card-button" >
                    <button onClick={handleAttend}>Etkinliğe Katıl</button>
                </div>

            </div>

        </>

    );
};

export default Card;
