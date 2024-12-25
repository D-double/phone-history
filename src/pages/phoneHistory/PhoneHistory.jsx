import React, { useState, useEffect } from 'react';
import './phone.scss';
import AuthLayout from '../../layout/AuthLayout';
import WaitingForCode from './WaitingForCode/WaitingForCode';
import PaidOnly from './PaidOnly/PaidOnly';
import CanceledOnly from './CanceledOnly/CanceledOnly';
import AllMailActivations from './mailActivations/AllMailActivations';
import { images } from '../../assets/image';
import { useDispatch } from 'react-redux';
import { getUserCart } from '../../store/wc-store';

const PhoneHistory = () => {
  const [activeComponent, setActiveComponent] = useState('WaitingForCode');
  const dispatch = useDispatch()

  //---------------------
  useEffect(()=>{
    dispatch(getUserCart())
  },[])
  //---------------------
  return (
    <div className="phoneHistory">
      <div className="container">
        <AuthLayout></AuthLayout>
        <div className="phoneHistory_info">
          <div className="phoneHistory__p">
            <p className="page">Main </p>
            &gt;
            <p className="page__org">Phone history</p>
          </div>
          <div className="phoneHistory__title_box">
                  <img src={images.blank} alt="" className="phoneHistory__title_img" />
                  <h2 className="phoneHistory__title">PHONE HISTORY ACTIVATIONS</h2>
          </div>
          <ul className="menu">
            <li>
              <a
                href="#"
                className={`menu__links ${activeComponent === 'WaitingForCode' ? 'active' : ''}`}
                onClick={() => setActiveComponent('WaitingForCode')}
              >
                Waiting for code
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`menu__links ${activeComponent === 'PaidOnly' ? 'active' : ''}`}
                onClick={() => setActiveComponent('PaidOnly')}
              >
                Paid only
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`menu__links ${activeComponent === 'CanceledOnly' ? 'active' : ''}`}
                onClick={() => setActiveComponent('CanceledOnly')}
              >
                Canceled only
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`menu__links ${activeComponent === 'AllMailActivations' ? 'active' : ''}`}
                onClick={() => setActiveComponent('AllMailActivations')}
              >
                All mail Activations
              </a>
            </li>
          </ul>
          {/* <div className="phoneHistory__all_price">
            <p className="all__price_desc">Waiting for SMS 0 pcs / locked 0₽</p>
          </div> */}
          <div className="phoneHistory__content">
            {activeComponent === 'WaitingForCode' && <WaitingForCode className="WaitingForCode" />}
            {activeComponent === 'PaidOnly' && <PaidOnly className="PaidOnly" />}
            {activeComponent === 'CanceledOnly' && <CanceledOnly className="CanceledOnly" />}
            {activeComponent === 'AllMailActivations' && <AllMailActivations className="AllMailActivations" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneHistory;
