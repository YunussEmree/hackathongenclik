import React from "react";
import { CiCirclePlus } from "react-icons/ci";

import "./Navbar.css";

const Navbar: React.FC = () => {
    return (
        <div className="nav-content">
            <div className="left-side">
                <h2>SosyalizBiz</h2>
            </div>
            <div className="right-side">
                <div className="home left-element">
                    <h3><a href="http://localhost:3000/home">Aktiviteler</a></h3>
                </div>
                <div className="profile left-element">
                    <h3><a href="http://localhost:3000/profile">Profil</a></h3>
                </div>

                <div className="toggle">
                    <CiCirclePlus />
                </div>
            </div>
        </div>
    );

}

export default Navbar;