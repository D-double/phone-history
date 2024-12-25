import React, { useState } from "react";
import "./TopUpHistory.scss";
import { images } from "../../assets/image";

const TopUpHistory = () => {
  const [statusInput, setStatusInput] = useState("");
  const [paymentInput, setPaymentInput] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  const statusOptions = ["Pending", "Completed", "Failed"];
  const paymentOptions = ["Credit Card", "PayPal", "Bank Transfer"];

  const toggleStatusDropdown = () => {
    setIsStatusDropdownOpen((prev) => !prev);
    setIsPaymentDropdownOpen(false); // Закрываем другой dropdown
  };

  const togglePaymentDropdown = () => {
    setIsPaymentDropdownOpen((prev) => !prev);
    setIsStatusDropdownOpen(false); // Закрываем другой dropdown
  };

  const closeDropdowns = () => {
    setIsStatusDropdownOpen(false);
    setIsPaymentDropdownOpen(false);
  };

  return (
    <div className="TopUpHistory" onClick={closeDropdowns}>
      {/* Навигация */}
      <div className="TopUpHistory__p">
        <p className="page">Main</p>
        &gt;
        <p className="page__org">Profile</p>
      </div>

      {/* Заголовок */}
      <div className="TopUpHistory__title_box">
        <img src={images.blank} alt="Settings" className="TopUpHistory__title_img" />
        <h2 className="TopUpHistory__title">TOP UP HISTORY</h2>
      </div>

      {/* Контент */}
      <div className="TopUpHistory__content" onClick={(e) => e.stopPropagation()}>
        {/* Кнопки */}
        <div className="TopUpHistory__btn_box">
          <button className="TopUpHistory__btn">Hide</button>
          <button className="TopUpHistory__btn">Filter</button>
        </div>

        <div className="TopUpHistory__filter">
          {/* Фильтр по статусу */}
          <div className="filter__status">
            <p className="status__desc">Status</p>
            <div className="dropdown">
              <input
                type="text"
                placeholder="Status"
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)}
                onClick={(e) => {
                  e.stopPropagation(); // Предотвращаем закрытие при клике на input
                  toggleStatusDropdown();
                }}
                className="filter__input"
              />
              {isStatusDropdownOpen && (
                <ul  className={`dropdown__list ${isStatusDropdownOpen ? "open" : ""}`} >
                  {statusOptions
                    .filter((option) =>
                      option.toLowerCase().includes(statusInput.toLowerCase())
                    )
                    .map((option, index) => (
                      <li
                        key={index}
                        className="dropdown__item"
                        onClick={() => {
                          setStatusInput(option);
                          setIsStatusDropdownOpen(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* Фильтр по типу оплаты */}
          <div className="filter__payment">
            <p className="payment__desc">Payment type</p>
            <div className="dropdown">
              <input
                type="text"
                placeholder="Payment type"
                value={paymentInput}
                onChange={(e) => setPaymentInput(e.target.value)}
                onClick={(e) => {
                  e.stopPropagation(); // Предотвращаем закрытие при клике на input
                  setIsPaymentDropdownOpen((prev) => !prev); // Переключаем состояние
                }}
                className="filter__input"
              />
              {isPaymentDropdownOpen && (
                <ul className="dropdown__list open">
                  {paymentOptions
                    .filter((option) =>
                      option.toLowerCase().includes(paymentInput.toLowerCase())
                    )
                    .map((option, index) => (
                      <li
                        key={index}
                        className="dropdown__item"
                        onClick={() => {
                          setPaymentInput(option);
                          setIsPaymentDropdownOpen(false); // Закрываем список
                        }}
                      >
                        {option}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpHistory;
