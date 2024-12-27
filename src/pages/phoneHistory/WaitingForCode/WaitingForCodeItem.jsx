import { useEffect } from "react";
import { copyImg, images } from "../../../assets/image";
import { timer } from "../../../utils/timer";
import { useState } from "react";
import getTime from "../../../utils/getTime";
import { useDispatch } from "react-redux";
import { filterCartData } from "../../../store/wc-store";

const WaitingForCodeItem = ({order_data, product}) => {
  const dispatch = useDispatch();
  const maxTime = 25*60;
  const copyClickHandler = (e) => {
    const parent = e.target.closest(".waiting__service");
    const text = parent.querySelector("span").innerText;
    navigator.clipboard
      .writeText(text)
      .then()
      .catch(() => {
        alert("Ошибка");
      });
  };
  const [time, setTime] = useState(maxTime);
  useEffect(()=>{
    setTimeout(() => {
      if(time > 0){
        setTime(timer(order_data.timestamp, maxTime));
      } else {
        dispatch(filterCartData(order_data.id))
      }
    }, 1000);
  }, [time])
  
  return (
    <div className="waiting__item">
          <div className="waiting__card">
            <div className="waiting__left">
              <div className="waiting__service">
                <img src={product.image} alt="" />
                <span>{product.name}</span>
              </div>
              <div className="waiting__service">
                <img src={images.gg} alt="" />
                <span>{order_data.meta_data.mail}</span>
                <img
                  onClick={copyClickHandler}
                  className="waiting__copy"
                  src={copyImg}
                  alt=""
                />
              </div>
            </div>
            <div className="waiting__center">
              <div className="waiting__status">
                <div>Статус</div>
                <div>Ожидает письмо</div>
              </div>
              <div className="waiting__time">
                <div>Время</div>
                <div className="waiting__timer">{getTime(time, 'min')}:{getTime(time)}</div>
              </div>
              <div className="waiting__price">
                <div>Цена</div>
                <div className="waiting__value">{order_data.total}₽</div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default WaitingForCodeItem