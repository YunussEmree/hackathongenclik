import AppName from './AppName';
import Button from './Button';
import Chat from './Chat';
import Headers from './Headers';
import SearchBar from './SearchBar';
import { useState } from 'react';
import './Modal.css';

const Modal = () => {
    const [inputValue, setInputValue] = useState('');
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleSend = () => {
        if (inputValue.trim() === '') return;
        setChatMessages([...chatMessages, inputValue]);
        setInputValue('');
    };

    return (

        <div className="container">


            <AppName>
                <div id='head' >
                    <span className='head'>SosyalizBiz </span>ChatBot
                </div>
            </AppName>
            <div>
                <Headers>
                    <div className='gereetings'>
                        <h1 id='greeting'>Merhaba, Hoşgeldin.</h1>
                    </div>
                    <div>
                        <h3 id='greetingmessage'>Bugün Nasıl Yardımcı Olabilirim?</h3>
                    </div>
                </Headers>
            </div>
            <div className="chat-container">
                <Chat >
                    {chatMessages.map((message, index) => (
                        <div key={index} className="user-area">
                            <p className="user-message">
                                {message}
                            </p>
                        </div>
                    ))}
                </Chat>
            </div>
            <div className="searchBar-container">
                <SearchBar>
                    <input type="text" className="search-input"
                        placeholder="Bir şey yazınız..."
                        value={inputValue}
                        onChange={handleInputChange} />

                    <Button textContent="Gönder" handleClick={handleSend} />
                </SearchBar>
            </div>
        </div>

    );
};

export default Modal;