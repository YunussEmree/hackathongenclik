import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from "./pages/LoginPage";
import NotFoundPage from './pages/NotFoundPage';

const AppRoutes: React.FC = () => (<Router>
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
</Router>);

export default AppRoutes;