import React, { useState } from 'react';
import './profile.scss';
import { images } from '../../assets/image';

const Profile = () => {
  const [contact, setContact] = useState('softwaremontana');
  const [password, setPassword] = useState('**********');
  const [balance, setBalance] = useState('');

  return (
    <div className="profile__page">
      <div className="p">
        <p className="page">Main </p>
        &gt;
        <p className="page__org">Profile</p>
      </div>
      <div className="profile__title_box">
        <img src={images.settings} alt="" className="profile__title_img" />
        <h2 className="profile__title">Settings</h2>
      </div>
      <div className="profile">
        <div className="profile__form">
          {/* ID Section */}
          <div className="profile__field">
            <label className="profile__label">ID</label>
            <div className="profile__input_group">
              <input type="text" value="228923" disabled className="profile__input_disabled" />
              <button className="not__button">Not available to change</button>
            </div>
          </div>

          {/* Login/Email Section */}
          <div className="profile__field">
            <label className="profile__label">Login/Email</label>
            <div className="profile__input_group">
              <input type="text" value="wardfast925@gmail.com" disabled className="profile__input_disabled" />
              <button className="not__button">Not available to change</button>
            </div>
          </div>

          {/* Email Section */}
          <div className="profile__field">
            <label className="profile__label">Email</label>
            <div className="profile__input_group">
              <input type="text" value="wardfast925@gmail.com" disabled className="profile__input_disabled" />
              <button className="not__button">Not available to change</button>
            </div>
          </div>

          {/* Contact Section */}
          <div className="profile__field">
            <label className="profile__label">My contact</label>
            <div className="profile__input_group">
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="profile__input"
              />
              <button className="profile__button">Change</button>
            </div>
          </div>

          {/* Password Section */}
          <div className="profile__field">
            <label className="profile__label">Password</label>
            <div className="profile__input_group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="profile__input"
              />
              <button className="profile__button">Change</button>
            </div>
          </div>

          {/* API Key Section */}
          <div className="profile__field">
            <label className="profile__label">API-key</label>
            <div className="profile__input_group">
              <input
                type="text"
                value="JaBasLQyxRLgv3h0RnXMLCZAX*******"
                className="profile__input"
                readOnly
              />
              <button className="profile__button_show">Show</button>
              <button className="profile__button">Change</button>
            </div>
          </div>

          {/* Balance Bot Section */}
          <div className="profile__field">
            <label className="profile__label">Balance bot</label>
            <div className="profile__input_group">
              <input
                className="profile__input"
                type="text"
                placeholder="5000"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
              <span className="profile__currency">RUB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
