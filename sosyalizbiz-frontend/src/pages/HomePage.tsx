import React from 'react';
import './HomePage.css';
import NavbarPage from '../components/navbar/Navbar.tsx';
import Card from '../components/card/Card.tsx';

const HomePage: React.FC = () => {
    return (
        <div className='container'>
            <NavbarPage />
            <div className='cards'>
                <Card
                    id="1"
                    title="Etkinlik 1"
                    person={{ name: "Ali Veli" }}
                    currentAttendees={10}
                    maxAttendees={20}
                    date={new Date('2024-07-01')}
                    createdAt={new Date('2024-06-15T10:00:00')}
                    content="Açıklamayı okumak için tıklayın."
                    place="İstanbul"
                />

                <Card
                    id="2"
                    title="Etkinlik 2"
                    person={{ name: "kırkdokuzelli" }}
                    currentAttendees={3}
                    maxAttendees={5}
                    date={new Date('2024-07-01')}
                    createdAt={new Date('2024-06-15T10:00:00')}
                    content="Açıklamayı okumak için tıklayın."
                    place="Ankara"
                />

                <Card
                    id="3"
                    title="Voleybol "
                    person={{ name: "Emir Enes Akalın" }}
                    currentAttendees={5}
                    maxAttendees={10}
                    date={new Date('2024-07-01')}
                    createdAt={new Date('2024-06-15T10:00:00')}
                    content="Açıklamayı okumak için tıklayın."
                    place="Antalya"
                />

                <Card
                    id="4"
                    title="Golf Turnuvası"
                    person={{ name: "Göktuğ Berke" }}
                    currentAttendees={1}
                    maxAttendees={25}
                    date={new Date('2024-07-01')}
                    createdAt={new Date('2024-06-15T10:00:00')}
                    content="Açıklamayı okumak için tıklayın."
                    place="Akdeniz Üniversitesi"
                />
            </div>

        </div>
    );
};

export default HomePage;

