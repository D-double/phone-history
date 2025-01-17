import React, { useState } from 'react';
import './navbar.scss';
// import m from './media.module.scss'
import { NavLink } from 'react-router';
import { images } from '../assets/image';
import { Paths } from '../Paths';
import { useSelector } from 'react-redux';


const links = [
  { title: 'API', url: '/api' },
  { title: 'SMS Activation', url: '/popularactivations' },
  { title: 'Temporary mail', url: '/temporaryMail' },
  { title: 'Partnership', url: '/partnership' },
  { title: 'Referral program', url: '/referralProgram' },
];

const linksBot = [
  {img: images.blank, title: 'История активаций', url: Paths.phonehistory},
  // {img: images.settings, title: 'Профиль', url: Paths.profile},
  {img: images.blank, title: 'Учётная запись', url: Paths.editUzer},
  {img: images.dc, title: 'Транзакции кошелька', url: Paths.transactions},
];

const languages = [
  { code: 'en', name: 'English', flag: 'EN', img: images.en },
  { code: 'ru', name: 'Русский', flag: 'RU', img: images.ru },
];

export const Navbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (code) => {
    setSelectedLanguage(code);
    setIsDropdownOpen(false); // Close dropdown after selection
    console.log(`Selected language: ${code}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
//---------------------
const {balance} =useSelector((state)=>state.wc_store);

  return (
    <div className={`Navbar`}>
      {
        import.meta.env.MODE === 'development' && 
        <section className="nav__top">
        <div className="nav__logo">
          <a href="/">
            <img src={images.logo} alt="" className={`logo__img`} />
          </a>
        </div>
        <ul className={`menu`}>
          {links.map((link) => (
            <li key={link.title}>
              <NavLink to={link.url} className={`menu__link`}>
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={`nav__right`}>
          <div className='register'>
            <button className={`reg`}>
              <a href="/registration" className='btn__reg'>
                REGISTRATION
              </a>
            </button>
            <button className={`log`}>
              <a href="/login" className='btn__log'>
                SIGN IN
              </a>
            </button>
          </div>
          <div className={`language`}>
            {/* Кнопка для переключения языка */}
            <button className={`language__btn`} onClick={toggleDropdown}>
              {/* Отображение выбранного флага и кода языка */}
              <img
                src={languages.find((lang) => lang.code === selectedLanguage)?.img}
                alt=""
                className={`language__flagImg`}
              />
              {languages.find((lang) => lang.code === selectedLanguage)?.flag}
            </button>
            {isDropdownOpen && (
              <ul className={`language__dropdown`}>
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`language__option`}
                  >
                    <img
                      src={lang.img}
                      alt={lang.name}
                      className={`language__img`}
                    />
                    {lang.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        </section>
      }
      <section className={`nav__bot`}>
        <ul className={`menu__bot`}>
          {linksBot.map((linksBot) => (
            <li key={linksBot.title}>
              { linksBot.url == Paths.editUzer || linksBot.url == Paths.transactions ?
                <a href={linksBot.url} className={`menu__link__bot`}>
                  <img className={`link__bot__img`} src={linksBot.img} alt="" />
                  {linksBot.title}
                </a>
                : 
                <NavLink to={linksBot.url} className={`menu__link__bot`}>
                  <img className={`link__bot__img`} src={linksBot.img} alt="" />
                  {linksBot.title}
                </NavLink>
              }
            </li>
          ))}
        </ul>
        <div className="mobile-menu-user-withdrawal">
          <a href={import.meta.env.VITE_BASE_URL + "/my-account/my-wallet/"}>
            <div className="--button">
              Пополнить
            </div>
          </a>
            {
              balance ? 
                <div dangerouslySetInnerHTML={{ __html: balance.balance }} className="--value user-balance-new"></div>
              : <div className="--value user-balance-new">0</div>
            }
      </div>
      </section>
    </div>
  );
};