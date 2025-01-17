import { images } from "../assets/image"; // Ensure this path is correct
import { useEffect } from "react";
import "./style.scss";
import ServicesSelect from "../components/ServicesSelect/ServicesSelect";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmail,
  getPriceCount,
  getServices,
  setSelectedService,
  setRedirect
} from "../store/email/email";
import Loading from "../components/UI/Loading";


const AuthLayout = ({select}) => {
  const dispatch = useDispatch();
  const { priceData, service, selectedService, loadingOrder, error } = useSelector(
    (state) => state.email
  );
  const selectServiceHandler = (id) => {
    dispatch(setSelectedService(id));
    dispatch(getPriceCount(id));
  };
  useEffect(() => {
    dispatch(getServices());
    if(select) {
      dispatch(setRedirect(select))
    }
  }, []);

  return (
    <div className="AuthLayout">
      <div className="layout__title">
        <p className="layout__title_desc">{"E-mail's"}</p>
      </div>
      <div className="layout__servis">
        <ServicesSelect />
        { service ?
          <div className="service__list">
            { service.map((item) => (
                <div key={item.id} className="service__item">
                  <button
                    className="servise__btn"
                    onClick={() => selectServiceHandler(item.id)}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className={`service__image ${
                        selectedService === item.id ? "selected" : ""
                      }`}
                    />
                  </button>
                </div>
              ))
              
              }
          </div>
          : <Loading />
        }
      </div>
      <div className="layout__price">
        <p className="layout__domen_title"></p>
        {
          !error ? 
            <div className="layout__price--item">
              <img src={images.gg} alt="" className="service__domen" />
              <div className="layout__price--name">Gmail</div>
                <div className="layout__price--info">
              { priceData === true ? <Loading size={'30px'}/> :  priceData ?
                  <>
                    <p>от {priceData.data.price} ₽</p>
                    <p>{priceData.data.count} шт</p>
                  </> 
                : ''
              }
                </div>
              <div className="layout__price--button">
                { !loadingOrder ?
                  <button
                  className="layout__price-button primary"
                  onClick={() => {
                    dispatch(getEmail());
                  }}
                >
                  Купить
                </button>
                :  <Loading size={'30px'}/>
              }
              </div>
            </div>
          :  error && <div className="layout__price--name">{error}</div>
        }
      </div>
    </div>
  );
};

export default AuthLayout;
