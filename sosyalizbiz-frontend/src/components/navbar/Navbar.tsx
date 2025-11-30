import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { createActivity } from "../../utils/api";

import logo from "../../assets/logo.png";

import "./Navbar.css";

type NavbarProps = {
    onActivityCreated?: () => void;
};

type ActivityFormState = {
    title: string;
    description: string;
    location: string;
    maxAttendees: string;
    activityDate: string;
};

const currentForm: ActivityFormState = {
    title: "",
    description: "",
    location: "",
    maxAttendees: "",
    activityDate: "",
};

const Navbar: React.FC<NavbarProps> = ({ onActivityCreated }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requestForm, setRequestForm] = useState<ActivityFormState>(currentForm);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setErrorMessage(null);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setRequestForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (
            !requestForm.title.trim() ||
            !requestForm.description.trim() ||
            !requestForm.location.trim() ||
            !requestForm.maxAttendees ||
            !requestForm.activityDate
        ) {
            setErrorMessage("Lutfen tum alanlari doldurun.");
            return;
        }

        const attendeeCount = Number(requestForm.maxAttendees);
        if (Number.isNaN(attendeeCount) || attendeeCount <= 0) {
            setErrorMessage("Kontenjan 0'dan buyuk bir sayi olmalidir.");
            return;
        }

        try {
            await createActivity({
                title: requestForm.title.trim(),
                description: requestForm.description.trim(),
                location: requestForm.location.trim(),
                maxAttendees: attendeeCount,
                currentAttendees: 0,
                activityDate: new Date(requestForm.activityDate),
            });

            setRequestForm(currentForm);
            setIsModalOpen(false);
            setSuccessMessage("Etkinlik basariyla olusturuldu.");
            onActivityCreated?.();
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Etkinlik olusturulurken bir sorun olustu."
            );
        }
    };

    return (
        <>
            {successMessage ? (
                <div className="nav-banner success">
                    <span>{successMessage}</span>
                    <button type="button" onClick={() => setSuccessMessage(null)}>
                        X
                    </button>
                </div>
            ) : null}
            <div className="nav-content">
                <div className="left-side">
                    <div className="logo"> 
                        <img src={logo} style={{"paddingLeft": "10px", "rotate": "90deg"}} alt="SosyalizBiz Logo" width="40" height="40" />
                    </div>
                    <h2>SosyalizBiz</h2>
                </div>
                <div className="right-side">
                    <div className="home left-element">
                        <h3>
                            <a href="http://localhost:3000/home">Aktiviteler</a>
                        </h3>
                    </div>
                    <div className="profile left-element">
                        <h3>
                            <a href="http://localhost:3000/profile">Profil</a>
                        </h3>
                    </div>

                    <div className="toggle" onClick={handleOpenModal}>
                        <CiCirclePlus />
                    </div>
                </div>
            </div>

            {isModalOpen ? (
                <div className="nav-modal-overlay" onClick={handleCloseModal}>
                    <div
                        className="nav-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="nav-modal-header">
                            <div>
                                <p className="modal-header">YENİ ETKİNLİK OLUŞTUR</p>
                            </div>
                            <button
                                type="button"
                                className="modal-close"
                                onClick={handleCloseModal}
                                aria-label="Kapat"
                            >
                                x
                            </button>
                        </div>
                        {errorMessage ? (
                            <div className="nav-form-alert error">{errorMessage}</div>
                        ) : null}
                        <form className="nav-modal-form" onSubmit={handleSubmit}>
                            <label className="form-control">
                                <span>Başlık</span>
                                <input
                                    name="title"
                                    type="text"
                                    value={requestForm.title}
                                    onChange={handleChange}
                                    placeholder="Haftasonu koşu etkinliği"
                                />
                            </label>
                            <label className="form-control">
                                <span>Açıklama</span>
                                <textarea
                                    name="description"
                                    value={requestForm.description}
                                    onChange={handleChange}
                                    placeholder="2 saat boyunca koşu yapacağız ve ardından piknik yapacağız."
                                    rows={3}
                                />
                            </label>
                            <label className="form-control">
                                <span>Konum</span>
                                <input
                                    name="location"
                                    type="text"
                                    value={requestForm.location}
                                    onChange={handleChange}
                                    placeholder="Ankara, Genclik Parki"
                                />
                            </label>
                            <label className="form-control">
                                <span>Kontenjan</span>
                                <input style={{ color: "black" }}
                                    name="maxAttendees"
                                    type="number"
                                    min={1}
                                    value={requestForm.maxAttendees}
                                    onChange={handleChange}
                                    placeholder="10"
                                />
                            </label>
                            <label className="form-control">
                                <span>Etkinlik tarihi</span>
                                <input style={{ color: "black" }}
                                    name="activityDate"
                                    type="datetime-local"
                                    value={requestForm.activityDate}
                                    onChange={handleChange}
                                    placeholder="01-06-2024T10:00"
                                />
                            </label>
                            <button
                                className="submit-button"
                                type="submit"
                            >
                                Etkinlik Oluştur
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Navbar;
