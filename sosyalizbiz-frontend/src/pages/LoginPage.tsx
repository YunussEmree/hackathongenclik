import React, { useState } from 'react';
import './LoginPage.css';
import activeLifeImage from '../assets/activelife.jpeg';

const LoginPage: React.FC = () => {
    const [tcKimlikNo, setTcKimlikNo] = useState('');

    const handleTcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, '');
        setTcKimlikNo(numericValue.slice(0, 11));
    };

    return (
        <div className="login-container">
            <div className="login-left-side">
                <p className="left-panel-title">Sosyaliz Biz</p>
                <p className="left-panel-slogan">Paylaş, Eşleş, Eğlen!</p>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={11}
                    className="login-input"
                    placeholder="T.C. kimlik numaranızı giriniz"
                    value={tcKimlikNo}
                    onChange={handleTcChange}
                />
                <input type="password" className="login-input" placeholder="E-Devlet şifrenizi giriniz" />
                <div className="login-options">
                    <label className="remember-me-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span> Beni Hatırla
                    </label>
                    <p className="forgot-password-link">Şifremi Unuttum</p>
                </div>
                <button className="login-button">Giriş Yap</button>
                <button className="register-button">GSB Biz ile kayıt ol</button>
                <p className="or-text">Veya</p>
                <button className="google-login-button">Google ile giriş yap</button>
                <p className="app-description-text">
                    * Sosyaliz Biz, insanların çeşitli etkinlikler (voleybol, basketbol gibi sporlar veya sinema, board games ve coffee talk gibi diğer sosyal aktiviteler) yapmak istediklerinde katılımcı bulma sorununu çözen bir uygulamadır. Kullanıcılar, bir etkinlik için ilan oluşturabilir ve kendi bölgelerindeki diğer ilgi duyan kişilerle kolayca eşleşerek bir araya gelebilirler.
                </p>
            </div>
            <div className="login-right-side">
                <img src={activeLifeImage} alt="Active Life" className="login-image" />
            </div>
        </div>
    );
};

export default LoginPage;
